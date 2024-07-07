import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionFilterComponent } from './option-filter.component';

describe('OptionFilterComponent', () => {
  let component: OptionFilterComponent;
  let fixture: ComponentFixture<OptionFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionFilterComponent]
    });
    fixture = TestBed.createComponent(OptionFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
