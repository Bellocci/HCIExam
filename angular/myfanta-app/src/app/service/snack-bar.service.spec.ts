import { fakeAsync, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SnackBarService } from './snack-bar.service';

describe('SnackBarService', () => {
  let service: SnackBarService;
  let matSnackBar:MatSnackBar;

  const mockMatSnackBar = {
    open: () => {}
  };
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        SnackBarService,
        { provide: MatSnackBar, useValue: mockMatSnackBar }, // <--- use mock
      ]
    });
    service = TestBed.inject(SnackBarService);
    matSnackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call MatSnackBar open method when openSnackBar method is called', fakeAsync(() => {
    let textMessage:string = '';
    let spy_snackbar = spyOn(matSnackBar, "open");

    service.openSnackBar(textMessage);

    expect(spy_snackbar).toHaveBeenCalledTimes(1);
  }));

  it('should call MatSnackBar open method with textMessage, "Close" and a config object', fakeAsync(() => {
    let textMessage:string = 'SnackBar message';
    let spy_snackbar = spyOn(matSnackBar, "open");

    service.openSnackBar(textMessage);

    const args = spy_snackbar.calls.argsFor(0);
    expect(args.length).toBe(3);
    expect(args[0]).toBe(textMessage);
    expect(args[1]).toBe('Close');
    expect(args[2]).toEqual({
      duration : 3000,
      horizontalPosition : 'center',
      verticalPosition : 'bottom'
    })
  }))
});
