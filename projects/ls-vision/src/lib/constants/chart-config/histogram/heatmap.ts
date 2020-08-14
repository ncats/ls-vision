import { Coordinate, BoxPlot, Type, NonArgAggregateOp } from '../../../models/vega-lite';

export const heatmap: Coordinate = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    mark: {
        type: 'rect' as BoxPlot,
    },
    encoding: {
        x: {
            type: 'quantitative' as Type,
        },
        y: {
            type: 'quantitative' as Type,
        },
        color: {
            aggregate: 'count' as NonArgAggregateOp,
            type: 'quantitative' as Type,
        },
    },
    config: {
        view: {
            stroke: 'transparent',
        },
    },
};
