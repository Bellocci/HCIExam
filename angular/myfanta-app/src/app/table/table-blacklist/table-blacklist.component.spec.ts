import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBlacklistComponent } from './table-blacklist.component';

describe('TableBlacklistComponent', () => {
  let component: TableBlacklistComponent;
  let fixture: ComponentFixture<TableBlacklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableBlacklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBlacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
