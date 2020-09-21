import { Coordinate, TimeUnit, BoxPlot, ArgmDef, Type, Align, XEnum } from 'ls-vision/lib/models/vega-lite';

export const regression: Coordinate = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    layer: [
        {
            mark: {
                type: 'point' as BoxPlot,
                filled: true,
            },
            encoding: {
                x: {
                    field: 'Rotten_Tomatoes_Rating',
                    type: 'quantitative' as Type,
                },
                y: {
                    field: 'IMDB_Rating',
                    type: 'quantitative' as Type,
                },
            },
        },
        {
            mark: {
                type: 'line' as BoxPlot,
                color: 'firebrick',
            },
            transform: [
                {
                    regression: 'IMDB_Rating',
                    on: 'Rotten_Tomatoes_Rating',
                },
            ],
            encoding: {
                x: {
                    field: 'Rotten_Tomatoes_Rating',
                    type: 'quantitative' as Type,
                },
                y: {
                    field: 'IMDB_Rating',
                    type: 'quantitative' as Type,
                },
            },
        },
        {
            transform: [
                {
                    regression: 'IMDB_Rating',
                    on: 'Rotten_Tomatoes_Rating',
                    params: true,
                },
                {
                    calculate: `'R²: '+format(datum.rSquared, '.2f')`,
                    as: 'R2',
                },
            ],
            mark: {
                type: 'text' as BoxPlot,
                color: 'firebrick',
                x: 'width' as XEnum,
                align: 'right' as Align,
                y: -5,
            },
            encoding: {
                text: {
                    type: 'nominal' as Type,
                    field: 'R2',
                },
            },
        },
    ],
};
