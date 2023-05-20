import { GetProductsResponse, Product } from '../../shared/@types/product';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_BEST_SELLERS = 'GET_BEST_SELLERS';

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

export const getBestSellers = (bestSellers: Product[]) => ({
  type: GET_BEST_SELLERS,
  payload: {
    bestSellers,
  },
});

export interface GetBestSellers {
  type: typeof GET_BEST_SELLERS;
  payload: {
    bestSellers: Product[];
  };
}
