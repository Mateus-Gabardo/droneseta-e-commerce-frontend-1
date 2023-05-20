import { GetOrdersResponse, OrderContent } from '../../shared/@types/order';
import * as orderActions from './orderAction';

export interface State {
  orders?: GetOrdersResponse;
  order?: OrderContent;
}

const INITIAL_STATE: State = {
  orders: undefined,
  order: undefined,
};

export type Actions = orderActions.GetOrders | orderActions.GetOrder;

// eslint-disable-next-line default-param-last
export const orderReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case orderActions.GET_ORDERS: {
      const { orders } = action.payload;
      return {
        ...state,
        orders,
      };
    }
    case orderActions.GET_ORDER: {
      const { order } = action.payload;
      return {
        ...state,
        order,
      };
    }
    default:
      return state;
  }
};
