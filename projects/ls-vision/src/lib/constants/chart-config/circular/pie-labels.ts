import { Coordinate, Type, BoxPlot } from '../../../models/vega-lite';

export const pieLabels: Coordinate = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    description: 'A simple pie chart with labels.',
    encoding: {
        theta: {
            type: 'quantitative' as Type,
            stack: true,
        },
        color: {
            type: 'nominal' as Type,
            legend: null,
        },
    },
    layer: [
        {
            mark: {
                type: 'arc' as BoxPlot,
            },
        },
        {
            mark: {
                type: 'text' as BoxPlot,
            },
            encoding: {
                text: {
                    type: 'nominal' as Type,
                },
            },
        },
    ],
    view: {
        stroke: null,
    },
};
