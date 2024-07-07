import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTeamDialogComponent } from './user-team-dialog.component';

describe('UserTeamDialogComponent', () => {
  let component: UserTeamDialogComponent;
  let fixture: ComponentFixture<UserTeamDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTeamDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
