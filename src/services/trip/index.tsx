import { requestService } from '../../utils/requestService';

export const requestGetTrips = async () => {
  const url = 'http://localhost:8080/viagem';
  const headers = { 'content-type': 'application/json' };
  const response = await requestService(url, {}, headers, false, 'GET');
  return response;
};
