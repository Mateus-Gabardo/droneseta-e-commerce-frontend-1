import {
  Address,
  Customer,
  GetCustomersResponse,
} from '../../shared/@types/customer';
import * as customerActions from './customerAction';

export interface State {
  customer?: Customer;
  customers?: GetCustomersResponse;
  address?: Address;
}

const INITIAL_STATE: State = {
  customer: undefined,
  customers: undefined,
  address: undefined,
};

export type Actions =
  | customerActions.GetCustomer
  | customerActions.GetCustomers
  | customerActions.GetAddress;

// eslint-disable-next-line default-param-last
export const customerReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case customerActions.GET_CUSTOMER: {
      const { customer } = action.payload;
      return { ...state, customer };
    }
    case customerActions.GET_CUSTOMERS: {
      const { customers } = action.payload;
      return { ...state, customers };
    }
    case customerActions.GET_ADDRESS: {
      const { address } = action.payload;
      return {
        ...state,
        address,
      };
    }
    default:
      return state;
  }
};
