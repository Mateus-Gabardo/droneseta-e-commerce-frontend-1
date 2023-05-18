import { Customer } from '../../shared/@types/customer';
import * as customerActions from './customerAction';

export interface State {
  customer?: Customer;
}

const INITIAL_STATE: State = {
  customer: undefined,
};

export type Actions = customerActions.GetCustomer;

// eslint-disable-next-line default-param-last
export const customerReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case customerActions.GET_CUSTOMER: {
      const { customer } = action.payload;
      return { ...state, customer };
    }
    default:
      return state;
  }
};
