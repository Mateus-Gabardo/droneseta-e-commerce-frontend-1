import { combineReducers } from 'redux';
import { loadingReducer } from './loading/loadingReducer';
import { customerReducer } from './costumer/customerReducer';

const reducers = combineReducers({
  loadingState: loadingReducer,
  customerState: customerReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
