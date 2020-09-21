import { Coordinate, TimeUnit, BoxPlot, ArgmDef, Type, SelectionDefType, SingleDefUnitChannel } from 'ls-vision/lib/models/vega-lite';

export const composite: Coordinate = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    title: 'Seattle Weather, 2012-2015',
    data: {
        url: 'data/seattle-weather.csv',
    },
    vconcat: [
        {
            encoding: {
                color: {
                    condition: {
                        selection: 'brush',
                        title: 'Weather',
                        field: 'weather',
                        type: 'nominal' as Type,
                        scale: {
                            domain: ['sun', 'fog', 'drizzle', 'rain', 'snow'],
                            range: ['#e7ba52', '#a7a7a7', '#aec7e8', '#1f77b4', '#9467bd'],
                        },
                    },
                    value: 'lightgray',
                },
                size: {
                    title: 'Precipitation',
                    field: 'precipitation',
                    scale: {
                        domain: [-1, 50],
                    },
                    type: 'quantitative' as Type,
                },
                x: {
                    field: 'date',
                    timeUnit: 'monthdate' as TimeUnit,
                    title: 'Date',
                    axis: {
                        format: '%b',
                    },
                },
                y: {
                    title: 'Maximum Daily Temperature (C)',
                    field: 'temp_max',
                    scale: {
                        domain: [-5, 40],
                    },
                    type: 'quantitative' as Type,
                },
            },
            width: 600,
            height: 300,
            mark: 'point' as BoxPlot,
            selection: {
                brush: {
                    encodings: ['x' as SingleDefUnitChannel],
                    type: 'interval' as SelectionDefType,
                },
            },
            transform: [
                {
                    filter: {
                        selection: 'click',
                    },
                },
            ],
        },
        {
            encoding: {
                color: {
                    condition: {
                        selection: 'click',
                        field: 'weather',
                        scale: {
                            domain: ['sun', 'fog', 'drizzle', 'rain', 'snow'],
                            range: ['#e7ba52', '#a7a7a7', '#aec7e8', '#1f77b4', '#9467bd'],
                        },
                    },
                    value: 'lightgray',
                },
                x: {
                    aggregate: 'count' as ArgmDef,
                },
                y: {
                    title: 'Weather',
                    field: 'weather',
                },
            },
            width: 600,
            mark: 'bar' as BoxPlot,
            selection: {
                click: {
                    encodings: ['color' as SingleDefUnitChannel],
                    type: 'multi' as SelectionDefType,
                },
            },
            transform: [
                {
                    filter: {
                        selection: 'brush',
                    },
                },
            ],
        },
    ],
};
