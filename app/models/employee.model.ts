import { Byte } from '@angular/compiler/src/util';
import { Address } from './address.model';

export interface Employee {
  employeeId: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  documentType: string;
  documentNumber: string;
  emailID: string;
  capturedImage: Byte[] | File;
  status: string;
  dateTimeofApplication: Date;
  dateTimeofVerification: Date;
  companyId: number;
  address: Address;
  gender: string;
  employeeVideo: string;
  question: String;
  review: string;
}
