import { Address } from './address.model';

export interface Company {
  companyId: number;
  username: string;
  password: string;
  name: string;
  companyDescription: string;
  cinNumber: string;
  address: Address;
  icon: string;
  kyeasyVerification: string;
  numberOfPendingEmployees: number;
  numberOfRejectedEmployees: number;
  numberOfAcceptedEmployees: number;
  numberOfReportedEmployees: number;
  numberOfTotalEmployees: number;
  numberOfRegisteredEmployees: number;
  coins: number;
  plan: number;
}
