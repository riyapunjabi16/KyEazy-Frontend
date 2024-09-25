import { createReducer, on } from '@ngrx/store';
import { Documents } from 'src/app/models/documents.model';
import { setDocuments } from '../actions/documents.actions';

export const initialState = {} as Documents;

const _documentsReducer = createReducer(
  initialState,
  on(setDocuments, (state: any, { documents }) => {
    return documents;
  })
);

export function documentsReducer(state: any, action: any) {
  return _documentsReducer(state, action);
}
