import { Coordinate, BoxPlot, Type } from '../../../models/vega-lite';

export const scatterplotColored: Coordinate = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    mark: {
      type: 'point' as BoxPlot
    },
    encoding: {
      x: {
        type: 'quantitative' as Type
      },
      y: {
        type: 'quantitative' as Type
      },
      color: {
        type: 'nominal' as Type
      },
      shape: {
        type: 'nominal' as Type
      }
    }
  }