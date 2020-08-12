import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { Coordinate } from '../../models/vega-lite';
import { LsConfig, LsChart } from '../../models/ls-vision';
import { MappingEngineService } from '../../services/mapping-engine/mapping-engine.service';
declare let vegaEmbed: any;

@Directive({
    selector: '[visionChart]',
})
export class VChartDirective implements OnInit, OnChanges {
    @Input() config: Coordinate;
    @Input() lsConfig: LsConfig;
    @Input() theme;
    @Input() data;
    @Input() chartType: string;
    public defaultConfig: any;
    constructor(private elementRef: ElementRef, private mapper: MappingEngineService) {}

    ngOnInit() {
        this.drawChart();
    }
    drawChart() {
        const chartParams: LsChart = {
            elementRef: this.elementRef,
            config: this.config,
            lsConfig: this.lsConfig,
            theme: this.theme,
            data: this.data,
            chartType: this.chartType,
        };
        this.mapper.drawChart(chartParams);
    }
    ngOnChanges() {
        this.drawChart();
    }
}
