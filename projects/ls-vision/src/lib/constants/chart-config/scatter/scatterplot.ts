import { Coordinate, BoxPlot, Type } from '../../../models/vega-lite';

export const scatterplot: Coordinate = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    mark: {
        type: 'circle' as BoxPlot,
    },
    encoding: {
        x: {
            type: 'quantitative' as Type,
        },
        y: {
            type: 'quantitative' as Type,
        },
    },
};
