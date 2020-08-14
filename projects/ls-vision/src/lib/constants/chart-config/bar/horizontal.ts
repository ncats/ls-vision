import { Coordinate, Type, BoxPlot } from '../../../models/vega-lite';

export const horizontalBar: Coordinate = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    description: 'A simple bar chart with embedded data.',
    mark: {
        type: 'bar' as BoxPlot,
    },
    encoding: {
        x: {
            type: 'quantitative' as Type,
        },
        y: {
            type: 'ordinal' as Type,
            axis: {
                labelAngle: 0,
            },
        },
    },
};
