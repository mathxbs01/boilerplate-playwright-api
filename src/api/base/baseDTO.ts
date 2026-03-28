import { AxiosRequestHeaders, AxiosResponse } from 'axios';

export interface IAPIPost {
  testPost: string;
}

export interface IAPIGet {
  testGet: string;
}

export interface IAPIPut {
  testPut: string;
}

export interface IAPIDelete {
  testDelete: string;
}

export interface IResponseBase<T> extends AxiosResponse<T> {}

export interface IResponseBaseFailed {
  Fields: {
    PropertyName: string;
    ErrorMessage: string;
  }[];
  Code: string;
  Message: string;
}

export interface IUseGetOptions {
  nomeRequest?: keyof IAPIGet | null;
  endpoint?: string | null;
  token?: string | null;
  params?: Record<string, any> | null;
  headers?: Partial<AxiosRequestHeaders>;
}

export interface IUsePostOptions<TRequest> {
  nomeRequest?: keyof IAPIPost | null;
  endpoint?: string | null;
  token?: string | null;
  body?: TRequest;
  params?: Record<string, any> | null;
  headers?: Partial<AxiosRequestHeaders>;
}

export interface IUseDeleteOptions<TRequest> {
  nomeRequest?: keyof IAPIDelete | null;
  endpoint?: string | null;
  token?: string | null;
  body?: TRequest | null;
  params?: Record<string, any> | null;
  headers?: Partial<AxiosRequestHeaders>;
}

export interface IUsePutOptions<TRequest> {
  nomeRequest?: keyof IAPIPut | null;
  endpoint?: string | null;
  token?: string;
  body?: TRequest;
  params?: Record<string, any> | null;
  headers?: Partial<AxiosRequestHeaders>;
}
