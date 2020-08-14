import { VChartDirective } from './v-chart.directive';
import { LsChartService } from '../../services/ls-chart/ls-chart.service';
import { ElementRef } from '@angular/core';
let service: LsChartService;
export class MockElementRef extends ElementRef {
    constructor() {
        super(null);
    }
}

describe('VChartDirective', () => {
    it('should create an instance', () => {
        service = new LsChartService();
        const eleRef = new MockElementRef();
        const directive = new VChartDirective(eleRef, service);
        expect(directive).toBeTruthy();
    });
    // it('should draw chart', () => {
    //     service = new LsChartService();
    //     const eleRef = new MockElementRef();
    //     const directive = new VChartDirective(eleRef, service);
    //     spyOn(service, 'drawChart');
    //     directive.drawChart();
    //     expect(service.drawChart).toHaveBeenCalled();
    // });
    it('should update changes', () => {
        service = new LsChartService();
        const eleRef = new MockElementRef();
        const directive = new VChartDirective(eleRef, service);
        spyOn(directive, 'drawChart');
        directive.ngOnChanges();
        expect(directive.drawChart).toHaveBeenCalled();
    });
    it('should init', () => {
        service = new LsChartService();
        const eleRef = new MockElementRef();
        const directive = new VChartDirective(eleRef, service);
        spyOn(directive, 'drawChart');
        directive.ngOnInit();
        expect(directive.drawChart).toHaveBeenCalled();
    });
});

describe('drawChart', () => {
    it('should map ls to vega config', () => {
        service = new LsChartService();
        const eleRef = new MockElementRef();
        const directive = new VChartDirective(eleRef, service);
        directive.config = null;
        directive.lsConfig = {};
        directive.theme = null;
        directive.data = null;
        directive.chartType = 'simpleBar';

        spyOn(service, 'mapLStoVegaConfig').and.callThrough();
        spyOn(service, 'mapToArrayObjs').and.callThrough();
        spyOn(directive, 'renderChart');
        directive.drawChart();

        expect(service.mapLStoVegaConfig).toHaveBeenCalled();
        expect(service.mapToArrayObjs).toHaveBeenCalled();
        expect(directive.renderChart).toHaveBeenCalled();
    });
    it('should only vega config', () => {
        service = new LsChartService();
        const eleRef = new MockElementRef();
        const directive = new VChartDirective(eleRef, service);
        directive.config = {};
        directive.lsConfig = null;
        directive.theme = null;
        directive.data = null;
        directive.chartType = 'simpleBar';

        spyOn(service, 'mapLStoVegaConfig').and.callThrough();
        spyOn(service, 'mapToArrayObjs').and.callThrough();
        spyOn(directive, 'renderChart');
        directive.drawChart();

        expect(service.mapLStoVegaConfig).not.toHaveBeenCalled();
        expect(service.mapToArrayObjs).not.toHaveBeenCalled();
        expect(directive.renderChart).toHaveBeenCalled();
    });
});
