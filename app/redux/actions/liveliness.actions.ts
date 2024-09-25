import { createAction } from '@ngrx/store';
import { Liveliness } from 'src/app/models/liveliness.model';

export const setLiveliness = createAction(
  'SET_LIVELINESS',
  (liveliness: Liveliness) => ({ liveliness })
);
