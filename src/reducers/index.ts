import {combineReducers, ReducersMapObject} from 'redux';
import app from './app';
export interface RootState {
  app: ReducersMapObject;
}

export default combineReducers({
  app: app
});
