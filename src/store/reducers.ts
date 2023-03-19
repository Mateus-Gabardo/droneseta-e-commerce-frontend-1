import { combineReducers } from 'redux';
import { loadingReducer } from './loading/loadingReducer';

const reducers = combineReducers({
  loadingState: loadingReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
