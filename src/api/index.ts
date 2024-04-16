import axios from "axios";
import {getCookie} from "@/utils/helpers";

type IRequest = (
  method: string,
  url: string,
  data?: any,
  outerOpts?: object,
  headers?: {
    [key: string]: string;
  }
) => Promise<any>;

interface RequestOptions {
  method: string;
  url: string;
  data?: any;
  // withCredentials?: boolean;
  headers: {
    [key: string]: string;
  };
  outerOpts?: object;
}

export const httpRequest: IRequest = async (method: string, url: string, data?: any, outerOpts?: object): Promise<any> => {
  const requestData = data ?? null;
  const options: RequestOptions = {
    method,
    url,
    // withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    ...outerOpts,
  };

  if (getCookie('token')) {
    options.headers['Authorization'] = 'Bearer ' + getCookie('token');
  }

  if (data) {
    options.data = requestData;
  }

  return axios({...options})
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return {
        errors: error?.response?.data?.errors,
        message: error?.response?.data?.message,
        status: error?.response?.status,
      }
    });
};
