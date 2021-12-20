export interface SuccessResponse {
  data: any;
}

export interface ErrorResponse {
  error: Error;
}

interface Error {
  code: number;
  message: string;
}
