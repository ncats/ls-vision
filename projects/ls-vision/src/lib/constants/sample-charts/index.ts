/*import { LsConfig } from 'projects/ls-vision/src/lib/models/ls-vision';
declare var require: any;

export const bar: LsConfig = require('./bar/bar-chart.json');
export const horizontal: LsConfig = require('./bar/horizontal-bar.json');
export const groupedbar: LsConfig = require('./bar/grouped-bar.json');
export const area: LsConfig = require('./area/area-chart.json');
export const stream: LsConfig = require('./area/stream-chart.json');
export const areaNumber: LsConfig = require('./area/number-area.json');
export const donut: LsConfig = require('./circular/donut.json');
export const pie: LsConfig = require('./circular/pie-chart.json');
export const pieLabels: LsConfig = require('./circular/pie-labels.json');
export const line: LsConfig = require('./line/line-chart.json');
export const linePoints: LsConfig = require('./line/line-stroked-points.json');
export const multiseries: LsConfig = require('./line/multiseries-line.json');
export const scatter: LsConfig = require('./scatter/scatter-filled.json');
export const scatterColor: LsConfig = require('./scatter/colored-scatterplot.json');
export const histogram: LsConfig = require('./histogram/histogram.json');
export const heatmap: LsConfig = require('./histogram/heatmap.json');
export const stacked: LsConfig = require('./bar/stacked.json');

export const box: LsConfig = require('./bar/box.json');
export const bubble: LsConfig = require('./scatter/bubble.json');
*/

export * from './area/area-chart';
export * from './area/number-area';
export * from './area/stream-chart';
export * from './bar/stacked';
export * from './bar/box';
export * from './bar/grouped-bar';
export * from './bar/horizontal-bar';
export * from './bar/bar-chart';
export * from './circular/donut';
export * from './circular/pie-labels';
export * from './circular/pie-chart';
export * from './histogram/heatmap';
export * from './histogram/histogram';
export * from './line/line-chart';
export * from './line/multiseries-line';
export * from './line/line-stroked-points';
export * from './scatter/bubble';
export * from './scatter/colored-scatterplot';
export * from './scatter/scatter-filled';
