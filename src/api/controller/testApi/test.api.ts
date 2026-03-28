import dotenv from 'dotenv';

import { HttpClient } from '../../base/base.api';
import { IResponseBase, IResponseBaseFailed } from '../../base/baseDTO';
import { IPostTest, IPutTest, IResponseTest } from './testDTO';

dotenv.config();

const baseApi = new HttpClient();
const API = process.env.baseUrlApi!;

export class TestApi {
  private readonly headerDefault: Record<string, string | boolean> = {
    'Content-Type': 'application/json',
  };

  public async postTestApi(data: IPostTest, token: string): Promise<IResponseBase<IResponseTest | IResponseBaseFailed>> {
    try {
      const response: IResponseBase<IResponseTest | IResponseBaseFailed> = await baseApi.usePost({
        token: token,
        body: data,
        headers: this.headerDefault,
        nomeRequest: 'testPost',
      });

      return response;
    } catch (error) {
      throw new Error(`Erro ao postar teste: ${error}`);
    }
  }

  public async getTestApi(id: number, token: string): Promise<IResponseBase<IResponseTest | IResponseBaseFailed>> {
    try {
      const response: IResponseBase<IResponseTest | IResponseBaseFailed> = await baseApi.useGet({
        token: token,
        headers: this.headerDefault,
        endpoint: `${API}products/${id}`,
      });

      return response;
    } catch (error) {
      throw new Error(`Erro ao obter teste: ${error}`);
    }
  }

  public async putTestApi(data: IPutTest, token: string): Promise<IResponseBase<IResponseTest | IResponseBaseFailed>> {
    try {
      const response: IResponseBase<IResponseTest | IResponseBaseFailed> = await baseApi.usePut({
        token: token,
        body: data,
        headers: this.headerDefault,
        endpoint: `${API}products/${data.id}`,
      });

      return response;
    } catch (error) {
      throw new Error(`Erro ao obter teste: ${error}`);
    }
  }

  public async deleteTestApi(id: number, token: string): Promise<IResponseBase<IResponseTest | IResponseBaseFailed>> {
    try {
      const response: IResponseBase<IResponseTest | IResponseBaseFailed> = await baseApi.useDelete({
        token: token,
        headers: this.headerDefault,
        endpoint: `${API}products/${id}`,
      });

      return response;
    } catch (error) {
      throw new Error(`Erro ao obter teste: ${error}`);
    }
  }
}
