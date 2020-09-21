import { Coordinate, TimeUnit, BoxPlot, ArgmDef, Type, Align, XEnum, SelectionDefType } from 'ls-vision/lib/models/vega-lite';

export const brush: Coordinate = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    description: 'Drag out a rectangular brush to highlight points.',
    selection: {
        brush: {
            type: 'interval' as SelectionDefType,
            init: {
                x: [55, 160],
                y: [13, 37],
            },
        },
    },
    mark: 'point',
    encoding: {
        x: {
            field: 'Horsepower',
            type: 'quantitative' as Type,
        },
        y: {
            field: 'Miles_per_Gallon',
            type: 'quantitative' as Type,
        },
        color: {
            condition: {
                selection: 'brush',
                field: 'Cylinders',
                type: 'ordinal' as Type,
            },
            value: 'grey',
        },
    },
};
