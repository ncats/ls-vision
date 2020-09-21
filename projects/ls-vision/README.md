# Overview

This repository is an Angular library for data visualizations containing reusable chart directives. Once it's cloned and the dependencies are installed, you can
run a demo application that contains sample charts.

LS-Vision depends on Vega Lite. [Documentation](https://github.com/LabShare/ls-vision/docs/LsVision-UserGuide.docx) contains examples of the available charts.

# Installation

First install LS-Vision vega-lite, vega-embed, and vega

```bash
npm install @labshare/ls-vision vega-lite vega-embed vega
```

Add the Vega javascript vega related script files to angular.json file

```
"architect": {
    "build": {
        ...
        "options": {
            ...
        "scripts": [
            "./node_modules/vega/build/vega.min.js",
            "./node_modules/vega-lite/build/vega-lite.min.js",
            "./node_modules/vega-embed/build/vega-embed.min.js"
        ]
        }
    }
}
```

Import the main module

```
import { LsVisionModule } from '@labshare/ls-vision';

@NgModule({
  ...
  imports: [
    LsVisionModule
  ],
  ...
})
export class AppModule { }
```

# Usage

Example Bar Chart

Directive Usage

```
<div visionChart [lsConfig]="bar" [data]="barData" [chartType]="'simpleBar'"></div>
```

Configuration object

```
const bar = {
    "height": "200",
    "width": "200",
    "title": "My Bar Graph",
    "description": "This is a bar chart",
    "x": {"field": "a", "title": "My Property A"},
    "y": {"field": "c", "title": "My Attribute C"}
  }
```

Data object

```
 const barData = {
    "values": [
      {"a": "A", "c": 28}, {"a": "B", "c": 55}, {"a": "C", "c": 43},
      {"a": "D", "c": 91}, {"a": "E", "c": 81}, {"a": "F", "c": 53},
      {"a": "G", "c": 19}, {"a": "H", "c": 87}, {"a": "I", "c": 52}
    ]
  }
```

# Angular CLI

This repo is a standard Angular CLI library. For more information go to [https://cli.angular.io/](https://cli.angular.io/)
