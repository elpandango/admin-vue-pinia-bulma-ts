import axios from "axios";
import {getCookie, deleteCookie} from "@/utils/helpers";

interface IRequestOptions {
  method: string;
  url: string;
  data?: any;
  outerOpts?: object;
  headers?: object;
}

type IRequest = (options: IRequestOptions) => Promise<any>;

export const httpRequest: IRequest = async (options: IRequestOptions): Promise<any> => {
  const { method, url, data, outerOpts } = options;
  const requestData = data ?? null;
  const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const token: string | null = getCookie('token') || localStorage.getItem('token');

  const headers = {
    ...defaultHeaders,
    ...(token && { 'Authorization': 'Bearer ' + token }),
  };

  const requestOptions: IRequestOptions = {
    method,
    url,
    headers,
    ...outerOpts,
  };

  if (data) {
    requestOptions.data = requestData;
  }

  try {
    const response = await axios(requestOptions);
    return response.data;
  } catch (error: any) {
    if (error?.response?.data?.message === 'jwt expired') {
      deleteCookie('token');
      localStorage.removeItem('token');
      window.location.href = '/auth';
    }

    return {
      errors: error?.response?.data?.errors,
      message: error?.response?.data?.message,
      status: error?.response?.status,
    };
  }
};
