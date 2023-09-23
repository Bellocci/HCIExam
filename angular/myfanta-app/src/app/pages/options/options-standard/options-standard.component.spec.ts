import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsStandardComponent } from './options-standard.component';

describe('OptionsStandardComponent', () => {
  let component: OptionsStandardComponent;
  let fixture: ComponentFixture<OptionsStandardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionsStandardComponent]
    });
    fixture = TestBed.createComponent(OptionsStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
