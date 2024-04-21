import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryPasswordDialogComponent } from './recovery-password-dialog.component';

describe('RecoveryPasswordDialogComponent', () => {
  let component: RecoveryPasswordDialogComponent;
  let fixture: ComponentFixture<RecoveryPasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoveryPasswordDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryPasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
