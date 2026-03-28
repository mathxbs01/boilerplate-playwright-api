import { HttpStatusCode } from 'axios';

export interface ICoreDTO<T> {
  data?: T;
  token?: string;
  status: HttpStatusCode;
  message?: string;
}
