import { createReducer, on } from '@ngrx/store';
import { Breakpoint } from 'src/app/models/breakpoint.model';
import { update } from '../actions/breakpoint.action';

export const initialState = {} as Breakpoint;

const _breakpointReducer = createReducer(
  initialState,
  on(update, (state: any, { breakpoint }) => {
    return breakpoint;
  })
);

export function breakpointReducer(state: any, action: any) {
  return _breakpointReducer(state, action);
}
