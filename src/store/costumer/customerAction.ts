import {
  Address,
  Customer,
  GetCustomersResponse,
} from '../../shared/@types/customer';

export const GET_CUSTOMER = 'GET_CUSTOMER';
export const GET_CUSTOMERS = 'GET_CUSTOMERS';
export const GET_ADDRESS = 'GET_ADDRESS';

export const getCustomer = (customer: Customer) => ({
  type: GET_CUSTOMER,
  payload: { customer },
});

export interface GetCustomer {
  type: typeof GET_CUSTOMER;
  payload: { customer: Customer };
}

export const getCustomers = (customers: GetCustomersResponse) => ({
  type: GET_CUSTOMERS,
  payload: {
    customers,
  },
});

export interface GetCustomers {
  type: typeof GET_CUSTOMERS;
  payload: {
    customers: GetCustomersResponse;
  };
}

export const getAddress = (address: Address) => ({
  type: GET_ADDRESS,
  payload: {
    address,
  },
});

export interface GetAddress {
  type: typeof GET_ADDRESS;
  payload: {
    address: Address;
  };
}
