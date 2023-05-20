import { GetProductsResponse, Product } from '../../shared/@types/product';
import * as productActions from './productAction';

export interface State {
  products?: GetProductsResponse;
  bestSellers?: Product[];
}

const INITIAL_STATE: State = {
  products: undefined,
  bestSellers: undefined,
};

export type Actions =
  | productActions.GetProducts
  | productActions.GetBestSellers;

// eslint-disable-next-line default-param-last
export const productReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case productActions.GET_PRODUCTS: {
      const { products } = action.payload;
      return {
        ...state,
        products,
      };
    }
    case productActions.GET_BEST_SELLERS: {
      const { bestSellers } = action.payload;
      return {
        ...state,
        bestSellers,
      };
    }
    default:
      return state;
  }
};
