import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileMobileComponent } from './user-profile-mobile.component';

describe('UserProfileMobileComponent', () => {
  let component: UserProfileMobileComponent;
  let fixture: ComponentFixture<UserProfileMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileMobileComponent]
    });
    fixture = TestBed.createComponent(UserProfileMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
