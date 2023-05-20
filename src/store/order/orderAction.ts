import { GetOrdersResponse, OrderContent } from '../../shared/@types/order';

export const GET_ORDER = 'GET_ORDER';
export const GET_ORDERS = 'GET_ORDERS';

export const getOrder = (order: OrderContent) => ({
  type: GET_ORDER,
  payload: {
    order,
  },
});

export interface GetOrder {
  type: typeof GET_ORDER;
  payload: {
    order: OrderContent;
  };
}

export const getOrders = (orders: GetOrdersResponse) => ({
  type: GET_ORDERS,
  payload: {
    orders,
  },
});

export interface GetOrders {
  type: typeof GET_ORDERS;
  payload: {
    orders: GetOrdersResponse;
  };
}
