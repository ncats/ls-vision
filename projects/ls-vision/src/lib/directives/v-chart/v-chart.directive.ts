import { Directive, ElementRef } from '@angular/core';
declare let vegaEmbed: any;

@Directive({
    selector: '[visionChart]',
})
export class VChartDirective {
    constructor(private elementRef: ElementRef) {
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
}
