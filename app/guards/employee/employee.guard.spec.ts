import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/app-material.module';
import { breakpointReducer } from 'src/app/redux/reducers/breakpoint.reducer';
import { detailsReducer } from 'src/app/redux/reducers/details.reducer';
import { documentsReducer } from 'src/app/redux/reducers/documents.reducer';
import { livelinessReducer } from 'src/app/redux/reducers/liveliness.reducer';
import { menuReducer } from 'src/app/redux/reducers/menu.reducer';
import { routeReducer } from 'src/app/redux/reducers/route.reducer';
import { selfieReducer } from 'src/app/redux/reducers/selfie.reducer';
import { EmployeeGuard } from './employee.guard';

fdescribe('EmployeeGuard', () => {
  let guard: EmployeeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
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
    });
    guard = TestBed.inject(EmployeeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
