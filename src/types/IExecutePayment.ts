import { IInvoiceItem } from './IInvoiceItem';
import { IResponse } from './IResponse';

export interface IExecutePaymentRequest {
  CustomerName?: string;
  CallBackUrl?: string;
  ErrorUrl?: string;
  DisplayCurrencyIso?: string;
  MobileCountryCode?: string;
  CustomerMobile?: string;
  CustomerEmail?: string;
  Language?: string;
  CustomerReference?: string;
  CustomerCivilId?: string;
  UserDefinedField?: string;
  CustomerAdress?: ICustomerAdress;
  ExpiryDate?: string;
  InvoiceItems?: IInvoiceItem[];
  ShippingMethod?: 1 | 2;
  ShippingConsignee?: IConsignee[];
  Suppliers?: ISuppliers[];
  RecurringModel?: IRecurringModel;
}

export interface IExecutePaymentResponse extends IResponse {
  Data: {
    InvoiceId: number;
    IsDirectPayment: boolean;
    PaymentURL: string;
    CustomerReference?: string | null;
    UserDefinedField?: string | null;
    RecurringId?: string;
  };
}

interface ICustomerAdress {
  Block?: string;
  Street?: string;
  HouseBuildingNo?: string;
  Address?: string;
  AddressInstructions?: string;
}

interface ISuppliers {
  SupplierCode: number;
  ProposedShare?: number;
  InvoiceShare: number;
}

interface IRecurringModel {
  RecurringType?: string;
  IntervalDays?: number;
  Iteration?: number;
  RetryCount?: number;
}

interface IConsignee {
  PersonName: string;
  Mobile: string;
  EmailAddress?: string;
  LineAddress: string;
  CityName: string;
  PostalCode?: string;
  CountryCode: string;
}
