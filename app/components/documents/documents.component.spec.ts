import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { breakpointReducer } from 'src/app/redux/reducers/breakpoint.reducer';
import { detailsReducer } from 'src/app/redux/reducers/details.reducer';
import { documentsReducer } from 'src/app/redux/reducers/documents.reducer';
import { routeReducer } from 'src/app/redux/reducers/route.reducer';
import { menuReducer } from 'src/app/redux/reducers/menu.reducer';
import { selfieReducer } from 'src/app/redux/reducers/selfie.reducer';
import { livelinessReducer } from 'src/app/redux/reducers/liveliness.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentsComponent } from './documents.component';
import { MaterialModule } from 'src/app/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('DocumentsComponent', () => {
  let component: DocumentsComponent;
  let fixture: ComponentFixture<DocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentsComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MaterialModule,
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
    fixture = TestBed.createComponent(DocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
