import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportCategoriesComponent } from './sport-categories.component';

describe('SportCategoriesComponent', () => {
  let component: SportCategoriesComponent;
  let fixture: ComponentFixture<SportCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
