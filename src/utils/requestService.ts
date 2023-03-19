import axios, { AxiosRequestConfig, Method } from 'axios';

export const requestService = async (
  url: string,
  body: unknown,
  headers: any,
  pureHeaders = false,
  method: Method = 'GET'
) => {
  const config: AxiosRequestConfig = {
    method,
    url,
    data: body,
    headers,
    pureHeaders,
  };
  const response = await axios(config);
  return response.data;
};
