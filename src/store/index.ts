import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';

export type { RootState } from './reducers';

const store = configureStore({
  reducer: reducers,
});

export default store;
