import { CartItem } from '../../shared/@types';
import * as sessionActions from './sessionAction';

export interface State {
  cart: CartItem[];
}

const INITIAL_STATE: State = {
  cart: [],
};

export type Actions = sessionActions.GetCart;

// eslint-disable-next-line default-param-last
export const sessionReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case sessionActions.GET_CART: {
      const { cart } = action.payload;
      return {
        ...state,
        cart,
      };
    }
    default:
      return state;
  }
};
