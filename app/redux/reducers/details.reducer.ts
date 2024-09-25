import { createReducer, on } from '@ngrx/store';
import { setDetails } from '../actions/details.action';
import { Details } from 'src/app/models/details.model';

export const initialState = {} as Details;

const _detailsReducer = createReducer(
  initialState,
  on(setDetails, (state: any, { details }) => {
    return details;
  })
);

export function detailsReducer(state: any, action: any) {
  return _detailsReducer(state, action);
}
