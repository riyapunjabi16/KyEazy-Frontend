import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/app-material.module';
import { AdminService } from 'src/app/services/admin/admin.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AdminAllEmployeesComponent } from './admin-all-employees.component';
import { StoreModule } from '@ngrx/store';
import { breakpointReducer } from 'src/app/redux/reducers/breakpoint.reducer';
import { detailsReducer } from 'src/app/redux/reducers/details.reducer';
import { documentsReducer } from 'src/app/redux/reducers/documents.reducer';
import { routeReducer } from 'src/app/redux/reducers/route.reducer';
import { menuReducer } from 'src/app/redux/reducers/menu.reducer';
import { selfieReducer } from 'src/app/redux/reducers/selfie.reducer';
import { livelinessReducer } from 'src/app/redux/reducers/liveliness.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('AdminAllEmployeesComponent', () => {
  let component: AdminAllEmployeesComponent;
  let fixture: ComponentFixture<AdminAllEmployeesComponent>;
  let spy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAllEmployeesComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
        BrowserAnimationsModule,
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
    fixture = TestBed.createComponent(AdminAllEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call service', () => {
  //   let fixture = TestBed.createComponent(AdminAllEmployeesComponent);
  //   let adminAllComponent = fixture.debugElement.componentInstance;
  //   let adminService = fixture.debugElement.injector.get(AdminService);
  //   adminAllComponent.OnSearchSelect();
  //   spy=spyOn(adminService,'getAllEmployeesByName').and.returnValue();
  //   expect(spy).toHaveBeenCalled();
  // });
});
