import { requestService } from '../../utils/requestService';

export const requestGetProducts = async () => {
  const url = 'http://localhost:8080/produto';
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(url, {}, headers, false, 'GET');
  return response;
};
