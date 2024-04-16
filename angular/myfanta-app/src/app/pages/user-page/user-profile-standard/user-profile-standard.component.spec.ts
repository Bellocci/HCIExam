import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileStandardComponent } from './user-profile-standard.component';

describe('UserProfileStandardComponent', () => {
  let component: UserProfileStandardComponent;
  let fixture: ComponentFixture<UserProfileStandardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileStandardComponent]
    });
    fixture = TestBed.createComponent(UserProfileStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
