import { createReducer, on } from '@ngrx/store';
import { updateRoute } from 'src/app/redux/actions/route.action';

export const initialState = '/';

const _routeReducer = createReducer(
  initialState,
  on(updateRoute, (state: any, { route }) => {
    return route;
  })
);

export function routeReducer(state: any, action: any) {
  return _routeReducer(state, action);
}
