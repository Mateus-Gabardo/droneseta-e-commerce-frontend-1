import { AddressRegistration } from '../../shared/@types/customer';
import { requestService } from '../../utils/requestService';

export const requestPostAddress = async (address: AddressRegistration) => {
  const url = 'http://localhost:8080/endereco';
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(url, address, headers, false, 'POST');
  return response;
};

export const requestGetAddress = async (customerId: string) => {
  const url = `http://localhost:8080/endereco/cliente/${customerId}`;
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(url, {}, headers, false, 'GET');
  return response;
};
