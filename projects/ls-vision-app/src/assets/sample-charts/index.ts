import { Coordinate } from 'projects/ls-vision/src/lib/models/vega-lite';
declare var require: any;

export const bar: Coordinate = require('./bar/bar-chart.json');
export const horizontal: Coordinate = require('./bar/horizontal-bar.json');
export const groupedbar: Coordinate = require('./bar/grouped-bar.json');
export const area: Coordinate = require('./area/area-chart.json');
export const stream: Coordinate = require('./area/stream-chart.json');
export const areaNumber: Coordinate = require('./area/number-area.json');
export const donut: Coordinate = require('./circular/donut.json');
export const pie: Coordinate = require('./circular/pie-chart.json');
export const pieLabels: Coordinate = require('./circular/pie-labels.json');
export const line: Coordinate = require('./line/line-chart.json');
export const linePoints: Coordinate = require('./line/line-stroked-points.json');
export const multiseries: Coordinate = require('./line/multiseries-line.json');
export const scatter: Coordinate = require('./scatter/scatter-filled.json');
export const scatterColor: Coordinate = require('./scatter/colored-scatterplot.json');
export const histogram: Coordinate = require('./histogram/histogram.json');
export const heatmap: Coordinate = require('./histogram/heatmap.json');
export const stacked: Coordinate = require('./bar/stacked.json');


export const vision = {
    bar: {
        bar,
        horizontal,
        groupedbar,
        stacked
    },
    area: {
        area,
        areaNumber,
        stream
    },
    circular: {
        donut,
        pie,
        pieLabels
    },
    line: {
        line,
        linePoints,
        multiseries
    },
    scatter: {
        scatter,
        scatterColor
    },
    histogram: {
        histogram,
        heatmap
    }
};