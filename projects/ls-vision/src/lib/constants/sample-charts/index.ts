import { VConfig } from 'projects/ls-vision/src/lib/models/ls-vision';
declare var require: any;

export const bar: VConfig = require('./bar/bar-chart.json');
export const horizontal: VConfig = require('./bar/horizontal-bar.json');
export const groupedbar: VConfig = require('./bar/grouped-bar.json');
export const area: VConfig = require('./area/area-chart.json');
export const stream: VConfig = require('./area/stream-chart.json');
export const areaNumber: VConfig = require('./area/number-area.json');
export const donut: VConfig = require('./circular/donut.json');
export const pie: VConfig = require('./circular/pie-chart.json');
export const pieLabels: VConfig = require('./circular/pie-labels.json');
export const line: VConfig = require('./line/line-chart.json');
export const linePoints: VConfig = require('./line/line-stroked-points.json');
export const multiseries: VConfig = require('./line/multiseries-line.json');
export const scatter: VConfig = require('./scatter/scatter-filled.json');
export const scatterColor: VConfig = require('./scatter/colored-scatterplot.json');
export const histogram: VConfig = require('./histogram/histogram.json');
export const heatmap: VConfig = require('./histogram/heatmap.json');
export const stacked: VConfig = require('./bar/stacked.json');

export const box: VConfig = require('./bar/box.json');
export const bubble: VConfig = require('./scatter/bubble.json');