import { requestService } from '../../utils/requestService';

export const requestGetCustomers = async () => {
  const url = 'http://localhost:8080/cliente';
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(url, {}, headers, false, 'GET');
  return response;
};

export const requestDeleteCustomer = async (customerId: string) => {
  const url = `http://localhost:8080/cliente/${customerId}`;
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(url, {}, headers, false, 'DELETE');
  return response;
};
