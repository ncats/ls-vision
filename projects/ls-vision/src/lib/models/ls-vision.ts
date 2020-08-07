export interface VConfig {
    x?: VAxis;
    y?: VAxis;
    color?: VColor;
    fill?: string;
    point?: Point;
    shape?: Field;
    column?: Field;
    circular?: CircularPlots;

    height?: number;
    width?: number;
    title?: string;
    description?: string;
}

export interface VAxis  {
    field: string;
    bins?: number;
    timeUnit?: string;
    title?: string;
    titleFormat?: string;
    type?: string;

}

export interface VColor {
    field: string;
    range?: string[];
    domain?: string[];
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
