import { Coordinate, BoxPlot, Type, NonArgAggregateOp } from '../../../models/vega-lite';

export const histogram : Coordinate= {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    mark: {
      type: 'bar' as BoxPlot
    },
    encoding: {
      x: {
        bin: true,
        type: 'quantitative' as Type
      },
      y: {
        aggregate: 'count' as NonArgAggregateOp,
        type: 'quantitative' as Type
      }
    }
  };