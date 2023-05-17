import { GetProductsResponse } from '../../shared/@types/product';

export const GET_PRODUCTS = 'GET_PRODUCTS';

export const getProducts = (products: GetProductsResponse) => ({
  type: GET_PRODUCTS,
  payload: {
    products,
  },
});

export interface GetProducts {
  type: typeof GET_PRODUCTS;
  payload: {
    products: GetProductsResponse;
  };
}
