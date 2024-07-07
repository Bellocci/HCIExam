import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsVolleyballComponent } from './options-volleyball.component';

describe('OptionsVolleyballComponent', () => {
  let component: OptionsVolleyballComponent;
  let fixture: ComponentFixture<OptionsVolleyballComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionsVolleyballComponent]
    });
    fixture = TestBed.createComponent(OptionsVolleyballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
