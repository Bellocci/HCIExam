import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsFootballComponent } from './options-football.component';

describe('OptionsFootballComponent', () => {
  let component: OptionsFootballComponent;
  let fixture: ComponentFixture<OptionsFootballComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionsFootballComponent]
    });
    fixture = TestBed.createComponent(OptionsFootballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
