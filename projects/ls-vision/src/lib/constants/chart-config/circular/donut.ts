import { Coordinate, BoxPlot, Type } from '../../../models/vega-lite';

export const donut: Coordinate = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    mark: {
      type: 'arc' as BoxPlot
    },
    encoding: {
      theta: {
        type: 'quantitative' as Type
      },
      color: {
        type: 'nominal' as Type
      }
    },
    view: {
      stroke: null
    }
  }