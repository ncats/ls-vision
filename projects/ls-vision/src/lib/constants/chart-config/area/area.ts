import { Coordinate, BoxPlot, Type } from '../../../models/vega-lite';

export const areachart: Coordinate = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    width: 300,
    height: 200,
    mark: {
        type: 'area' as BoxPlot,
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
