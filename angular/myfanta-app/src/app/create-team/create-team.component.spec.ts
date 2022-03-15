import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CreateTeamComponent } from './create-team.component';

describe('CreateTeamComponent', () => {
  let component: CreateTeamComponent;
  let fixture: ComponentFixture<CreateTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [ 
        CreateTeamComponent 
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {

    it('breakpoint value should be 5 when getInnerWidth return a value greater than 480', fakeAsync(() => {
      let width = 1000;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();

      expect(component.breakpoint).toEqual(5);
    }));

    it('breakpoint value should be 5 when getInnerWidth return a value equal to 480', fakeAsync(() => {
      let width = 480;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();

      expect(component.breakpoint).toEqual(5);
    }));

    it('breakpoint value should be 1 when getInnerWidth return a value less than 480', fakeAsync(() => {
      let width = 300;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();

      expect(component.breakpoint).toEqual(1);
    }));

    it('cols_tabs value should be 3 when getInnerWidth return a value greater than 480', fakeAsync(() => {
      let width = 1000;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();

      expect(component.cols_tabs).toEqual(3);
    }));

    it('cols_tabs value should be 3 when getInnerWidth return a value equal to 480', fakeAsync(() => {
      let width = 480;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();

      expect(component.cols_tabs).toEqual(3);
    }));

    it('cols_tab value should be 1 when getInnerWidth return a value less than 480', fakeAsync(() => {
      let width = 300;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();

      expect(component.cols_tabs).toEqual(1);
    }));

    it('rows_tabs value should be 6 when getInnerWidth return a value greater than 480', fakeAsync(() => {
      let width = 1000;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();

      expect(component.rows_tabs).toEqual(6);
    }));

    it('rows_tabs value should be 6 when getInnerWidth return a value equal to 480', fakeAsync(() => {
      let width = 480;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();

      expect(component.rows_tabs).toEqual(6);
    }));

    it('rows_tabs value should be 1 when getInnerWidth return a value less than 480', fakeAsync(() => {
      let width = 300;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();

      expect(component.rows_tabs).toEqual(1);
    }));

    it('cols_buttons value should be 2 when getInnerWidth return a value greater than 480', fakeAsync(() => {
      let width = 1000;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();

      expect(component.cols_buttons).toEqual(2);
    }));

    it('cols_buttons value should be 2 when getInnerWidth return a value equal to 480', fakeAsync(() => {
      let width = 480;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();

      expect(component.cols_buttons).toEqual(2);
    }));

    it('cols_buttons value should be 1 when getInnerWidth return a value less than 480', fakeAsync(() => {
      let width = 300;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();

      expect(component.cols_buttons).toEqual(1);
    }));

    it('rows_buttons value should be 6 when getInnerWidth return a value greater than 480', fakeAsync(() => {
      let width = 1000;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();

      expect(component.rows_buttons).toEqual(6);
    }));

    it('rows_buttons value should be 6 when getInnerWidth return a value equal to 480', fakeAsync(() => {
      let width = 480;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();

      expect(component.rows_buttons).toEqual(6);
    }));

    it('rows_buttons value should be 1 when getInnerWidth return a value less than 480', fakeAsync(() => {
      let width = 300;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.ngOnInit();

      expect(component.rows_buttons).toEqual(1);
    }));
  });

  describe('Methods called by template', () => {

    it('onResize should set breakpoint value to 5 when getInnerWidth return a value greater than 480', fakeAsync(() => {
      let width = 1000;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();

      expect(component.breakpoint).toEqual(5);
    }));

    it('onResize should set breakpoint value to 5 when getInnerWidth return a value equal to 480', fakeAsync(() => {
      let width = 480;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();

      expect(component.breakpoint).toEqual(5);
    }));

    it('onResize should set breakpoint value to 1 when getInnerWidth return a value less than 480', fakeAsync(() => {
      let width = 300;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();

      expect(component.breakpoint).toEqual(1);
    }));

    it('onResize should set cols_tabs value to 3 when getInnerWidth return a value greater than 480', fakeAsync(() => {
      let width = 1000;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();

      expect(component.cols_tabs).toEqual(3);
    }));

    it('onResize should set cols_tabs value to 3 when getInnerWidth return a value equal to 480', fakeAsync(() => {
      let width = 480;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();

      expect(component.cols_tabs).toEqual(3);
    }));

    it('onResize should set cols_tabs value to 1 when getInnerWidth return a value less than 480', fakeAsync(() => {
      let width = 300;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();

      expect(component.cols_tabs).toEqual(1);
    }));

    it('onResize should set rows_tabs value to 6 when getInnerWidth return a value greater than 480', fakeAsync(() => {
      let width = 1000;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();

      expect(component.rows_tabs).toEqual(6);
    }));

    it('onResize should set rows_tabs value to 6 when getInnerWidth return a value equal to 480', fakeAsync(() => {
      let width = 480;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();

      expect(component.rows_tabs).toEqual(6);
    }));

    it('onResize should set rows_tabs value to 1 when getInnerWidth return a value less than 480', fakeAsync(() => {
      let width = 300;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();

      expect(component.rows_tabs).toEqual(1);
    }));

    it('onResize should set cols_buttons value to 2 when getInnerWidth return a value greater than 480', fakeAsync(() => {
      let width = 1000;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();

      expect(component.cols_buttons).toEqual(2);
    }));

    it('onResize should set cols_buttons value to 2 when getInnerWidth return a value equal to 480', fakeAsync(() => {
      let width = 480;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();

      expect(component.cols_buttons).toEqual(2);
    }));

    it('onResize should set cols_buttons value to 1 when getInnerWidth return a value less than 480', fakeAsync(() => {
      let width = 300;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();

      expect(component.cols_buttons).toEqual(1);
    }));

    it('onResize should set rows_buttons value to 6 when getInnerWidth return a value greater than 480', fakeAsync(() => {
      let width = 1000;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();

      expect(component.rows_buttons).toEqual(6);
    }));

    it('onResize should set rows_buttons value to 6 when getInnerWidth return a value equal to 480', fakeAsync(() => {
      let width = 480;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();

      expect(component.rows_buttons).toEqual(6);
    }));

    it('onResize should set rows_buttons value to 1 when getInnerWidth return a value less than 480', fakeAsync(() => {
      let width = 300;
      let spy_window = spyOn(component, 'getInnerWidth').and.returnValue(width);

      component.onResize();

      expect(component.rows_buttons).toEqual(1);
    }));

    it('setTabSelected should set tab_selected to empty string when parameter is an empty string', () => {
      let textTab:string = '';

      component.setTabSelected(textTab);

      expect(component.tab_selected).toEqual(textTab);
    });

    it('setTabSelected should set tab_selected to string when parameter is a non-empty string', () => {
      let textTab:string = 'Team';

      component.setTabSelected(textTab);

      expect(component.tab_selected).toEqual(textTab);
    });

    it('should set inputVisible to true when textTab is not equal to Option', () => {
      let textTab:string = 'Team';
      component.input_visible = false;

      expect(component.input_visible).toBeFalse();

      component.setInputVisible(textTab);

      expect(component.input_visible).toBeTrue();
    });

    it('should set inputVisible to false when textTab is equal to Options', () => {
      let textTab:string = 'Options';

      expect(component.input_visible).toBeTrue();

      component.setInputVisible(textTab);

      expect(component.input_visible).toBeFalse();
    });

  });

});
