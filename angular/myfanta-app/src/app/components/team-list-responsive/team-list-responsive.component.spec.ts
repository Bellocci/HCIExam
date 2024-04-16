import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamListResponsiveComponent } from './team-list-responsive.component';

describe('TeamListResponsiveComponent', () => {
  let component: TeamListResponsiveComponent;
  let fixture: ComponentFixture<TeamListResponsiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamListResponsiveComponent]
    });
    fixture = TestBed.createComponent(TeamListResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
