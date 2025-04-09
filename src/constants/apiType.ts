export type IInfiniteDataResponse<T> = {
  limit: number;
  page: number;
  pageCount: number;
  total: number;
} & T;
// export interface IResponse<T> {
//   success: boolean;
//   status: number;
//   message: string;
//   data: T;
// }
export type IResponse<T> = T;

export type IResponseList<TData, TField extends string> = {
  [key in TField]: TData[];
} & {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
};

export interface IErrorData {
  statusCode: number;
  message: string;
  error: string;
}

export interface IParams {
  limit?: number;
  page?: number;
  search?: string;
}
