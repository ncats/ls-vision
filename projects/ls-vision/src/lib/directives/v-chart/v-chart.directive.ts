import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { Coordinate } from '../../models/vega-lite';
import { VConfig } from '../../models/ls-vision';
import { MappingEngineService } from '../../services/mapping-engine/mapping-engine.service';
declare let vegaEmbed: any;

@Directive({
    selector: '[visionChart]',
})
export class VChartDirective implements OnInit, OnChanges {
    @Input() config: Coordinate;
    @Input() lsConfig: VConfig;
    @Input() theme;
    @Input() data;
    @Input() chartType: string;
    public defaultConfig: any;
    constructor(private elementRef: ElementRef, private mapper: MappingEngineService) {
        const config = {
            $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
            description: 'A vertical 2D box plot showing median, min, and max in the US population distribution of age groups in 2000.',
            data: {
                url: 'https://vega.github.io/vega-lite/examples/data/population.json',
            },
            mark: {
                type: 'boxplot',
                extent: 'min-max',
            },
            encoding: {
                x: {
                    field: 'age',
                    type: 'ordinal',
                },
                y: {
                    field: 'people',
                    type: 'quantitative',
                    axis: {
                        title: 'population',
                    },
                },
            },
        };
        vegaEmbed(this.elementRef.nativeElement, config);
    }

    ngOnInit() {
        this.drawChart();
    }
    drawChart() {
        let config: Coordinate = null;

        if (this.lsConfig) {
            config = this.mapper.mapLStoVegaConfig(this.lsConfig);
        } else if (this.config) {
            config = this.config;
        }
        config = this.mapper.mergeConfigWithPredefined(config, this.chartType);
        if (!config) {
            return;
        }
        this.mapper.mapToArrayObjs(config, this.lsConfig);
        if (this.data) {
            config.data = this.data;
        }
        vegaEmbed(this.elementRef.nativeElement, config, { theme: this.theme });
    }
    ngOnChanges() {
        this.drawChart();
    }
}
