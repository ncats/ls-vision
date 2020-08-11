export interface VConfig {
    x?: VAxis;
    y?: VAxis;
    color?: VColor;
    fill?: string;

    // For line chart points
    point?: Point;

    // For scatterplot point shapes
    shape?: Field;

    // For grouped columns
    column?: Field;
    size?: Field;

    // For circular plots
    circular?: CircularPlots;

    height?: number;
    width?: number;
    title?: string;
    description?: string;

    // Multiplier for text size
    textSizeMult?: number;
}

export interface VAxis  {

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

export interface VColor {
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
