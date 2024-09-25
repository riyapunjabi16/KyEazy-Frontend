import { createReducer, on } from '@ngrx/store';
import { Liveliness } from 'src/app/models/liveliness.model';
import { setLiveliness } from '../actions/liveliness.actions';

export const initialState = {} as Liveliness;

const _livelinessReducer = createReducer(
  initialState,
  on(setLiveliness, (state: any, { liveliness }) => {
    return liveliness;
  })
);

export function livelinessReducer(state: any, action: any) {
  return _livelinessReducer(state, action);
}
