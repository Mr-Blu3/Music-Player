import { createAction } from 'redux-actions';
import * as Actions from '../constants/actions';

export const createMemory = createAction<MemoryItemData>(Actions.MemoryData);
