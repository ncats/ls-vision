import { Coordinate, BoxPlot, Type } from '../../../models/vega-lite';

export const lineChart: Coordinate = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    mark: {
        type: 'line' as BoxPlot,
    },
    encoding: {
        x: {
            type: 'temporal' as Type,
        },
        y: {
            type: 'quantitative' as Type,
        },
    },
};
