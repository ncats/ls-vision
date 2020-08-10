import { TestBed } from '@angular/core/testing';
import * as SampleCharts from '../../constants/sample-charts';

import { MappingEngineService } from './mapping-engine.service';
import { Coordinate } from '../../models/vega-lite';

describe('MappingEngineService', () => {
  let service: MappingEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MappingEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set color domain and range', () => {
    const stackedBar = SampleCharts.stacked;
    const vegaConfig: Coordinate = {};
    service.mapColor(vegaConfig, stackedBar);
    expect(vegaConfig.encoding).toBeDefined();
    expect(vegaConfig.encoding.color.field).toEqual(stackedBar.color.field);
    expect(vegaConfig.encoding.color.legend.title).toEqual(stackedBar.color.legend);
    expect(vegaConfig.encoding.color.scale.domain).toEqual(stackedBar.color.domain);
    expect(vegaConfig.encoding.color.scale.range).toEqual(stackedBar.color.range);
  });

  it('should set color range', () => {
    const stackedBar = SampleCharts.stacked;
    stackedBar.color.domain = undefined;
    const vegaConfig: Coordinate = {};
    service.mapColor(vegaConfig, stackedBar);
    expect(vegaConfig.encoding).toBeDefined();
    expect(vegaConfig.encoding.color.field).toEqual(stackedBar.color.field);
    expect(vegaConfig.encoding.color.legend.title).toEqual(stackedBar.color.legend);
    expect(vegaConfig.encoding.color.scale.domain).toBeUndefined();
    expect(vegaConfig.encoding.color.scale.range).toEqual(stackedBar.color.range);
  });

  it('should not set color', () => {
    const stackedBar = SampleCharts.stacked;
    stackedBar.color = undefined;
    const vegaConfig: Coordinate = {encoding: {}};
    service.mapColor(vegaConfig, stackedBar);
    expect(vegaConfig.encoding.color).toBeUndefined();
  });
});
