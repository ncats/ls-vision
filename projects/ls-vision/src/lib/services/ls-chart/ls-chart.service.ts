import { Injectable, ElementRef } from '@angular/core';
import { Coordinate, Def, XClass, Type, TimeUnit, TitleParams, Axis, Legend } from '../../models/vega-lite';
import { LsConfig, LsAxis, LsChart } from '../../models/ls-vision';
import * as _ from 'lodash';
import * as Charts from '../../constants/chart-config';
import * as FontSizes from '../../constants/chart-defaults';
declare let vegaEmbed: any;
@Injectable({
    providedIn: 'root',
})
export class LsChartService {
    public vegaOverwritesLS = false;
    public titleSize: number;
    public axisTitleSize: number;
    public tickTitleSize: number;
    public legendTitleSize: number;
    public lengendItemTitleSize: number;
    public circularLabelSize: number;
    constructor() {
        this.titleSize = FontSizes.titleSize;
        this.axisTitleSize = FontSizes.axisTitleSize;
        this.tickTitleSize = FontSizes.tickTitleSize;
        this.legendTitleSize = FontSizes.legendTitleSize;
        this.lengendItemTitleSize = FontSizes.lengendItemTitleSize;
        this.circularLabelSize = FontSizes.circularLabelSize;
    }

    public mergeConfigWithPredefined(userDefinedConfig: Coordinate, chartType: string): Coordinate {
        let finalConfig = userDefinedConfig;
        if (chartType && Charts[chartType]) {
            const predefinedConfig = _.cloneDeep(Charts[chartType]);
            _.merge(predefinedConfig, userDefinedConfig);
            finalConfig = predefinedConfig;
        }
        return finalConfig;
    }

    public mapLStoVegaConfig(lsConfig: LsConfig): Coordinate {
        const config: Coordinate = {};
        this.mapRoot(config, lsConfig);
        this.mapColor(config, lsConfig);
        this.mapAxes(config, lsConfig);
        this.mapColumn(config, lsConfig);
        this.mapShape(config, lsConfig);
        this.mapFill(config, lsConfig);
        this.mapPoint(config, lsConfig);
        this.mapCircularPlots(config, lsConfig);
        return config;
    }
    public mapToArrayObjs(config: Coordinate, lsConfig: LsConfig) {
        this.mapPieLabels(config, lsConfig);
        this.setTextSize(config, lsConfig);
    }
    public mapPieLabels(config: Coordinate, lsConfig: LsConfig) {
        if (lsConfig?.circular?.textRadius && config.layer) {
            const pieLayer = config.layer.find(x => (x.mark as Def)?.type === 'arc');
            if (pieLayer) {
                (pieLayer.mark as Def).outerRadius = lsConfig.circular.outerRadius;
                (pieLayer.mark as Def).innerRadius = lsConfig.circular.innerRadius;
            }

            const textLayer = config.layer.find(x => (x.mark as Def)?.type === 'text');
            if (textLayer?.encoding?.text) {
                (textLayer.mark as Def).radius = lsConfig.circular.textRadius;
                if (lsConfig.circular.text) {
                    textLayer.encoding.text.field = lsConfig.circular.text;
                } else if (lsConfig.color) {
                    textLayer.encoding.text.field = lsConfig.color.field;
                }
            }
        }
    }
    public mapRoot(config: Coordinate, lsConfig: LsConfig) {
        config.width = lsConfig.width;
        config.height = lsConfig.height;
        config.title = lsConfig.title;
        config.description = lsConfig.description;
    }
    public mapColor(config: Coordinate, lsConfig: LsConfig) {
        if (lsConfig?.color && config) {
            let scale;
            if (lsConfig.color.domain || lsConfig.color.range) {
                scale = {
                    domain: lsConfig.color.domain,
                    range: lsConfig.color.range,
                };
            }
            const field = lsConfig.color.field;
            const legend = lsConfig.color.legend === null ? null : lsConfig.color.legend ? { title: lsConfig.color.legend } : undefined;
            if (scale || field || legend) {
                const tempConfig = {
                    encoding: {
                        color: {
                            scale,
                            field,
                            legend,
                        },
                    },
                };
                _.merge(config, tempConfig);
            }
        }
    }
    public mapAxis(lsAxis: LsAxis, vegaAxis: XClass): XClass {
        if (!lsAxis) {
            return undefined;
        }
        const vAxis = vegaAxis || {};
        const mappingAxis: XClass = {};
        mappingAxis.field = lsAxis.field;
        mappingAxis.type = lsAxis.type as Type;
        mappingAxis.timeUnit = lsAxis.timeUnit as TimeUnit;
        if (lsAxis.bins) {
            if (typeof lsAxis.bins === 'boolean') {
                mappingAxis.bin = lsAxis.bins;
            } else {
                mappingAxis.bin = { maxbins: lsAxis.bins };
            }
        }
        if (lsAxis.titleFormat || lsAxis.grid !== undefined) {
            mappingAxis.axis = { format: lsAxis.titleFormat, grid: lsAxis.grid };
        }
        mappingAxis.title = lsAxis.title;
        _.merge(vAxis, mappingAxis);
        return vAxis;
    }
    public mapAxes(config: Coordinate, lsConfig: LsConfig) {
        const x = this.mapAxis(lsConfig.x, config.encoding?.x);
        const y = this.mapAxis(lsConfig.y, config.encoding?.y);
        const tempConfig = {
            encoding: {
                x,
                y,
            },
        };
        _.merge(config, tempConfig);
    }

