import { ElementRef } from '@angular/core';
import { Coordinate } from './vega-lite';

export interface LsConfig {
    // Y Axis
    x?: LsAxis;

    // X Axis
    y?: LsAxis;

    // Grouping by color
    color?: LsColor;

    // Bar chart color
    fill?: string;

    // For line chart points
    point?: Point;

    // For scatterplot point shapes
    shape?: Field;

    // For grouped columns
    column?: LsColumn;

    // Bubble chart
    size?: Field;

    // For circular plots
    circular?: CircularPlots;

    // Multiplier for text size
    textSizeMult?: number;

    height?: number;
    width?: number;
    title?: string;
    description?: string;
}

export interface LsAxis {
    // Name of the property on the json object data to pull values and plot
    field: string;

    // Number of bins, if not provided, skip binning
    bins?: number | boolean;

    // If false hide the grid marks on the chart
    grid?: boolean;

    // For time plots, this will plot by year, yearmonth, etc
    timeUnit?: string;

    // Title of the axis
    title?: string;

    // Formats the title (useful for time),`datum.value` or %Y
    titleFormat?: string;

    // If you want to change the type
    type?: string;
}

export interface LsColumn {
    field: string;

    // Space between groups. TODO: implement this
    spacing?: number;
}

export interface LsColor {
    field: string;

    // Ordered list of colors to map
    range?: string[];

    // Ordered list of values to map to colors
    domain?: string[];

    // Title for the legend, if value is null, don't show legend
    legend?: string;
}

export interface Field {
    field: string;
}

export interface CircularPlots {
    innerRadius?: number;
    outerRadius?: number;
    textRadius?: number;
    // Field for specifying text labels
    text?: string;
    theta: string;
}

export interface Point {
    filled?: boolean;
    fill?: string;
}

export interface LsChart {
    elementRef: ElementRef;
    lsConfig: LsConfig;
    config: Coordinate;
    theme: string;
    data: any;
    chartType: string;
}
