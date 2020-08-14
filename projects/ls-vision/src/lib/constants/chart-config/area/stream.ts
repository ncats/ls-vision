import { Coordinate, BoxPlot, TimeUnit, Type, NonArgAggregateOp, StackOffset } from '../../../models/vega-lite';

export const stream: Coordinate = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    mark: {
        type: 'area' as BoxPlot,
    },
    encoding: {
        x: {
            timeUnit: 'yearmonth' as TimeUnit,
            type: 'temporal' as Type,
            axis: {
                domain: true,
                tickSize: 0,
            },
        },
        y: {
            aggregate: 'sum' as NonArgAggregateOp,
            type: 'quantitative' as Type,
            axis: null,
            stack: 'center' as StackOffset,
        },
        color: {
            type: 'nominal' as Type,
            scale: {
                scheme: 'category20b',
            },
        },
    },
};
