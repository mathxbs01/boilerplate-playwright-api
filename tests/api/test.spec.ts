import dotenv from 'dotenv';
import { expect, test } from '@playwright/test';
import { HttpStatusCode } from 'axios';
import { TestCore } from '../../src/core/testCore/test.core';
import { ICoreDTO } from '../../src/core/coreDTO';
import { IDeleteTest, IGetTest, IPostTest, IPutTest, IResponseTest } from '../../src/api/controller/testApi/testDTO';
import { IResponseBase } from '../../src/api/base/baseDTO';

dotenv.config();

const testCore = new TestCore();
const token = process.env.token ?? '';

test.describe('Fluxo de testes baseado em TestCore', () => {
  test('Deve criar um recurso de teste via POST', async () => {
    const bodyTestCore: ICoreDTO<IPostTest> = {
      data: { id: 1, title: 'Test Product', price: 19.99, description: 'A test product', category: 'test', image: 'https://example.com/image.jpg' },
      token,
      status: HttpStatusCode.Created,
    };

    const response = (await testCore.postTestCore(bodyTestCore)) as IResponseBase<IResponseTest>;

    expect(response.data).toBeDefined();
    expect(response.data?.id).toBeTruthy();
    expect(response.data?.category).toBeTruthy();
    expect(response.data?.description).toBeTruthy();
    expect(response.data?.image).toBeTruthy();
    expect(response.data?.price).toBeTruthy();
    expect(response.data?.title).toBeTruthy();
  });

  test('Deve consultar o recurso de teste via GET', async () => {
    const bodyTestCore: ICoreDTO<IGetTest> = {
      data: { id: 1 },
      token,
      status: HttpStatusCode.Ok,
    };

    const response = (await testCore.getTestCore(bodyTestCore)) as IResponseBase<IResponseTest>;

    expect(response.data).toBeDefined();
    expect(response.data?.id).toBeTruthy();
    expect(response.data?.category).toBeTruthy();
    expect(response.data?.description).toBeTruthy();
    expect(response.data?.image).toBeTruthy();
    expect(response.data?.price).toBeTruthy();
    expect(response.data?.title).toBeTruthy();
  });

  test('Deve atualizar o recurso de teste via PUT', async () => {
    const bodyTestCore: ICoreDTO<IPutTest> = {
      data: { id: 1, title: 'Test Product', price: 19.99, description: 'A test product', category: 'test', image: 'https://example.com/image.jpg' },
      token,
      status: HttpStatusCode.Ok,
    };

    const response = (await testCore.putTestCore(bodyTestCore)) as IResponseBase<IResponseTest>;

    expect(response.data).toBeDefined();
    expect(response.data?.id).toBeTruthy();
    expect(response.data?.category).toBeTruthy();
    expect(response.data?.description).toBeTruthy();
    expect(response.data?.image).toBeTruthy();
    expect(response.data?.price).toBeTruthy();
    expect(response.data?.title).toBeTruthy();
  });

  test('Deve remover o recurso de teste via DELETE', async () => {
    const bodyTestCore: ICoreDTO<IDeleteTest> = {
      data: { id: 1 },
      token,
      status: HttpStatusCode.Ok,
    };

    const response = (await testCore.deleteTestCore(bodyTestCore)) as IResponseBase<IResponseTest>;

    expect(response.data).toBeDefined();
    expect(response.data?.id).toBeTruthy();
    expect(response.data?.category).toBeTruthy();
    expect(response.data?.description).toBeTruthy();
    expect(response.data?.image).toBeTruthy();
    expect(response.data?.price).toBeTruthy();
    expect(response.data?.title).toBeTruthy();
  });
});
