import {handleActions} from "redux-actions";
import * as Actions from '../constants/actions';

const initialState: MemoryStoreState = [{
  id: 0,
  text: 'Use Redux',
  completed: false
}];

export default handleActions<MemoryStoreState, MemoryItemData>({
  [Actions.MemoryData]: (state, action) => {
    return [];
  }

}, initialState)

