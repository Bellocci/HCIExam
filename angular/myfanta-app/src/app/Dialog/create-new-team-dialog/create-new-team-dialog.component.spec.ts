import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewTeamDialogComponent } from './create-new-team-dialog.component';

describe('CreateNewTeamDialogComponent', () => {
  let component: CreateNewTeamDialogComponent;
  let fixture: ComponentFixture<CreateNewTeamDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewTeamDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
