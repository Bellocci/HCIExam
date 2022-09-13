import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFavBlackPlayerComponent } from './table-fav-black-player.component';

describe('TableFavBlackPlayerComponent', () => {
  let component: TableFavBlackPlayerComponent;
  let fixture: ComponentFixture<TableFavBlackPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableFavBlackPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFavBlackPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
