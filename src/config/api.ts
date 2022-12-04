import axios from 'axios';
import { IResponse } from '../types/IResponse';

export const createApiInstance = (apiUrl: string, apiTokenKey: string) => {
  return axios.create({
    baseURL: apiUrl,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${apiTokenKey}`,
      'Content-Type': 'application/json'
    }
  });
};

export const handleAxiosError = (error: any): IResponse => {
  if (error.response || error.request) {
    console.log('%c Error while processing your request from myfatoorah', 'color: ##ff0000');
    return error.response?.data || error.response?.statusText;
  }
  console.log('%c Error has occurred', error, 'color: ##ff0000');
  process.exit(1);
};
