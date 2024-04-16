import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsBasketballComponent } from './options-basketball.component';

describe('OptionsBasketballComponent', () => {
  let component: OptionsBasketballComponent;
  let fixture: ComponentFixture<OptionsBasketballComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionsBasketballComponent]
    });
    fixture = TestBed.createComponent(OptionsBasketballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
