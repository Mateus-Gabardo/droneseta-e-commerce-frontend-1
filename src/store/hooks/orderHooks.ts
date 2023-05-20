import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../reducers';
import {
  requestConfirmOrder,
  requestGetCustomerOrders,
  requestGetOrder,
  requestGetOrders,
  requestPostOrder,
} from '../../services/order';
import * as orderActions from '../order/orderAction';
import { Order } from '../../shared/@types/order';

const useOrderState = () =>
  useSelector((rootState: RootState) => rootState.orderState);

export const useOrders = () => useOrderState().orders;

export const useGetOrders = () => {
  const dispatch = useDispatch();

  return useCallback(async () => {
    const result = await requestGetOrders();
    dispatch(orderActions.getOrders(result));
  }, [dispatch]);
};

export const usePostOrder = () =>
  useCallback(async (order: Order) => requestPostOrder(order), []);

export const useOrder = () => useOrderState().order;

export const useGetOrder = () => {
  const dispatch = useDispatch();
  return useCallback(
    async (orderId: string) => {
      const result = await requestGetOrder(orderId);
      dispatch(orderActions.getOrder(result));
    },
    [dispatch]
  );
};

export const useConfirmOrder = () =>
  useCallback((orderId: string) => requestConfirmOrder(orderId), []);

export const useGetCustomerOrders = () => {
  const dispatch = useDispatch();

  return useCallback(
    async (customerId: string) => {
      const result = await requestGetCustomerOrders(customerId);
      dispatch(orderActions.getOrders(result));
    },
    [dispatch]
  );
};
