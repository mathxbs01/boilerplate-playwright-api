import dotenv from 'dotenv';
import { IAPIDelete, IAPIGet, IAPIPost, IAPIPut, IResponseBase, IUseDeleteOptions, IUseGetOptions, IUsePostOptions, IUsePutOptions } from './baseDTO';
import axios, { Axios, AxiosRequestHeaders, Method } from 'axios';
import { Logger } from '../../utils/logger/logger';
import curlirize from 'axios-curlirize';

dotenv.config();
curlirize(axios);

const logger = new Logger();
const API = process.env.baseUrlApi!;

let APIGet: IAPIGet = {
  testGet: API + 'products',
};

let APIPost: IAPIPost = {
  testPost: API + 'products',
};

let APIDelete: IAPIDelete = { testDelete: API + 'products' };

let APIPut: IAPIPut = {
  testPut: API + 'products',
};

export class HttpClient {
  public async useGet<TResponse>(options: IUseGetOptions): Promise<IResponseBase<TResponse>> {
    let url: string = options.endpoint ?? '';
    if (options.nomeRequest) url = this.buildUri(APIGet[options.nomeRequest], options.params);

    const config = {
      headers: this.buildHeaders(options.token, options.headers),
      validateStatus: (status: number) => status < 500,
    };

    try {
      const response = await axios.get<TResponse>(url, config as any);

      return response;
    } catch (error: any) {
      this.handleErrorLogger(error);

      throw this.handleError('useGet', error);
    }
  }

  public async usePost<TRequest, TResponse>(options: IUsePostOptions<TRequest>): Promise<IResponseBase<TResponse>> {
    let url: string = options.endpoint ?? '';
    if (options.nomeRequest) url = this.buildUri(APIPost[options.nomeRequest], options.params);

    const config = {
      headers: this.buildHeaders(options.token, options.headers),
      validateStatus: (status: number) => status < 500,
    };

    try {
      const response = await axios.post<TResponse>(url, options.body, config as any);

      return response;
    } catch (error: any) {
      this.handleErrorLogger(error);

      throw this.handleError('usePost', error);
    }
  }

  public async useDelete<TRequest, TResponse>(options: IUseDeleteOptions<TRequest>): Promise<IResponseBase<TResponse>> {
    let url: string = options.endpoint ?? '';
    if (options.nomeRequest) url = this.buildUri(APIDelete[options.nomeRequest], options.params);

    let config: { headers: Partial<AxiosRequestHeaders>; validateStatus: any; data?: TRequest | null } = {
      headers: this.buildHeaders(options.token, options.headers),
      validateStatus: (status: number) => status < 500,
    };

    if (options.body) config = { ...config, data: options.body };

    try {
      const response = await axios.delete<TResponse>(url, config as any);

      return response;
    } catch (error: any) {
      this.handleErrorLogger(error);

      throw this.handleError('useDelete', error);
    }
  }

  public async usePut<TRequest, TResponse>(options: IUsePutOptions<TRequest>): Promise<IResponseBase<TResponse>> {
    let url: string = options.endpoint ?? '';
    if (options.nomeRequest) url = this.buildUri(APIPut[options.nomeRequest], options.params);

    const config = {
      headers: this.buildHeaders(options.token, options.headers),
      validateStatus: (status: number) => status < 500,
    };

    try {
      const response = await axios.put<TResponse>(url, options.body, config as any);

      return response;
    } catch (error: any) {
      this.handleErrorLogger(error);

      throw this.handleError('usePut', error);
    }
  }

  private buildHeaders(token: string | null = null, extraHeaders?: Partial<AxiosRequestHeaders>): Partial<AxiosRequestHeaders> {
    let header = {
      Accept: 'application/json',
      ...extraHeaders,
    };

    if (token) header = { ...header, Authorization: `Bearer ${token}` };

    return header;
  }

  private buildUri(url: string, params?: Record<string, any> | null): string {
    return params ? `${url}?${new URLSearchParams(params).toString()}` : url;
  }

  private handleError(method: string, error: any): Error {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    const returnError = `[${method}] Erro ${status || ''}: ${message}`;

    return new Error(returnError);
  }

  private handleErrorLogger(error: any) {
    const curlCommand = error?.config?.curlCommand;
    const status = error?.response?.status;
    const data = error?.response?.data;

    logger.error('Erro na requisição', `\n cURL: ${curlCommand}`, `\n Status: ${status}`, `\n Resposta de erro: ${JSON.stringify(data, null, 2)}`);
  }
}
