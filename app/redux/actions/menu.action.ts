import { createAction } from '@ngrx/store';

export const updateMenu = createAction('UPDATE_MENU', (menu: boolean) => ({
  menu,
}));
