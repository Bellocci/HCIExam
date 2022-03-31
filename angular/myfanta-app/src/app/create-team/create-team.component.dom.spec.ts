import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CreateTeamComponent } from "./create-team.component";

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
      ],
      providers: []
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

})