export interface ResponseDto<T> {
  statusCode: number;
  data?: T;
  message?: string;
  offset?: number;
  limit?: number;
  total?: number;
}
