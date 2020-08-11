import { TestBed } from '@angular/core/testing';
import * as SampleCharts from '../../constants/sample-charts';

import { MappingEngineService } from './mapping-engine.service';
import { Coordinate, BinParams } from '../../models/vega-lite';
import { VConfig, VAxis } from '../../models/ls-vision';
import * as Charts from '../../constants/chart-config/lookups';
import * as _ from 'lodash';
import { Def, XClass, Type, TimeUnit, TitleParams, Axis, Legend } from '../../models/vega-lite';
import * as FontSizes from '../../constants/chart-defaults';
let stackedBar: VConfig;
let pie: VConfig;
let samplePieLabels: VConfig;
let pieLabels = Charts.pieLabels;
describe('MappingEngineService', () => {
    let service: MappingEngineService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MappingEngineService);
        stackedBar = _.cloneDeep(SampleCharts.stacked);
        pie = _.cloneDeep(SampleCharts.pie);
        samplePieLabels = _.cloneDeep(SampleCharts.pieLabels);
        pieLabels = _.cloneDeep(Charts.pieLabels);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('mergeConfigWithPredefined', () => {
        it('should map properties', () => {
            const vegaConfig: Coordinate = {};
            const config = service.mergeConfigWithPredefined(vegaConfig, 'stackedBar');
            const areEqual = _.isEqual(config, Charts.stackedBar);
            expect(areEqual).toBeTruthy();
        });

        it('should not map properties', () => {
            const vegaConfig: Coordinate = { width: 123 };
            const config = service.mergeConfigWithPredefined(vegaConfig, null);
            const areEqual = _.isMatch(config, Charts.stackedBar);
            expect(areEqual).toBeFalsy();
        });
    });

    describe('mapColor', () => {
        it('should set color domain and range', () => {
            const vegaConfig: Coordinate = {};
            service.mapColor(vegaConfig, stackedBar);
            expect(vegaConfig.encoding).toBeDefined();
            expect(vegaConfig.encoding.color.field).toEqual(stackedBar.color.field);
            expect(vegaConfig.encoding.color.legend.title).toEqual(stackedBar.color.legend);
            expect(vegaConfig.encoding.color.scale.domain).toEqual(stackedBar.color.domain);
            expect(vegaConfig.encoding.color.scale.range).toEqual(stackedBar.color.range);
            expect(vegaConfig.encoding.color.legend.title).toEqual(stackedBar.color.legend);
        });

        it('should set color range', () => {
            stackedBar.color.domain = undefined;
            const vegaConfig: Coordinate = {};
            service.mapColor(vegaConfig, stackedBar);
            expect(vegaConfig.encoding).toBeDefined();
            expect(vegaConfig.encoding.color.field).toEqual(stackedBar.color.field);
            expect(vegaConfig.encoding.color.legend.title).toEqual(stackedBar.color.legend);
            expect(vegaConfig.encoding.color.scale.domain).toBeUndefined();
            expect(vegaConfig.encoding.color.scale.range).toEqual(stackedBar.color.range);
        });

        it('should set color field', () => {
            stackedBar.color.domain = undefined;
            stackedBar.color.range = undefined;
            const vegaConfig: Coordinate = {};
            service.mapColor(vegaConfig, stackedBar);
            expect(vegaConfig.encoding).toBeDefined();
            expect(vegaConfig.encoding.color.field).toEqual(stackedBar.color.field);
            expect(vegaConfig.encoding.color.legend.title).toEqual(stackedBar.color.legend);
            expect(vegaConfig.encoding.color.scale).toBeUndefined();
        });

        it('should not set legend in pie chart', () => {
            const vegaConfig: Coordinate = {};
            service.mapColor(vegaConfig, pie);
            expect(vegaConfig.encoding).toBeDefined();
            expect(vegaConfig.encoding.color.field).toEqual(pie.color.field);
            expect(vegaConfig.encoding.color.legend).toBeUndefined();
            expect(vegaConfig.encoding.color.scale).toBeUndefined();
        });

        it('should not set color, color undefined', () => {
            stackedBar.color = undefined;
            const vegaConfig: Coordinate = { encoding: {} };
            service.mapColor(vegaConfig, stackedBar);
            expect(vegaConfig.encoding.color).toBeUndefined();
        });

        it('should not set color undefined Vega Config', () => {
            const vegaConfig: Coordinate = null;
            service.mapColor(vegaConfig, stackedBar);
            expect(vegaConfig).toBeNull();
        });

        it('should not set color undefined lsConfig', () => {
            stackedBar.color = undefined;
            const vegaConfig: Coordinate = {};
            service.mapColor(vegaConfig, null);
            expect(vegaConfig).toEqual({});
        });

        it('should not set color undefined lsConfig', () => {
            const vegaConfig: Coordinate = {};
            service.mapColor(vegaConfig, pie);
            expect(vegaConfig.encoding.color.field).toEqual(pie.color.field);
        });
    });

    describe('mapPieLabels', () => {
        it('should map labels', () => {
            const vegaConfig: Coordinate = pieLabels;
            const lsConfig: VConfig = { circular: { theta: 'test', text: '1234', textRadius: 50 } };
            service.mapPieLabels(vegaConfig, lsConfig);
            const textLayer = vegaConfig.layer.find(x => (x.mark as Def)?.type === 'text');
            expect((textLayer.mark as Def).radius).toEqual(50);
            expect(textLayer.encoding.text.field).toEqual('1234');
        });

        // textRadius but nothing in layer
        it('should not map labels nothing in layer', () => {
            const vegaConfig: Coordinate = pieLabels;
            vegaConfig.layer = undefined;
            const testConfig = _.cloneDeep(vegaConfig);
            const lsConfig: VConfig = { circular: { theta: 'test', text: '1234', textRadius: 50 } };
            service.mapPieLabels(vegaConfig, lsConfig);
            const areEqual = _.isMatch(vegaConfig, testConfig);
            expect(areEqual).toBeTruthy();
        });

        // textRadius and something in layer, but no encoding text
        it('should not map labels nothing in layer, something in layer, but no encoding text', () => {
            const vegaConfig: Coordinate = pieLabels;
            const textLayer = vegaConfig.layer.find(x => (x.mark as Def)?.type === 'text');
            textLayer.encoding.text = undefined;
            const testConfig = _.cloneDeep(vegaConfig);
            const lsConfig: VConfig = { circular: { theta: 'test', text: '1234', textRadius: 50 } };
            service.mapPieLabels(vegaConfig, lsConfig);
            const areEqual = _.isMatch(vegaConfig, testConfig);
            expect(areEqual).toBeTruthy();
        });

        it('should map labels using color field for labels', () => {
            const vegaConfig: Coordinate = pieLabels;
            const lsConfig: VConfig = { color: { field: 'colorgroup' }, circular: { theta: 'test', textRadius: 50 } };
            service.mapPieLabels(vegaConfig, lsConfig);
            const textLayer = vegaConfig.layer.find(x => (x.mark as Def)?.type === 'text');
            expect((textLayer.mark as Def).radius).toEqual(50);
            expect(textLayer.encoding.text.field).toEqual('colorgroup');
        });

        it('should map labels', () => {
            const vegaConfig: Coordinate = pieLabels;
            const lsConfig: VConfig = { circular: { theta: 'test', textRadius: 50 } };
            service.mapPieLabels(vegaConfig, lsConfig);
            const textLayer = vegaConfig.layer.find(x => (x.mark as Def)?.type === 'text');
            expect((textLayer.mark as Def).radius).toEqual(50);
            expect(textLayer.encoding.text.field).toBeUndefined();
        });

        // without text and without color
        it('should not map properties', () => {
            const vegaConfig: Coordinate = { width: 123 };
            const config = service.mergeConfigWithPredefined(vegaConfig, null);
            const areEqual = _.isMatch(config, Charts.stackedBar);
            expect(areEqual).toBeFalsy();
        });
    });

    describe('mapAxis', () => {
        it('should exit from undefined', () => {
            const config = service.mapAxis(null, {});
            expect(config).toBeUndefined();
        });

        it('should map field', () => {
            const vegaAxis: XClass = {};
            const lsAxis: VAxis = { field: 'test' };
            const config = service.mapAxis(lsAxis, vegaAxis);
            expect(config.field).toEqual('test');
        });
        it('should map field bin true', () => {
            const vegaAxis: XClass = {};
            const lsAxis: VAxis = { field: 'test', bins: true };
            const config = service.mapAxis(lsAxis, vegaAxis);
            expect(config.bin).toEqual(true);
        });
        it('should map field maxbins', () => {
            const vegaAxis: XClass = {};
            const lsAxis: VAxis = { field: 'test', bins: 123 };
            const config = service.mapAxis(lsAxis, vegaAxis);
            const maxbins = (config.bin as BinParams).maxbins;
            expect(maxbins).toEqual(123);
        });

        it('should map titleFormat', () => {
            const vegaAxis: XClass = {};
            const lsAxis: VAxis = { field: 'test', titleFormat: '1234' };
            const config = service.mapAxis(lsAxis, vegaAxis);
            expect(config.axis).toBeTruthy();
            expect(config.axis.format).toEqual('1234');
            expect(config.axis.grid).toBeUndefined();
        });

        it('should map grid', () => {
            const vegaAxis: XClass = {};
            const lsAxis: VAxis = { field: 'test', grid: false };
            const config = service.mapAxis(lsAxis, vegaAxis);
            expect(config.axis).toBeTruthy();
            expect(config.axis.grid).toEqual(false);
            expect(config.axis.format).toBeUndefined();
        });

        // it('should map properties', () => {
        //     const mappingAxis: XClass = {};
        //     const lsAxis: VAxis = { field: 'test', bins: true };
        //     const config = service.mapAxis(null, {});
        //     expect(config).toBeUndefined();
        // });

        // it('should map properties', () => {
        //     const mappingAxis: XClass = {};
        //     const lsAxis: VAxis = { field: 'test', bins: 100 };
        //     const config = service.mapAxis(null, {});
        //     expect(config).toBeUndefined();
        // });
    });

    describe('setTextSize', () => {
        it('should not map title fontSize', () => {
            const vegaConfig: Coordinate = { title: { text: 'test' } };
            const lsConfig: VConfig = {};
            const config = service.setTextSize(vegaConfig, lsConfig);
            const fontSize = (vegaConfig.title as TitleParams).fontSize;
            expect(fontSize).toBeUndefined();
        });
        it('should map title fontSize', () => {
            const vegaConfig: Coordinate = { title: { text: 'test' } };
            const lsConfig: VConfig = { textSizeMult: 1 };
            const config = service.setTextSize(vegaConfig, lsConfig);
            const fontSize = (vegaConfig.title as TitleParams).fontSize;
            expect(fontSize).toEqual(FontSizes.titleSize);
        });
        it('should map axis fontSize (no axis obj)', () => {
            const vegaConfig: Coordinate = { title: { text: 'test' }, encoding: { x: {}, y: {} } };
            const lsConfig: VConfig = { textSizeMult: 1 };
            const config = service.setTextSize(vegaConfig, lsConfig);
            const xfontSize = vegaConfig.encoding.x.axis.titleFontSize;
            const yfontSize = vegaConfig.encoding.x.axis.titleFontSize;

            const xtickfontSize = vegaConfig.encoding.x.axis.labelFontSize;
            const ytickfontSize = vegaConfig.encoding.x.axis.labelFontSize;

            expect(xfontSize).toEqual(FontSizes.axisTitleSize);
            expect(yfontSize).toEqual(FontSizes.axisTitleSize);
            expect(xtickfontSize).toEqual(FontSizes.tickTitleSize);
            expect(ytickfontSize).toEqual(FontSizes.tickTitleSize);
        });

        it('should map axis fontSize (with axis obj)', () => {
            const vegaConfig: Coordinate = { title: { text: 'test' }, encoding: { x: { axis: {} }, y: { axis: {} } } };
            const lsConfig: VConfig = { textSizeMult: 1 };
            const config = service.setTextSize(vegaConfig, lsConfig);
            const xfontSize = vegaConfig.encoding.x.axis.titleFontSize;
            const yfontSize = vegaConfig.encoding.x.axis.titleFontSize;

            const xtickfontSize = vegaConfig.encoding.x.axis.labelFontSize;
            const ytickfontSize = vegaConfig.encoding.x.axis.labelFontSize;

            expect(xfontSize).toEqual(FontSizes.axisTitleSize);
            expect(yfontSize).toEqual(FontSizes.axisTitleSize);
            expect(xtickfontSize).toEqual(FontSizes.tickTitleSize);
            expect(ytickfontSize).toEqual(FontSizes.tickTitleSize);
        });

        it('should map legend font from no legend', () => {
            const vegaConfig: Coordinate = { encoding: { color: {} } };
            const lsConfig: VConfig = { textSizeMult: 1 };
            service.setTextSize(vegaConfig, lsConfig);
            expect(vegaConfig.encoding.color).not.toBeUndefined();
            expect(vegaConfig.encoding.color.legend.titleFontSize).toEqual(FontSizes.legendTitleSize);
        });

        it('should map color with legend', () => {
            const vegaConfig: Coordinate = { encoding: { color: { legend: {} } } };
            const lsConfig: VConfig = { textSizeMult: 1 };
            service.setTextSize(vegaConfig, lsConfig);
            expect(vegaConfig.encoding.color).not.toBeUndefined();
            expect(vegaConfig.encoding.color.legend.titleFontSize).toEqual(FontSizes.legendTitleSize);
        });
        it('should map Text encoding (circular chart with labels)', () => {
            const vegaConfig: Coordinate = {
                layer: [
                    {
                        mark: { type: 'text', radius: 90 } as Def,
                        encoding: {
                            text: { type: 'nominal' as Type },
                        },
                    },
                ],
            };
            const lsConfig: VConfig = { textSizeMult: 1 };
            service.setTextSize(vegaConfig, lsConfig);
            const textLayer = vegaConfig.layer.find(x => (x.mark as Def)?.type === 'text');
            expect(textLayer.mark).not.toBeUndefined();
            expect((textLayer.mark as Def).fontSize).toEqual(FontSizes.circularLabelSize);
        });
    });

    describe('mapRoot', () => {
        it('should map properties', () => {
            const vegaConfig: Coordinate = {};
            const lsConfig: VConfig = { height: 11, width: 22, title: 'ttl', description: 'desc' };
            const config = service.mapRoot(vegaConfig, lsConfig);
            expect(vegaConfig.height).toEqual(11);
            expect(vegaConfig.width).toEqual(22);
            expect(vegaConfig.title).toEqual('ttl');
            expect(vegaConfig.description).toEqual('desc');
        });
    });

    describe('mapToArrayObjs', () => {
        it('should map properties', () => {
            const vegaConfig: Coordinate = {
                layer: [
                    {
                        mark: { type: 'text', radius: 90 } as Def,
                        encoding: {
                            text: { type: 'nominal' as Type },
                        },
                    },
                ],
            };
            const lsConfig: VConfig = { textSizeMult: 1 };
            service.mapToArrayObjs(vegaConfig, lsConfig);
            const textLayer = vegaConfig.layer.find(x => (x.mark as Def)?.type === 'text');
            expect(textLayer.mark).not.toBeUndefined();
            expect((textLayer.mark as Def).fontSize).toEqual(FontSizes.circularLabelSize);
        });
    });
});
