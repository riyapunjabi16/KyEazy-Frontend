import { createAction } from '@ngrx/store';
import { Breakpoint } from 'src/app/models/breakpoint.model';

export const update = createAction('UPDATE', (breakpoint: Breakpoint) => ({
  breakpoint,
}));
