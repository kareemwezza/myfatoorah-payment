# My Fatoorah Toolkit
A javascript library that provides all the functionality needed to make payment process with
my fatoorah gateway payment service easier.

## Installation
in your terminal run `npm i myfatoorah-toolkit` command or `yarn add myfatoorah-toolkit`.

## Usage
> Import library to your project directory.
```
// CommonJS version
const Myfatoorah = require('myfatoorah-toolkit');

// ES6 version
import MyFatoorah from 'myfatoorah-toolkit'
```

> Create A new Instance of `MyFatoorah`.

you need to provide a **countryIsoCode** for your country according to my fatoorah account and 
**testMode** if `true` will work with testing api on myFatoorah.

you will need to provide your **apiKey** if testMode isn't activated to work with your live API and
the apiUrl will be selected automatically according to your country iso code.

```
const payment = new MyFatoorah(countryIso, testMode, apiKey?)

// example
const payment = new MyFatoorah('EGY', true);

// example
const payment = new MyFatoorah('EGY', false, process.env.PAYMENT_TOKEN);

```

## Response Model
This showing what the model of the response should be returned from all the methods used below.

```
  {
  IsSuccess: boolean,
  Message: string,
  ValidationErrors: [{ Name: string, Error: string }] || null,
  Data: {},
  }
```

## Methods

> **Initiate Payment**

Return a list of Payment Methods that you need to Execute A Payment, [More Details](https://myfatoorah.readme.io/docs/initiate-payment).
```
payment.initiatePayment(amount, currencyISOCode)

// example:
payment.initiatePayment(100).then((data) => data).catch(err => err);

// example for a different currency:
payment.initiatePayment(100, 'SAR').then((data) => data).catch(err => err);
```

> **Send Payment**

generate an invoice link that can be sent by any channel my fatoorah supports, [More Details](https://myfatoorah.readme.io/docs/send-payment). 

```
payment.sendPayment(invoiceValue, customerName, notificationOption, _data?);

// available notification options:
// 'EML' | 'SMS' | 'LNK' | 'ALL'

// example:
payment.sendPayment(500, 'Kareem', 'EML').then((data) => data).catch(err => err);
```

> **Execute Payment**

create a MyFatoorah invoice against a certain gateway return Invoice details, [More Details](https://myfatoorah.readme.io/docs/execute-payment)

```
payment.executePayment(invoiceValue, paymentMethodId, _data?)

// example:
payment.executePayment(1000, 11).then((data) => data).catch(err => err);

// example with customer data:
payment.executePayment(1000, 11, {
   CustomerName: "fname lname",
   DisplayCurrencyIso: "KWD",
   MobileCountryCode: "965",
   CustomerMobile: "12345678",
   CustomerEmail: "mail@company.com",
}).then((data) => data).catch(err => err);
```

> **Get the Status of payments**

return the status of the payment id or invoice id, [More Details](https://myfatoorah.readme.io/docs/get-payment-status)

```
payment.getPaymentStatus(key, keyType)

// available keyTypes for payment inquiry
// 'InvoiceId' | 'PaymentId' | 'CustomerReference'

// example:
payment.getPaymentStatus('613842', 'InvoiceId').then((data) => data).catch(err => err);
```

> **Make a Refund request**

Need to cancel the payment and return the funds to the customer.
The funds will be returned to the credit or debit card that was originally charged.[More details](https://myfatoorah.readme.io/docs/refund)

```
payment.makeRefund(refundRequestObject);

// available keyTypes for Refund request
// 'InvoiceId' | 'PaymentId'

// example:
payment.makeRefund({
  KeyType: "invoiceid",
  Key: "94272",
  RefundChargeOnCustomer: false,
  ServiceChargeOnCustomer: false,
  Amount: 210,
  Comment: "Test Api",
  AmountDeductedFromSupplier: 0
}).then((data) => data).catch(err => err);
```

> **Get status of a refund Request**

It is used to get the status of the refund to check if it is refunded, rejected, or still pending. [More Details](https://myfatoorah.readme.io/docs/getrefundstatus)

```
payment.getRefundStatus(key, keyType);

// available keyTypes for Refund status
// 'InvoiceId' | 'RefundReference' | 'RefundId';

payment.getRefundStatus('1647850', 'InvoiceId')
.then((data) => data).catch(err => err);
```

> **Webhooks Signature Validation**

validate the signature of all requests sent from my fatoorah to your webhook endpoint.
you can get your `myFatoorahSecret` from account settings in webhooks section if enabled.

```
// commonJS
const { validateSignature } = require('myfatoorah-toolkit');

// ES6
import { validateSignature } from 'myfatoorah-toolkit';

const MYFATOORAH_SIGNATURE = req.get("MyFatoorah-Signature");

validateSignature(body: requestBody, MYFATOORAH_SIGNATURE, myFatoorahSecret)
.then((result) => {
    // go with your own logic here
}).catch((err) => // bad signature);

```

Best of Luck 😋😎