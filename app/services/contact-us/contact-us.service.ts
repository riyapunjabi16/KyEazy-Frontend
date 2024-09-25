import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ActionDTO } from 'src/app/models/action.model';
import { ContactUs } from '../../models/contact-us.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  constructor(public httpClient: HttpClient) {}

  post(contactUs: ContactUs) {
    return this.httpClient
      .post<ActionDTO>(`${environment.backendURL}/contact-us`, contactUs)
      .pipe(map((response) => response as ActionDTO));
  }
}
