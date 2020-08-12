import { VChartDirective } from './v-chart.directive';
import { MappingEngineService } from '../../services/mapping-engine/mapping-engine.service';
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { LsVisionModule } from '../../ls-vision.module';
import { Component, ElementRef } from '@angular/core';
let service: MappingEngineService;
export class MockElementRef extends ElementRef {
    constructor() {
        super(null);
    }
}

describe('VChartDirective', () => {
    it('should create an instance', () => {
        service = new MappingEngineService();
        const eleRef = new MockElementRef();
        const directive = new VChartDirective(eleRef, service);
        expect(directive).toBeTruthy();
    });
    it('should draw chart', () => {
        service = new MappingEngineService();
        const eleRef = new MockElementRef();
        const directive = new VChartDirective(eleRef, service);
        spyOn(service, 'drawChart');
        directive.drawChart();
        expect(service.drawChart).toHaveBeenCalled();
    });
    it('should update changes', () => {
        service = new MappingEngineService();
        const eleRef = new MockElementRef();
        const directive = new VChartDirective(eleRef, service);
        spyOn(service, 'drawChart');
        directive.ngOnChanges();
        expect(service.drawChart).toHaveBeenCalled();
    });
    it('should init', () => {
        service = new MappingEngineService();
        const eleRef = new MockElementRef();
        const directive = new VChartDirective(eleRef, service);
        spyOn(service, 'drawChart');
        directive.ngOnInit();
        expect(service.drawChart).toHaveBeenCalled();
    });
});
