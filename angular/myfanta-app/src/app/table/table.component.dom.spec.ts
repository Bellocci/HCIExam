import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";

import { HarnessLoader, parallel } from "@angular/cdk/testing";
import { MatLegacyTableHarness as MatTableHarness } from '@angular/material/legacy-table/testing';
import { MatLegacyPaginatorHarness as MatPaginatorHarness } from '@angular/material/legacy-paginator/testing';
import { MatLegacyButtonHarness as MatButtonHarness } from "@angular/material/legacy-button/testing";
import { MatSortHarness } from '@angular/material/sort/testing';

import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";

import { MaterialModule } from "../material-module";
import { MatLegacyTableDataSource as MatTableDataSource } from "@angular/material/legacy-table";
import { FormsModule } from "@angular/forms";
import {MatSortModule} from '@angular/material/sort';

import { Location } from "@angular/common";
import { Router, Routes } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";


import { TableComponent } from "./table.component";
import { Component } from "@angular/core";

describe('TableComponent DOM', () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;
    let loader: HarnessLoader;
    let location: Location;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MaterialModule,
                NoopAnimationsModule,
                FormsModule,
                RouterTestingModule.withRoutes(routes),
                MatSortModule,
            ],
            declarations: [ 
                TableComponent 
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        loader = TestbedHarnessEnvironment.loader(fixture);
    });

    beforeEach(() => {
        const spy_dataSource = spyOn(component, "getDataSource").
            and.returnValue(
                new MatTableDataSource<any>(PLAYER_DATA)
            );
        fixture.detectChanges();
    });

    it('should compile', () => {
        expect(component).toBeTruthy();
    });

    describe('Template', () => {

        it('should have one mat-table', fakeAsync(async () => {
            const tables = await loader.getAllHarnesses(MatTableHarness);
            expect(tables.length).toBe(1);
        }));

        it('should table have a single header row', fakeAsync(async () => {
            const tables = await loader.getHarness(MatTableHarness);
            const header_row = await tables.getHeaderRows();

            expect(header_row.length).toBe(1);
        }));

        it('should table have no footer row', fakeAsync(async () => {
            const tables = await loader.getHarness(MatTableHarness);
            const footer_row = await tables.getFooterRows();

            expect(footer_row.length).toBe(0);
        }));

        it('should table have a column "Name"', fakeAsync(async () => {
            const table = await loader.getHarness(MatTableHarness);
            const firstRow = (await table.getRows())[0];
            const cells = await firstRow.getCells();
            
            const cellColumnNames = await parallel(() => cells.map(cell => cell.getColumnName()));
            
            expect(cellColumnNames.includes('Name')).toBeTrue();
        }));

        it('should table have a column "Team"', fakeAsync(async () => {
            const table = await loader.getHarness(MatTableHarness);
            const firstRow = (await table.getRows())[0];
            const cells = await firstRow.getCells();
            
            const cellColumnNames = await parallel(() => cells.map(cell => cell.getColumnName()));

            expect(cellColumnNames.includes('Team')).toBeTrue();
        }));

        it('should table have a columns "Role"', fakeAsync(async () => {
            const table = await loader.getHarness(MatTableHarness);
            const header = (await table.getRows())[0];
            const cells = await header.getCells();

            const cellColumnNames = await parallel(() => cells.map(cell => cell.getColumnName()));

            expect(cellColumnNames.includes('Role')).toBeTrue();
        }));

        it('should table have a column "Cost"', fakeAsync(async () => {
            const table = await loader.getHarness(MatTableHarness);
            const firstRow = (await table.getRows())[0];
            const cells = await firstRow.getCells();
            
            const cellColumnNames = await parallel(() => cells.map(cell => cell.getColumnName()));

            expect(cellColumnNames.includes('Cost')).toBeTrue();
        }));

        it('should table have a column "favoritePlayer"', fakeAsync(async () => {
            const table = await loader.getHarness(MatTableHarness);
            const firstRow = (await table.getRows())[0];
            const cells = await firstRow.getCells();
            
            const cellColumnNames = await parallel(() => cells.map(cell => cell.getColumnName()));

            expect(cellColumnNames.includes('favoritePlayer')).toBeTrue();
        }));

        it('should table show details about players', fakeAsync(async () => {
            const table = await loader.getHarness(MatTableHarness);

            const first_player = (await (await table.getRows())[0].getCellTextByIndex()).splice(0, 4);
            const second_player = (await (await table.getRows())[1].getCellTextByIndex()).splice(0, 4);
            const third_player = (await (await table.getRows())[2].getCellTextByIndex()).splice(0, 4);

            expect(first_player).toEqual(PLAYER_1);
            expect(second_player).toEqual(PLAYER_2);
            expect(third_player).toEqual(PLAYER_3);
        }));

        it('should table have a number of icon-buttons "favorite_border" equal to number of players', fakeAsync(async () => {
            fixture.detectChanges();
            
            const icon_btns = await loader.getAllHarnesses(MatButtonHarness.with({text : 'favorite_border'}));

            expect(icon_btns.length).toBe(PLAYER_DATA.length);
        }));

        it('should table show icon-button "favorite" when player is in the favorit list', fakeAsync(async () => {
            const spy_isFavorite = spyOn(component, "isFavoritePlayer").and.returnValue(true);
            fixture.detectChanges();
            
            const icon_btns = await loader.getAllHarnesses(MatButtonHarness.with({text : 'favorite'}));

            expect(icon_btns.length).toBe(PLAYER_DATA.length);
        }));

        it('should have paginator', fakeAsync(async () => {
            const paginator = await loader.getAllHarnesses(MatPaginatorHarness);

            expect(paginator.length).toBe(1);
        }));

        it('should have matSort', async () => {
            const sorts = await loader.getAllHarnesses(MatSortHarness);

            expect(sorts.length).toBe(1);
        });
    });

    describe('Template methods', () => {

        it('should call setPlayerAsFavorite when icon button "favorite_border" is clicked', fakeAsync(async () => {
            const spy_isfavorite = spyOn(component, "isFavoritePlayer").and.returnValue(false);
            const spy_setFavorite = spyOn(component, "setPlayerAsFavorite");

            const icon_btns = await loader.getAllHarnesses(MatButtonHarness.with({text : 'favorite_border'}));
            await icon_btns[0].click();

            expect(spy_setFavorite).toHaveBeenCalledOnceWith(PLAYER_DATA[0]);
        }));

        it('should call removePlayerAsFavorite when icon button "favorite_border" is clicked', fakeAsync(async () => {
            const spy_isfavorite = spyOn(component, "isFavoritePlayer").and.returnValue(true);
            const spy_removeFavorite = spyOn(component, "removePlayerAsFavorite");

            const icon_btns = await loader.getAllHarnesses(MatButtonHarness.with({text : 'favorite'}));
            await icon_btns[0].click();

            expect(spy_removeFavorite).toHaveBeenCalledOnceWith(PLAYER_DATA[0]);
        }));

        it('should paginator be able to navigate between pages', async () => {
            component['_dataSource'] = new MatTableDataSource<any>(PLAYER_DATA);
            component.ngAfterViewInit();

            const paginator = await loader.getHarness(MatPaginatorHarness);

            expect(component.getPageIndex()).toBe(0);
            await paginator.goToNextPage();
            expect(component.getPageIndex()).toBe(1);
            await paginator.goToPreviousPage();
            expect(component.getPageIndex()).toBe(0);
        });

        it('should paginator be able to go to the last page and come back to first page', async () => {
            component['_dataSource'] = new MatTableDataSource<any>(PLAYER_DATA);
            component['_pageSize'] = 5;
            component.ngAfterViewInit();

            const paginator = await loader.getHarness(MatPaginatorHarness);

            expect(component.getPageIndex()).toBe(0);
            await paginator.goToLastPage();
            expect(component.getPageIndex()).toBe(2);
            await paginator.goToFirstPage();
            expect(component.getPageIndex()).toBe(0);
        });

        it('should be able to set the page size', fakeAsync(async () => {
            const paginator = await loader.getHarness(MatPaginatorHarness);
        
            expect(component.getPageSize()).toBe(10);
            await paginator.setPageSize(20);
            expect(component.getPageSize()).toBe(20);
        }));

        it('should mat-sort get the sorted direction of a header', fakeAsync(async () => {
            const sort = await loader.getHarness(MatSortHarness);
            const secondHeader = (await sort.getSortHeaders())[1];
        
            expect(await secondHeader.getSortDirection()).toBe('');
        
            await secondHeader.click();
            expect(await secondHeader.getSortDirection()).toBe('asc');
        
            await secondHeader.click();
            expect(await secondHeader.getSortDirection()).toBe('desc');
        }));

        it('should call setPlayerSelected when row of table is clicked', fakeAsync(async () => {
            const spy_playerSelected = spyOn(component, "setPlayerSelected");
            const rows = fixture.debugElement.queryAll(By.css('tr'));
            const player_toloi = rows[2];

            player_toloi.nativeElement.click();
            tick();

            expect(spy_playerSelected).toHaveBeenCalledWith(PLAYER_DATA[1]);
        }));
    });

    describe('Routing', () => {

        beforeEach(() => {
            router = TestBed.inject(Router);
            location = TestBed.inject(Location);
            router.initialNavigation();
        });

        it('should navigate to player-detail when player name link is clicked', fakeAsync(() => {
            router.navigate(['/playerList']);
            tick();
            expect(location.path()).toBe('/playerList');

            const link = fixture.debugElement.queryAll(By.css('a'));
            const player_pasalic = link[3];
            player_pasalic.nativeElement.click();
            tick();

            expect(location.path()).toBe('/detail/Pasalic');
        }));
    });
});

