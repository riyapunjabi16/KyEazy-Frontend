import { createAction } from '@ngrx/store';
import { Documents } from 'src/app/models/documents.model';

export const setDocuments = createAction(
  'SET_DOCUMENTS',
  (documents: Documents) => ({ documents })
);
