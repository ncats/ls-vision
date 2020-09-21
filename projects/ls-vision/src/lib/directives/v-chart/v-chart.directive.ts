import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { Coordinate } from '../../models/vega-lite';
import { LsConfig, LsChart } from '../../models/ls-vision';
import { LsChartService } from '../../services/ls-chart/ls-chart.service';
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
    constructor(private elementRef: ElementRef, private mapper: LsChartService) {}

    ngOnInit() {
        this.drawChart();
    }
    drawChart() {
        let finalConfig: Coordinate = null;

        if (this.lsConfig) {
            finalConfig = this.mapper.mapLStoVegaConfig(this.lsConfig);
        } else if (this.config) {
            finalConfig = this.config;
        }
        if (this.chartType) {
            finalConfig = this.mapper.mergeConfigWithPredefined(finalConfig, this.chartType);
        }
        if (!finalConfig) {
            return;
        }
        if (this.lsConfig) {
            this.mapper.mapToArrayObjs(finalConfig, this.lsConfig);
        }
        if (this.data) {
            finalConfig.data = this.data;
        }

        this.renderChart(this.elementRef, finalConfig, this.theme);
    }

    public renderChart(elementRef: ElementRef, config: Coordinate, theme: string) {
        vegaEmbed(elementRef.nativeElement, config, { theme });
    }

    ngOnChanges() {
        this.drawChart();
    }
}