const PLAYER_DATA = [
    {
        playerId : 1,
        playerName : 'Musso',
        team : 'Atalanta',
        cost : 12,
        role : 'P',
        age : 27,
        matchPlayed : 24,
    },
    {
        playerId : 2,
        playerName : 'Toloi',
        team : 'Atalanta',
        cost : 8,
        role : 'D',
        age : 31,
        matchPlayed : 16,
    },
    {
        playerId : 3,
        playerName : 'Malinovskyi',
        team : 'Atalanta',
        cost : 22,
        role : 'C',
        age : 28,
        matchPlayed : 22,
    },
    {
        playerId : 4,
        playerName : 'Pasalic',
        team : 'Atalanta',
        cost : 28,
        role : 'C',
        age : 27,
        matchPlayed : 24,
    },
    {
        playerId : 5,
        playerName : 'Arnautovic',
        team : 'Bologna',
        cost : 24,
        role : 'A',
        age : 32,
        matchPlayed : 23,
    },
    {
        playerId : 6,
        playerName : 'De Silvestri',
        team : 'Bologna',
        cost : 14,
        role : 'D',
        age : 33,
        matchPlayed : 23,
    },
    {
        playerId : 7,
        playerName : 'Soriano',
        team : 'Bologna',
        cost : 10,
        role : 'C',
        age : 31,
        matchPlayed : 25,
    },
    {
        playerId : 8,
        playerName : 'Skorupski',
        team : 'Bologna',
        cost : 10,
        role : 'P',
        age : 30,
        matchPlayed : 27,
    },
    {
        playerId : 9,
        playerName : 'Theate',
        team : 'Bologna',
        cost : 12,
        role : 'D',
        age : 21,
        matchPlayed : 22,
    },
    {
        playerId : 10,
        playerName : 'Orsolini',
        team : 'Bologna',
        cost : 18,
        role : 'C',
        age : 25,
        matchPlayed : 18,
    },
    {
        playerId : 11,
        playerName : 'Muriel',
        team : 'Atalanta',
        cost : 23,
        role : 'A',
        age : 30,
        matchPlayed : 16,
    },
    {
        playerId : 12,
        playerName : 'Zapata',
        team : 'Atalanta',
        cost : 34,
        role : 'A',
        age : 30,
        matchPlayed : 17,
    },
]

const PLAYER_1 = ['Musso', 'Atalanta', 'P', '12'];
const PLAYER_2 = ['Toloi', 'Atalanta', 'D', '8'];
const PLAYER_3 = ['Malinovskyi', 'Atalanta', 'C', '22'];

@Component({
})
class DummyComponent {
}

const routes: Routes = [
    {path: "playerList", component: DummyComponent},
    {path: "detail/:id", component: DummyComponent}
];