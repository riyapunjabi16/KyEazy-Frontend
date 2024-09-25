import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './modal.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { breakpointReducer } from 'src/app/redux/reducers/breakpoint.reducer';
import { detailsReducer } from 'src/app/redux/reducers/details.reducer';
import { documentsReducer } from 'src/app/redux/reducers/documents.reducer';
import { routeReducer } from 'src/app/redux/reducers/route.reducer';
import { menuReducer } from 'src/app/redux/reducers/menu.reducer';
import { selfieReducer } from 'src/app/redux/reducers/selfie.reducer';
import { livelinessReducer } from 'src/app/redux/reducers/liveliness.reducer';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

fdescribe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
      declarations: [ModalComponent, LoginComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        HttpClientModule,
        RouterTestingModule,
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
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
