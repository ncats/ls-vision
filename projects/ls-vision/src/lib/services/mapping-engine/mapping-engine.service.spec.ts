import { TestBed } from '@angular/core/testing';
import * as SampleCharts from '../../constants/sample-charts';

import { MappingEngineService } from './mapping-engine.service';
import { Coordinate } from '../../models/vega-lite';
import { VConfig } from '../../models/ls-vision';

import * as _ from 'lodash';

let stackedBar: VConfig;
let pie: VConfig;
describe('MappingEngineService', () => {
    let service: MappingEngineService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MappingEngineService);
        stackedBar = _.cloneDeep(SampleCharts.stacked);
        pie = _.cloneDeep(SampleCharts.pie);

    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('Map Color', () => {
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

        it('should not set color', () => {
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
});
