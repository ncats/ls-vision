import { Component, OnInit } from '@angular/core';
import * as SampleCharts from '../assets/sample-charts';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'ls-vision-app';

    bar = SampleCharts.bar;
    horizontal = SampleCharts.horizontal;
    groupedBar = SampleCharts.groupedbar;
    area = SampleCharts.area;
    areaNumber = SampleCharts.areaNumber;
    donut = SampleCharts.donut;
    pie = SampleCharts.pie;
    pieLabels = SampleCharts.pieLabels;
    line = SampleCharts.line;
    linePoints = SampleCharts.linePoints;
    multiseries = SampleCharts.multiseries;
    scatter = SampleCharts.scatter;
    scatterColor = SampleCharts.scatterColor;
    histogram = SampleCharts.histogram;
    heatmap = SampleCharts.heatmap;
    stream = SampleCharts.stream;
    stacked = SampleCharts.stacked;
    box = SampleCharts.box;
    bubble = SampleCharts.bubble;

    barData;
    stackedData;
    groupedData;
    areaData;
    donutData;
    lineData;
    multiseriesData;
    scatterData;
    histogramData;

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.http.get('../assets/chart-data/simpleBar.json').subscribe(data => (this.barData = data));
        this.http.get('../assets/chart-data/unemployment-across-industries.json').subscribe(data => {
            this.areaData = { values: data };
        });
        this.http.get('../assets/chart-data/donut.json').subscribe(data => {
            this.donutData = { values: data };
        });

        this.http.get('../assets/chart-data/stocks.json').subscribe(data => {
            this.lineData = { values: (data as []).filter(x => (x as any).symbol === 'GOOG') };
            this.multiseriesData = { values: data };
        });
        this.http.get('../assets/chart-data/cars.json').subscribe(data => {
            this.scatterData = { values: data };
        });
        this.http.get('../assets/chart-data/movies.json').subscribe(data => {
            this.histogramData = { values: data };
        });

        this.http.get('../assets/chart-data/population.json').subscribe(data => {
            this.groupedData = { values: data };
        });

        this.http.get('../assets/chart-data/seattle-weather.json').subscribe(data => {
            this.stackedData = { values: data };
        });
    }
}
