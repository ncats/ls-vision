import { Coordinate, Type, BoxPlot, ExtentExtent } from '../../../models/vega-lite';

export const box: Coordinate = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    mark: {
        type: 'boxplot' as BoxPlot,
        extent: 'min-max' as ExtentExtent,
    },
    encoding: {
        x: {
            type: 'ordinal' as Type,
        },
        y: {
            type: 'quantitative' as Type,
            axis: {
                title: 'population',
            },
        },
    },
};
