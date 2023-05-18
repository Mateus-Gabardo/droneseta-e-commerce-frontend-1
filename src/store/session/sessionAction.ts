import { CartItem } from '../../shared/@types';

export const GET_CART = 'GET_CART';

export const getCart = (cart: CartItem[]) => ({
  type: GET_CART,
  payload: {
    cart,
  },
});

export interface GetCart {
  type: typeof GET_CART;
  payload: {
    cart: CartItem[];
  };
}
