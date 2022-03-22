import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { InternalDataService } from 'src/app/internal-data.service';
import { SharedService } from 'src/app/shared.service';

import { ToolbarBaseComponent } from './toolbar-base.component';

describe('ToolbarBaseComponent', () => {
  let component: ToolbarBaseComponent;
  let fixture: ComponentFixture<ToolbarBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ 
        ToolbarBaseComponent
      ],
      providers : [
        SharedService, 
        InternalDataService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Template methods', () => {
    
    it('should call isMobileLayout method when window is resized', () => {
      const spy_isMobile = spyOn(component, "isMobileLayout");
  
      window.dispatchEvent(new Event('resize'));
  
      expect(spy_isMobile).toHaveBeenCalled();
    });
  
    it('should isMobileLayout method set is_mobile to false when window is resized to width greater than 800', () => {
      component.is_mobile = true;
      window.innerWidth = 1000;
  
      window.dispatchEvent(new Event('resize'));
  
      expect(component.is_mobile).toBeFalse();
    });
  
    it('should isMobileLayout method set is_mobile to false when window is resized to width equal to 800', () => {
      component.is_mobile = true;
      window.innerWidth = 800;
  
      window.dispatchEvent(new Event('resize'));
  
      expect(component.is_mobile).toBeFalse();
    });
  
    it('should isMobileLayout method set is_mobile to true when window is resized to width less than 800', () => {
      component.is_mobile = false;
      window.innerWidth = 700;
  
      window.dispatchEvent(new Event('resize'));
  
      expect(component.is_mobile).toBeTrue();
    });
  
    it('should emit signal when openSidenavFromChild method is called', () => {
      let spy_emit = spyOn(component.sidenav_emit, "emit");
  
      component.openSidenavFromChild();
  
      expect(spy_emit).toHaveBeenCalled();
    });
  });
});
