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
    it('should draw chart', () => {
        service = new LsChartService();
        const eleRef = new MockElementRef();
        const directive = new VChartDirective(eleRef, service);
        spyOn(service, 'drawChart');
        directive.drawChart();
        expect(service.drawChart).toHaveBeenCalled();
    });
    it('should update changes', () => {
        service = new LsChartService();
        const eleRef = new MockElementRef();
        const directive = new VChartDirective(eleRef, service);
        spyOn(service, 'drawChart');
        directive.ngOnChanges();
        expect(service.drawChart).toHaveBeenCalled();
    });
    it('should init', () => {
        service = new LsChartService();
        const eleRef = new MockElementRef();
        const directive = new VChartDirective(eleRef, service);
        spyOn(service, 'drawChart');
        directive.ngOnInit();
        expect(service.drawChart).toHaveBeenCalled();
    });
});
