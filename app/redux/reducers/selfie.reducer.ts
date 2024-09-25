import { createReducer, on } from '@ngrx/store';
import { Selfie } from 'src/app/models/selfie.model';
import { setSelfie } from '../actions/selfie.actions';

export const initialState = {} as Selfie;

const _selfieReducer = createReducer(
  initialState,
  on(setSelfie, (state: any, { selfie }) => {
    return selfie;
  })
);

export function selfieReducer(state: any, action: any) {
  return _selfieReducer(state, action);
}
