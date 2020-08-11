import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as Charts from '../../constants/chart-config/lookups';
import { Coordinate, Def, XClass, Type, TimeUnit, TitleParams, Axis, Legend } from '../../models/vega-lite';
import { VConfig, VAxis } from '../../models/ls-vision';
import * as FontSizes from '../../constants/chart-defaults';
@Injectable({
    providedIn: 'root',
})
export class MappingEngineService {
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

    // public getVisionConfig(config: Coordinate): VConfig {
    //     const visionConfig: VConfig = {
    //         x: null,
    //         y: null,
    //         circular: null,
    //         color: null,
    //         point: null,
    //         fill: null,
    //         shape: null,
    //     };
    //     for (const attr in visionConfig) {
    //         if (config[attr] !== undefined) {
    //             visionConfig[attr] = config[attr];
    //             config[attr] = undefined;
    //         }
    //     }
    //     return visionConfig;
    // }

    // If there is no predefined chart type return predefined chart
    public mergeConfigWithPredefined(userDefinedConfig: Coordinate, chartType: string): Coordinate {
        let finalConfig = userDefinedConfig;
        if (chartType && Charts[chartType]) {
            const predefinedConfig = _.cloneDeep(Charts[chartType]);
            _.merge(predefinedConfig, userDefinedConfig);
            finalConfig = predefinedConfig;
        }
        return finalConfig;
    }

    public mapLStoVegaConfig(lsConfig: VConfig): Coordinate {
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
    public mapToArrayObjs(config: Coordinate, lsConfig: VConfig) {
        this.mapPieLabels(config, lsConfig);
        this.setTextSize(config, lsConfig);
    }
    public mapPieLabels(config: Coordinate, vconfig: VConfig) {
        if (vconfig?.circular?.textRadius && config.layer) {
            const textLayer = config.layer.find(x => (x.mark as Def)?.type === 'text');
            if (textLayer?.encoding?.text) {
                (textLayer.mark as Def).radius = vconfig.circular.textRadius;
                if (vconfig.circular.text) {
                    textLayer.encoding.text.field = vconfig.circular.text;
                } else if (vconfig.color) {
                  console.log(vconfig);
                    textLayer.encoding.text.field = vconfig.color.field;
                }
            }
        }
    }
    public mapRoot(config: Coordinate, vconfig: VConfig) {
        config.width = vconfig.width;
        config.height = vconfig.height;
        config.title = vconfig.title;
        config.description = vconfig.description;
    }
    public mapColor(config: Coordinate, vconfig: VConfig) {
        if (vconfig?.color && config) {
            let scale;
            if (vconfig.color.domain || vconfig.color.range) {
                scale = {
                    domain: vconfig.color.domain,
                    range: vconfig.color.range,
                };
            }
            const field = vconfig.color.field;
            const legend = vconfig.color.legend === null ? null : vconfig.color.legend ? { title: vconfig.color.legend } : undefined;
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
    public mapAxis(lsAxis: VAxis, vegaAxis: XClass): XClass {
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
            mappingAxis.axis = { format: lsAxis.titleFormat, grid: lsAxis.grid /*, titleFontSize: 20 */ };
        }
        mappingAxis.title = lsAxis.title;
        _.merge(vAxis, mappingAxis);
        return vAxis;
    }
    public mapAxes(config: Coordinate, vconfig: VConfig) {
        const x = this.mapAxis(vconfig.x, config.encoding?.x);
        const y = this.mapAxis(vconfig.y, config.encoding?.y);
        const tempConfig = {
            encoding: {
                x,
                y,
            },
        };
        _.merge(config, tempConfig);
    }

    public mapShape(config: Coordinate, vconfig: VConfig) {
        if (vconfig.shape) {
            const tempConfig: Coordinate = {
                encoding: {
                    shape: {
                        field: vconfig.shape.field,
                    },
                },
            };
            _.merge(config, tempConfig);
        }
    }
    public mapColumn(config: Coordinate, vconfig: VConfig) {
        if (vconfig.column) {
            const tempConfig: Coordinate = {
                encoding: {
                    column: {
                        field: vconfig.column.field,
                    },
                },
            };
            _.merge(config, tempConfig);
        }
    }
    public mapFill(config: Coordinate, vconfig: VConfig) {
        if (vconfig.fill) {
            // const computeMType = typeof config.mark === 'string' ? config.mark : config.mark.type;
            const tempConfig: Coordinate = {
                mark: {
                    fill: vconfig.fill,
                    type: undefined, // computeMType as BoxPlot,
                },
            };
            _.merge(config, tempConfig);
        }
    }
    public mapPoint(config: Coordinate, vconfig: VConfig) {
        if (vconfig.point) {
            // const computeMType = typeof config.mark === 'string' ? config.mark : config.mark.type;
            const tempConfig: Coordinate = {
                mark: {
                    point: {
                        fill: vconfig.point.fill,
                        filled: vconfig.point.filled,
                    },
                    type: undefined, // computeMType as BoxPlot,
                },
            };
            _.merge(config, tempConfig);
        }
    }
    public mapCircularPlots(config: Coordinate, vconfig: VConfig) {
        if (vconfig.circular) {
            // const computeMType = typeof config.mark === 'string' ? config.mark : config.mark.type;
            const tempConfig: Coordinate = {
                mark: {
                    innerRadius: vconfig.circular.innerRadius as number,
                    outerRadius: vconfig.circular.outerRadius as number,
                    type: undefined,
                },
                encoding: {
                    theta: {
                        field: vconfig.circular.theta,
                    },
                },
            };
            _.merge(config, tempConfig);
        }
    }

    public setTextSize(config: Coordinate, vconfig: VConfig) {
        if (vconfig.textSizeMult) {
            config.title = { text: config.title, fontSize: this.titleSize * vconfig.textSizeMult } as TitleParams;

            const xAxis: Axis = {
                titleFontSize: this.axisTitleSize * vconfig.textSizeMult,
                labelFontSize: this.tickTitleSize * vconfig.textSizeMult,
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
                    titleFontSize: this.legendTitleSize * vconfig.textSizeMult,
                    labelFontSize: this.lengendItemTitleSize * vconfig.textSizeMult,
                };
                config.encoding.color.legend = config.encoding.color.legend ? config.encoding.color.legend: {};
                _.merge(config.encoding.color.legend, legend);
              }
            }
            if (config.layer) {
                const textLayer = config.layer.find(x => (x.mark as Def)?.type === 'text');
                if (textLayer?.encoding?.text) {
                    const mark = { fontSize: this.circularLabelSize * vconfig.textSizeMult}
                    _.merge(textLayer.mark, mark);
                }
            }
        }
    }
}
