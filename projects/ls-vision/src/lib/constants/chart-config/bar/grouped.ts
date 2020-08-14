import { Coordinate, Type, BoxPlot, StandardType } from '../../../models/vega-lite';

export const groupedBar: Coordinate = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    mark: {
        type: 'bar' as BoxPlot,
    },
    encoding: {
        column: {
            type: 'ordinal' as StandardType,
            spacing: 10,
        },
        y: {
            type: 'quantitative' as Type,
            axis: {
                grid: false,
            },
        },
        x: {
            type: 'nominal' as Type,
            axis: {
                title: '',
            },
        },
        color: {
            type: 'nominal' as Type,
            scale: {
                range: ['#675193', '#ca8861'],
            },
        },
    },
    config: {
        view: {
            stroke: 'transparent',
        },
        axis: {
            domainWidth: 1,
        },
    },
};
