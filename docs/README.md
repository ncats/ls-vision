# LS Vision User Guide

# Overview
LS Vision was built on top of the Vega-Lite grammar / syntax. It uses an Angular directive as an interface with Vega-Lite and chart creation. It simplifies the Vega-Lite grammar. Below shows the input parameters of this directive.
```javascript
    // Vega-Lite configuration of chart. 
    // Either this or lsConfig need to be used
    @Input() config: Coordinate;

    // Configuration with LS-Chart syntax. 
    // Either this or @config need to be used 
    @Input() lsConfig: LsConfig;

    // Vega defined theme
    @Input() theme;

    // Object to be used as data
    @Input() data;

    // Predefined chart type
    @Input() chartType: string;
```

Example usage of the directive
```<div visionChart [lsConfig]="bar" [data]="barData" [chartType]="'simpleBar'"></div>```

To render your chart, you define your chart configuration (for plain Vega-Lite configurations use config parameter, for LS-Vision simplified grammar use lsConfig), define your chart type, and define your data. Default Vega-Lite chart types work out of the box with minimal configruation and can be specified with the chartType property. The possible chart types:
| stackedBar | simpleBar | horizontalBar |
| groupedBar | Areachart | Donut |
| Pie | pieLabels | lineChart |
| multiseriesLine |	Scatterplot | scatterplotColored |
| Histogram | Heatmap | Stream |
| box |		

Examples of each of these charts appear later in the document. 

# Configuration mapping

Below is an example of a Vega Lite configuration for a grouped bar chart.
```javascript
export const oldGroupedBar = {
  $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
  transform: [
    {
      filter: 'datum.year == 2000'
    },
    {
      calculate: 'datum.sex == 2 ? \'Female\' : \'Male\'',
      as: 'gender'
    }
  ],
  width: {
    step: 12
  },
  mark: 'bar',
  encoding: {
    column: {
      field: 'age',
      type: 'ordinal',
      spacing: 10
    },
    y: {
      aggregate: 'sum',
      field: 'people',
      title: 'population',
      axis: {
        grid: false
      }
    },
    x: {
      field: 'gender',
      axis: {
        title: ''
      }
    },
    color: {
      field: 'gender',
      scale: {
        range: [
          '#675193',
          '#ca8861'
        ]
```


Below is the configuration of an LS-Vision chart configuration
```javascript 
export const groupedbar: LsConfig = {
    column: {
        field: 'age',
    },
    y: {
        field: 'people',
        title: 'population',
    },
    x: {
        field: 'sex',
        title: '',
    },
    color: {
        field: 'sex',
        range: ['#675193', '#ca8861'],
    },
};
```

In the LS-Vision configuration the x and y axes map to the Vega-Lite encoding object and allow customization title and property on the json object. In addition the color object maps to the encoding objects’ color, scale and range object. (As a note, the transform object in LS-Vision is not allowed as all data transformations must be performed on the data outside the directive.) 

# Examples of charts



