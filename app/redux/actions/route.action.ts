import { createAction } from '@ngrx/store';

export const updateRoute = createAction('UPDATE_ROUTE', (route: string) => ({
  route,
}));
