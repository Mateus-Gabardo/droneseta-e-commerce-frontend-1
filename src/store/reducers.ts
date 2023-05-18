import { combineReducers } from 'redux';
import { loadingReducer } from './loading/loadingReducer';
import { customerReducer } from './costumer/customerReducer';
import { productReducer } from './product/productReducer';
import { sessionReducer } from './session/sessionReducer';

const reducers = combineReducers({
  loadingState: loadingReducer,
  customerState: customerReducer,
  productState: productReducer,
  sessionState: sessionReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
