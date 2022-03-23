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
  
    it('should emit signal when openSidenavFromChild method is called', () => {
      let spy_emit = spyOn(component.sidenav_emit, "emit");
  
      component.openSidenavFromChild();
  
      expect(spy_emit).toHaveBeenCalled();
    });
  });
});
