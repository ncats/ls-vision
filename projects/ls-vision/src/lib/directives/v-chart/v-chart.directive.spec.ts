import { VChartDirective } from './v-chart.directive';
import { MappingEngineService } from '../../services/mapping-engine/mapping-engine.service';
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { LsVisionModule } from '../../ls-vision.module';
import { Component, ElementRef } from '@angular/core';
let service: MappingEngineService;
export class MockElementRef extends ElementRef {
  constructor() { super(null); }
}
@Component({
    selector: 'my-test-component',
    template: '<div [vChart]></div>',
})
class TestComponent {}
describe('VChartDirective', () => {
    // let fixture: ComponentFixture<TestComponent>;
    // let component: TestComponent;

    // beforeEach(() => {
    //     fixture = TestBed.configureTestingModule({
    //         declarations: [VChartDirective, TestComponent],
    //         providers: [{ provide: MappingEngineService, useValue: service }],
    //     }).createComponent(TestComponent);
    //     component = fixture.componentInstance;
    // });
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
        directive.drawChart();
        expect(directive).toBeTruthy();
    });
});
