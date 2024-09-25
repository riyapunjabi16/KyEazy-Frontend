import { createAction } from '@ngrx/store';
import { Selfie } from 'src/app/models/selfie.model';

export const setSelfie = createAction('SET_SELFIE', (selfie: Selfie) => ({
  selfie,
}));
