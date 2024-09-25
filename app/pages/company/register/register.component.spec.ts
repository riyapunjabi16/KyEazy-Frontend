import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RegisterComponent } from './register.component';

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MaterialModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
