import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyCardComponent } from './company-card.component';
import { Company } from 'src/app/models/company.model';
import { MaterialModule } from 'src/app/app-material.module';
import { StoreModule } from '@ngrx/store';
import { breakpointReducer } from 'src/app/redux/reducers/breakpoint.reducer';
import { detailsReducer } from 'src/app/redux/reducers/details.reducer';
import { documentsReducer } from 'src/app/redux/reducers/documents.reducer';
import { routeReducer } from 'src/app/redux/reducers/route.reducer';
import { menuReducer } from 'src/app/redux/reducers/menu.reducer';
import { selfieReducer } from 'src/app/redux/reducers/selfie.reducer';
import { livelinessReducer } from 'src/app/redux/reducers/liveliness.reducer';

fdescribe('CompanyCardComponent', () => {
  let component: CompanyCardComponent;
  let fixture: ComponentFixture<CompanyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyCardComponent],
      imports: [
        ReactiveFormsModule,
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
    fixture = TestBed.createComponent(CompanyCardComponent);
    component = fixture.componentInstance;
    const newCompany: Company = {} as Company;
    component.company = newCompany;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
