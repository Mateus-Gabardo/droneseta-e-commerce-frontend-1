import { Order } from '../../shared/@types/order';
import { requestService } from '../../utils/requestService';

export const requestGetOrders = async () => {
  const url = 'http://localhost:8080/pedido';
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(url, {}, headers, false, 'GET');
  return response;
};

export const requestGetOrder = async (orderId: string) => {
  const url = `http://localhost:8080/pedido/${orderId}`;
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(url, {}, headers, false, 'GET');
  return response;
};

export const requestPostOrder = async (order: Order) => {
  const url = 'http://localhost:8080/pedido';
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(url, order, headers, false, 'POST');
  return response;
};

export const requestConfirmOrder = async (orderId: string) => {
  const url = `http://localhost:8080/pedido/confirmarPagamento/${orderId}`;
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(url, {}, headers, false, 'POST');
  return response;
};

export const requestGetCustomerOrders = async (customerId: string) => {
  const url = `http://localhost:8080/pedido/byCliente/${customerId}`;
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(url, {}, headers, false, 'GET');
  return response;
};
