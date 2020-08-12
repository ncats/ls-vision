import { Coordinate } from '../../models/vega-lite';
declare var require: any;

export const areachart: Coordinate = require('./area/area.json');
export const stream: Coordinate = require('./area/stream.json');

export const groupedBar: Coordinate = require('./bar/grouped.json');
export const stackedBar: Coordinate = require('./bar/stacked.json');
export const simpleBar: Coordinate = require('./bar/simple.json');
export const horizontalBar: Coordinate = require('./bar/horizontal.json');

export const donut: Coordinate = require('./circular/donut.json');
export const pie: Coordinate = require('./circular/pie.json');
export const pieLabels: Coordinate = require('./circular/pie-labels.json');

export const heatmap: Coordinate = require('./histogram/heatmap.json');
export const histogram: Coordinate = require('./histogram/histogram.json');

export const lineChart: Coordinate = require('./line/line.json');
export const multiseriesLine: Coordinate = require('./line/multiseries.json');

export const scatterplotColored: Coordinate = require('./scatter/colored.json');
export const scatterplot: Coordinate = require('./scatter/scatterplot.json');

export const box: Coordinate = require('./bar/box.json');
export const bubble: Coordinate = require('./scatter/bubble.json');
