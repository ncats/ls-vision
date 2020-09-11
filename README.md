# Overview

This repository is an Angular library for data visualizations, containing reusable chart directives that can be installed in your own applications.

Once it's cloned and installed on your local server, you can run a demo application that contains a few sample charts.

LS-Vision depends on Vega Lite. The [LS-Vision documentation](https://github.com/LabShare/ls-vision/docs/LsVision-UserGuide.docx) contains examples of the
charts available to you.

# Demo Project

To install and run the demo project

1. download or clone this repository
2. run `npm install`
3. build the application with `ng build`.<br /><br />To auto-build the application during development (to see any code edits you make refreshed in your browser
   automatically), run `ng build --watch=true`

4. run the application with `ng serve`

# Install LS-Vision in your applications

First, install `@labshare/ls-vision`, `vega-lite`, `vega-embed`, and `vega` in your application package.

```bash
npm install @labshare/ls-vision vega-lite vega-embed vega
```

Then, add the Vega-related script files to the `angular.json` file.

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

Import `LsVisionModule` into the application's main module.

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

## Example Bar Chart

### Directive Usage

```
<div visionChart [lsConfig]="bar" [data]="barData" [chartType]="'simpleBar'"></div>
```

### Configuration object

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

### Data object

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
