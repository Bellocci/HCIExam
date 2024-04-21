import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputTextResponsiveComponent } from './output-text-responsive.component';

describe('OutputTextResponsiveComponent', () => {
  let component: OutputTextResponsiveComponent;
  let fixture: ComponentFixture<OutputTextResponsiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutputTextResponsiveComponent]
    });
    fixture = TestBed.createComponent(OutputTextResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
