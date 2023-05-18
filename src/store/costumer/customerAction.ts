import { Customer } from '../../shared/@types/customer';

export const GET_CUSTOMER = 'GET_CUSTOMER';

export const getCustomer = (customer: Customer) => ({
  type: GET_CUSTOMER,
  payload: { customer },
});

export interface GetCustomer {
  type: typeof GET_CUSTOMER;
  payload: { customer: Customer };
}
