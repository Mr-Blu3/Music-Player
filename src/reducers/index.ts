import {combineReducers, ReducersMapObject} from 'redux';
import memory from './memory';

export interface RootState {
  memory: ReducersMapObject;
}

export default combineReducers<RootState>({
  memory: memory,
});

