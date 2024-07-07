import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionPlayerSearchComponent } from './option-player-search.component';

describe('OptionPlayerSearchComponent', () => {
  let component: OptionPlayerSearchComponent;
  let fixture: ComponentFixture<OptionPlayerSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionPlayerSearchComponent]
    });
    fixture = TestBed.createComponent(OptionPlayerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
