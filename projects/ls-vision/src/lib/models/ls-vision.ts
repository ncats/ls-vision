export interface VConfig {
    x?: VAxis;
    y?: VAxis;
    color?: VColor;
    fill?: string;
    point?: Point;
    shape?: Field;
    column?: Field;
    size?: Field;
    circular?: CircularPlots;

    height?: number;
    width?: number;
    title?: string;
    description?: string;
}

export interface VAxis  {

    // Name of the property on the json object data to pull values and plot
    field: string;

    // Number of bins, if not provided, skip binning
    bins?: number; 

    // If false hide the grid marks on the chart
    grid?: boolean;

    // For time plots, this will plot by year, yearmonth, etc
    timeUnit?: string;

    // Title of the axis
    title?: string;

    // Formats the title (useful for time)
    titleFormat?: string;

    // If you want to change the type
    type?: string;

}

export interface VColor {
    field: string;
    range?: string[];
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
