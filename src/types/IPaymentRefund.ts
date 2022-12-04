import { IResponse } from './IResponse';

export interface IPaymentRefundRequest {
  KeyType: 'InvoiceId' | 'PaymentId';
  Key: string;
  RefundChargeOnCustomer: boolean;
  ServiceChargeOnCustomer: boolean;
  Amount: number;
  Comment: string;
  AmountDeductedFromSupplier?: number;
}

export interface IPaymentRefundResponse extends IResponse {
  Data: {
    Key: string;
    RefundId: number;
    RefundReference: string;
    Amount: string;
    Comment: string;
  };
}

export type TRefundKeyType = 'InvoiceId' | 'RefundReference' | 'RefundId';

export interface RefundStatusResult extends IResponse {
  Data: {
    RefundStatusResult: {
      RefundId: number;
      RefundStatus: 'Refunded' | 'Canceled' | 'Pending';
      InvoiceId: number;
      Amount: number;
      RefundReference: string;
      RefundAmount: number;
    }[];
  };
}
