import { Coordinate, Type, BoxPlot } from '../../../models/vega-lite';

export const pieLabels: Coordinate = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    description: 'A simple pie chart with labels.',
    encoding: {
      theta: {
        type: 'quantitative' as Type,
        stack: true
      },
      color: {
        type: 'nominal' as Type,
        legend: null
      }
    },
    layer: [
      {
        mark: {
          type: 'arc' as BoxPlot,
          outerRadius: 80
        }
      },
      {
        mark: {
          type: 'text' as BoxPlot,
          radius: 90
        },
        encoding: {
          text: {
            type: 'nominal' as Type
          }
        }
      }
    ],
    view: {
      stroke: null
    }
  }