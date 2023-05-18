import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../reducers';
import * as productActions from '../product/productAction';
import { requestGetProducts } from '../../services/product';

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
