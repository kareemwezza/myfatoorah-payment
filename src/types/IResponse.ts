export interface IResponse {
  IsSuccess: boolean;
  Message: string;
  ValidationErrors: IValidationError[] | null;
  Data: object;
}

interface IValidationError {
  Name?: string;
  Error?: string;
}
