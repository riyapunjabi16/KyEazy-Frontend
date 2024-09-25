import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/app-material.module';
import { DetailsComponent } from 'src/app/components/details/details.component';
import { DocumentsComponent } from 'src/app/components/documents/documents.component';
import { LivelinessComponent } from 'src/app/components/liveliness/liveliness.component';
import { ReviewComponent } from 'src/app/components/review/review.component';
import { SelfieComponent } from 'src/app/components/selfie/selfie.component';
import { breakpointReducer } from 'src/app/redux/reducers/breakpoint.reducer';
import { detailsReducer } from 'src/app/redux/reducers/details.reducer';
import { documentsReducer } from 'src/app/redux/reducers/documents.reducer';
import { livelinessReducer } from 'src/app/redux/reducers/liveliness.reducer';
import { menuReducer } from 'src/app/redux/reducers/menu.reducer';
import { routeReducer } from 'src/app/redux/reducers/route.reducer';
import { selfieReducer } from 'src/app/redux/reducers/selfie.reducer';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KycComponent } from './kyc.component';

fdescribe('KycComponent', () => {
  let component: KycComponent;
  let fixture: ComponentFixture<KycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        KycComponent,
        DetailsComponent,
        DocumentsComponent,
        SelfieComponent,
        LivelinessComponent,
        ReviewComponent,
      ],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        FormsModule,
        MatSnackBarModule,
        RouterTestingModule,
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
    fixture = TestBed.createComponent(KycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
