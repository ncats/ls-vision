import { Coordinate, Type, BoxPlot, NonArgAggregateOp, TimeUnit } from '../../../models/vega-lite';

export const stackedBar: Coordinate = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    mark: {
      type: 'bar' as BoxPlot
    },
    encoding: {
      x: {
        timeUnit: 'month' as TimeUnit,
        type: 'temporal' as Type
      },
      y: {
        aggregate: 'count' as NonArgAggregateOp,
        type: 'quantitative' as Type
      },
      color: {
        type: 'nominal' as Type
      }
    }
  };