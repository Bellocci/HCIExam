import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ToolbarMobileComponent } from './toolbar-mobile.component';
import { MaterialModule } from 'src/app/material-module';

describe('ToolbarMobileComponent', () => {
  let component: ToolbarMobileComponent;
  let fixture: ComponentFixture<ToolbarMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [
        HttpClientTestingModule,
        MaterialModule,
        RouterTestingModule
      ],
      declarations: [ ToolbarMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Template methods', () => {
    it('should emit signal when openSidenavFromChild method is called', () => {
      let spy_sidenav = spyOn(component.sidenav_emit, "emit");

      component.openSidenavFromChild();

      expect(spy_sidenav).toHaveBeenCalled();
    });
  });
});
