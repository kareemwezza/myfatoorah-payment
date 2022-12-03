import { IResponse } from './IResponse';
import { TCurrencyCodes } from './currencyCodes';

export interface IInitiatePayment {
  PaymentMethodId: number;
  PaymentMethodAr: string;
  PaymentMethodEn: string;
  IsDirectPayment: boolean;
  ServiceCharge: number;
  TotalAmount: number;
  CurrencyIso: TCurrencyCodes;
  ImageUrl: string;
}

export interface IInitiatePaymentResponse extends IResponse {
  Data: {
    PaymentMethods: IInitiatePayment[];
  };
}
