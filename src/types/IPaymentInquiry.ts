import { IInvoiceItem } from './IInvoiceItem';
import { IResponse } from './IResponse';

export type TKeyType = 'InvoiceId' | 'PaymentId' | 'CustomerReference';

export interface IPaymentInquiryResponse extends IResponse {
  Data: {
    InvoiceId: number;
    InvoiceStatus: 'Pending' | 'Paid' | 'Canceled';
    InvoiceReference: string;
    CustomerReference: string;
    CreatedDate: string;
    ExpiryDate: string;
    InvoiceValue: number;
    Comments: string;
    CustomerName: string;
    CustomerMobile: string;
    CustomerEmail: string;
    UserDefinedField: string;
    InvoiceDisplayValue: string;
    DueDeposit: number;
    DepositStatus: string;
    InvoiceItems: IInvoiceItem[];
    InvoiceTransactions: [];
    Suppliers: [];
  };
}
