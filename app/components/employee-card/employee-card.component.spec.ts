import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/app-material.module';
import { EmployeeCardComponent } from './employee-card.component';
import { Employee } from 'src/app/models/employee.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { breakpointReducer } from 'src/app/redux/reducers/breakpoint.reducer';
import { detailsReducer } from 'src/app/redux/reducers/details.reducer';
import { documentsReducer } from 'src/app/redux/reducers/documents.reducer';
import { routeReducer } from 'src/app/redux/reducers/route.reducer';
import { menuReducer } from 'src/app/redux/reducers/menu.reducer';
import { selfieReducer } from 'src/app/redux/reducers/selfie.reducer';
import { livelinessReducer } from 'src/app/redux/reducers/liveliness.reducer';

fdescribe('EmployeeCardComponent', () => {
  let component: EmployeeCardComponent;
  let fixture: ComponentFixture<EmployeeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeCardComponent],
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule,
        StoreModule.forRoot({
          breakpoint: breakpointReducer,
          details: detailsReducer,
          documents: documentsReducer,
          route: routeReducer,
          menu: menuReducer,
          selfie: selfieReducer,
          liveliness: livelinessReducer,
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCardComponent);
    component = fixture.componentInstance;
    const NewEmployee: Employee = {} as Employee;
    component.employee = NewEmployee;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
