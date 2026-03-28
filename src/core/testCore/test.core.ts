import { expect } from '@playwright/test';
import { HttpStatusCode } from 'axios';
import { TestApi } from '../../api/controller/testApi/test.api';
import { IDeleteTest, IGetTest, IPostTest, IPutTest } from '../../api/controller/testApi/testDTO';
import { ICoreDTO } from '../coreDTO';

const testApi = new TestApi();

export class TestCore {
  public async postTestCore(data: ICoreDTO<IPostTest>) {
    const body: IPostTest = {
      category: data.data!.category,
      description: data.data!.description,
      id: data.data!.id,
      image: data.data!.image,
      price: data.data!.price,
      title: data.data!.title,
    };

    const postTestApi = await testApi.postTestApi(body, data.token!);

    expect(postTestApi.status).toBe(data.status);

    return postTestApi;
  }

  public async getTestCore(data: ICoreDTO<IGetTest>) {
    const getTestApi = await testApi.getTestApi(data.data!.id, data.token!);

    expect(getTestApi.status).toBe(data.status);

    return getTestApi;
  }

  public async putTestCore(data: ICoreDTO<IPutTest>) {
    const body: IPutTest = {
      category: data.data!.category,
      description: data.data!.description,
      id: data.data!.id,
      image: data.data!.image,
      price: data.data!.price,
      title: data.data!.title,
    };

    const putTestApi = await testApi.putTestApi(body, data.token!);

    expect(putTestApi.status).toBe(data.status);

    return putTestApi;
  }

  public async deleteTestCore(data: ICoreDTO<IDeleteTest>) {
    const deleteTestApi = await testApi.deleteTestApi(data.data!.id, data.token!);

    expect(deleteTestApi.status).toBe(data.status);

    return deleteTestApi;
  }
}
