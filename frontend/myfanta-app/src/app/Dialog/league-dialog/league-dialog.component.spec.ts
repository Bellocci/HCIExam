import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueDialogComponent } from './league-dialog.component';

describe('LeagueDialogComponent', () => {
  let component: LeagueDialogComponent;
  let fixture: ComponentFixture<LeagueDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeagueDialogComponent]
    });
    fixture = TestBed.createComponent(LeagueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
