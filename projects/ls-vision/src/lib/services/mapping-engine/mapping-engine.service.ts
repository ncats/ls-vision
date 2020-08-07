import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as Charts from '../../constants/chart-config/lookups';
import { Coordinate, Def, XClass, Type, TimeUnit } from '../../models/vega-lite';
import { VConfig, VAxis } from '../../models/ls-vision';
@Injectable({
    providedIn: 'root',
})
export class MappingEngineService {
    public vegaOverwritesLS = false;
    constructor() {}

    public getVisionConfig(config: Coordinate): VConfig {
        const visionConfig: VConfig = {
            x: null,
            y: null,
            circular: null,
            color: null,
            point: null,
            fill: null,
            shape: null,
        };
        for (const attr in visionConfig) {
            if (config[attr] !== undefined) {
                visionConfig[attr] = config[attr];
                config[attr] = undefined;
            }
        }
        return visionConfig;
    }

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
    public mapToArrayObjs(config: Coordinate, vconfig: VConfig) {
        this.mapPieLabels(config, vconfig);
    }
    public mapPieLabels(config: Coordinate, vconfig: VConfig) {
        if (vconfig?.circular?.textRadius && config.layer) {
            const textLayer = config.layer.find(x => (x.mark as Def)?.type === 'text');
            if (textLayer?.encoding?.text) {
                (textLayer.mark as Def).radius = vconfig.circular.textRadius;
                if (vconfig.circular.text) {
                    textLayer.encoding.text.field = vconfig.circular.text;
                } else {
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
        if (vconfig.color) {
            let scale = undefined;
            if (vconfig.color.domain || vconfig.color.range) {
                scale = {
                    domain: vconfig.color.domain,
                    range: vconfig.color.range,
                };
            }
            let field = vconfig.color.field;
            let legend = vconfig.color.legend ? { title: vconfig.color.legend } : undefined;
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
        if (lsAxis.titleFormat) {
            mappingAxis.axis = { format: lsAxis.titleFormat };
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
}
