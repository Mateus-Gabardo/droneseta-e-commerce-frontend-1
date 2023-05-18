import { GetProductsResponse } from '../../shared/@types/product';
import * as productsActions from './productAction';

export interface State {
  products?: GetProductsResponse;
}

const INITIAL_STATE: State = {
  products: undefined,
};

export type Actions = productsActions.GetProducts;

// eslint-disable-next-line default-param-last
export const productReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case productsActions.GET_PRODUCTS: {
      const { products } = action.payload;
      return {
        ...state,
        products,
      };
    }

    default:
      return state;
  }
};
