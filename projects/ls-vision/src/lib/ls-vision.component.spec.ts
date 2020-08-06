import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LsVisionComponent } from './ls-vision.component';

describe('LsVisionComponent', () => {
  let component: LsVisionComponent;
  let fixture: ComponentFixture<LsVisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LsVisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LsVisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
