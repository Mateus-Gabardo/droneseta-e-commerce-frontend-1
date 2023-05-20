import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../reducers';
import * as productActions from '../product/productAction';
import {
  requestCreateProduct,
  requestDeleteProduct,
  requestGetBestSellers,
  requestGetProducts,
} from '../../services/product';
import { Product } from '../../shared/@types/product';

const useProductState = () =>
  useSelector((rootState: RootState) => rootState.productState);

export const useProducts = () => useProductState().products;

export const useGetProducts = () => {
  const dispatch = useDispatch();
  return useCallback(async () => {
    const result = await requestGetProducts();
    dispatch(productActions.getProducts(result));
  }, [dispatch]);
};

export const useDeleteProduct = () =>
  useCallback(async (productId: string) => requestDeleteProduct(productId), []);

export const usePostProduct = () =>
  useCallback(async (product: Product) => requestCreateProduct(product), []);

export const useBestSellers = () => useProductState().bestSellers;

export const useGetBestSellers = () => {
  const dispatch = useDispatch();

  return useCallback(async () => {
    const result = await requestGetBestSellers();
    dispatch(productActions.getBestSellers(result));
  }, [dispatch]);
};
