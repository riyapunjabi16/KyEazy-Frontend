import { createAction } from '@ngrx/store';
import { Details } from 'src/app/models/details.model';

export const setDetails = createAction('SET_DETAILS', (details: Details) => ({
  details,
}));
