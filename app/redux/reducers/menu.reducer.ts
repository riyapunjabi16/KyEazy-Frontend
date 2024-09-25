import { createReducer, on } from '@ngrx/store';
import { updateMenu } from 'src/app/redux/actions/menu.action';

export const initialState = false;

const _menuReducer = createReducer(
  initialState,
  on(updateMenu, (state: any, { menu }) => {
    return menu;
  })
);

export function menuReducer(state: any, action: any) {
  return _menuReducer(state, action);
}
