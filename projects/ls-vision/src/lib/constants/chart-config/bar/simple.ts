import { Coordinate, BoxPlot, Type } from '../../../models/vega-lite';

export const simpleBar: Coordinate = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    mark: {
      type: 'bar' as BoxPlot
    },
    encoding: {
      x: {
        type: 'ordinal' as Type,
        axis: {
          labelAngle: 0
        }
      },
      y: {
        type: 'quantitative' as Type
      }
    }
  };