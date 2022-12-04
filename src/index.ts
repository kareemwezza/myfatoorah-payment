import { IResponse } from './types/IResponse';

export { validateSignature } from './helpers/validateSignature';
import { AxiosInstance } from 'axios';
import {
  createApiInstance,
  handleAxiosError,
  endpoints,
  LIVE_API_URL,
  LIVE_SA_API_URL,
  TEST_API_URL,
  TEST_TOKEN
} from './config';
import {
  ECurrencyCode,
  TCountryCodes,
  TCurrencyCodes,
  IInitiatePaymentResponse,
  IExecutePaymentRequest,
  IExecutePaymentResponse,
  TKeyType,
  IPaymentInquiryResponse,
  TNotification,
  EMobileCountryCode,
  IPaymentRefundRequest,
  IPaymentRefundResponse,
  TRefundKeyType,
  RefundStatusResult
} from './types';

export default class MyFatoorah {
  private readonly apiUrl!: string;
  private apiInstance!: AxiosInstance;

  /**
   * initialize your myfatoorah object
   * @param countryIso
   * @param testMode
   * @param apiKey
   */
  constructor(private countryIso: TCountryCodes, private testMode: boolean, private apiKey: string = TEST_TOKEN) {
    if (!testMode && apiKey === TEST_TOKEN) {
      throw new Error('You must provide your own api key when test mode is disabled.');
    }
    if (testMode) {
      this.apiUrl = TEST_API_URL;
    } else {
      if (this.countryIso === 'SAU') {
        this.apiUrl = LIVE_SA_API_URL;
      } else {
        this.apiUrl = LIVE_API_URL;
      }
    }
    this.apiInstance = createApiInstance(this.apiUrl, this.apiKey);
  }

  get getCountry(): TCountryCodes {
    return this.countryIso;
  }

  /**
   * return a list of Payment Methods that you need in Execute Payment
   * @param amount
   * @param currencyIso default currency depends on the countryIso
   */
  async initiatePayment(
    amount: number,
    currencyIso: TCurrencyCodes = ECurrencyCode[this.getCountry]
  ): Promise<IInitiatePaymentResponse> {
    try {
      const { data } = await this.apiInstance.post(endpoints.initiate, {
        InvoiceAmount: amount,
        CurrencyIso: currencyIso
      });
      return data;
    } catch (error: any) {
      return <IInitiatePaymentResponse>handleAxiosError(error);
    }
  }

  /**
   * generate an invoice link that can be sent by any channel we support
   * @param invoiceValue
   * @param customerName
   * @param notificationOption EML | SMS | LNK | ALL
   * @param _data
   */
  async sendPayment(
    invoiceValue: number,
    customerName: string,
    notificationOption: TNotification,
    _data?: IExecutePaymentRequest
  ): Promise<IExecutePaymentResponse> {
    try {
      const { data } = await this.apiInstance.post(endpoints.sendPayment, {
        NotificationOption: notificationOption,
        CustomerName: customerName,
        InvoiceValue: invoiceValue,
        DisplayCurrencyIso: ECurrencyCode[this.getCountry],
        MobileCountryCode: EMobileCountryCode[this.getCountry],
        ..._data
      });
      return data;
    } catch (error) {
      return <IExecutePaymentResponse>handleAxiosError(error);
    }
  }

  /**
   * create a MyFatoorah invoice against a certain gateway return Invoice details
   * @param invoiceValue amount to charge
   * @param paymentMethodId ID for payment gateway
   */
  async executePayment(
    invoiceValue: number,
    paymentMethodId: number,
    _data?: IExecutePaymentRequest
  ): Promise<IExecutePaymentResponse> {
    try {
      const { data } = await this.apiInstance.post(endpoints.execute, {
        InvoiceValue: invoiceValue,
        PaymentMethodId: paymentMethodId,
        DisplayCurrencyIso: ECurrencyCode[this.getCountry],
        MobileCountryCode: EMobileCountryCode[this.getCountry],
        ..._data
      });
      return data;
    } catch (error: any) {
      return <IExecutePaymentResponse>handleAxiosError(error);
    }
  }

  /**
   * return a status of your invoice
   * @param key
   * @param keyType
   */
  async getPaymentStatus(key: string, keyType: TKeyType): Promise<IPaymentInquiryResponse> {
    try {
      const { data } = await this.apiInstance.post(endpoints.paymentStatus, {
        Key: key,
        KeyType: keyType
      });
      return data;
    } catch (error) {
      return <IPaymentInquiryResponse>handleAxiosError(error);
    }
  }

  /**
   * making a refund request to MyFatoorah
   * @param refundRequest
   */
  async makeRefund(refundRequest: IPaymentRefundRequest): Promise<IPaymentRefundResponse> {
    try {
      const { data } = await this.apiInstance.post(endpoints.makeRefund, refundRequest);
      return data;
    } catch (error) {
      return <IPaymentRefundResponse>handleAxiosError(error);
    }
  }

  /**
   * get the status of the refund to check if it is refunded, rejected, or still pending.
   * @param key Value of the key type
   * @param keyType "InvoiceId" | "RefundReference" | "RefundId"
   */
  async getRefundStatus(key: string, keyType: TRefundKeyType): Promise<RefundStatusResult> {
    try {
      const { data } = await this.apiInstance.post(endpoints.refundStatus, {
        Key: key,
        KeyType: keyType
      });
      return data;
    } catch (error) {
      return <RefundStatusResult>handleAxiosError(error);
    }
  }
}