    public mapShape(config: Coordinate, lsConfig: LsConfig) {
        if (lsConfig.shape) {
            const tempConfig: Coordinate = {
                encoding: {
                    shape: {
                        field: lsConfig.shape.field,
                    },
                },
            };
            _.merge(config, tempConfig);
        }
    }
    public mapColumn(config: Coordinate, lsConfig: LsConfig) {
        if (lsConfig.column) {
            const tempConfig: Coordinate = {
                encoding: {
                    column: {
                        field: lsConfig.column.field,
                    },
                },
            };
            _.merge(config, tempConfig);
        }
    }
    public mapFill(config: Coordinate, lsConfig: LsConfig) {
        if (lsConfig.fill) {
            const tempConfig: Coordinate = {
                mark: {
                    fill: lsConfig.fill,
                    type: undefined,
                },
            };
            _.merge(config, tempConfig);
        }
    }
    public mapPoint(config: Coordinate, lsConfig: LsConfig) {
        if (lsConfig.point) {
            const tempConfig: Coordinate = {
                mark: {
                    point: {
                        fill: lsConfig.point.fill,
                        filled: lsConfig.point.filled,
                    },
                    type: undefined,
                },
            };
            _.merge(config, tempConfig);
        }
    }
    public mapCircularPlots(config: Coordinate, lsConfig: LsConfig) {
        if (lsConfig.circular) {
            let tempConfig: Coordinate;

            if (!lsConfig.circular.textRadius) {
                tempConfig = {
                    mark: {
                        innerRadius: lsConfig.circular.innerRadius as number,
                        outerRadius: lsConfig.circular.outerRadius as number,
                        type: undefined,
                    },
                    encoding: {
                        theta: {
                            field: lsConfig.circular.theta,
                        },
                    },
                };
            } else {
                tempConfig = {
                    encoding: {
                        theta: {
                            field: lsConfig.circular.theta,
                        },
                    },
                };
            }
            _.merge(config, tempConfig);
        }
    }

    public setTextSize(config: Coordinate, lsConfig: LsConfig) {
        if (lsConfig.textSizeMult) {
            config.title = { text: config.title, fontSize: this.titleSize * lsConfig.textSizeMult } as TitleParams;

            const xAxis: Axis = {
                titleFontSize: this.axisTitleSize * lsConfig.textSizeMult,
                labelFontSize: this.tickTitleSize * lsConfig.textSizeMult,
            };
            if (config.encoding?.x && config.encoding.y) {
                config.encoding.x.axis = !config.encoding.x.axis ? {} : config.encoding.x.axis;
                config.encoding.y.axis = !config.encoding.y.axis ? {} : config.encoding.y.axis;
                _.merge(config.encoding.x.axis, xAxis);
                _.merge(config.encoding.y.axis, xAxis);
            }

            if (config.encoding?.color) {
                if (config.encoding.color.legend !== null) {
                    const legend: Legend = {
                        titleFontSize: this.legendTitleSize * lsConfig.textSizeMult,
                        labelFontSize: this.lengendItemTitleSize * lsConfig.textSizeMult,
                    };
                    config.encoding.color.legend = config.encoding.color.legend ? config.encoding.color.legend : {};
                    _.merge(config.encoding.color.legend, legend);
                }
            }
            if (config.layer) {
                const textLayer = config.layer.find(x => (x.mark as Def)?.type === 'text');
                if (textLayer?.encoding?.text) {
                    const mark = { fontSize: this.circularLabelSize * lsConfig.textSizeMult };
                    _.merge(textLayer.mark, mark);
                }
            }
        }
    }
}
