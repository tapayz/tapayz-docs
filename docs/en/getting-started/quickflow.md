# Quick Flow

This document provides a minimal procedure guide for developers new to the API to quickly experience the end-to-end flow.

---

## 1. API Key Setup

You must include the API key in the `Authorization` header for all API calls.

```http
Authorization: <YOUR_API_KEY>
```

---

## 2. Coin Price Inquiry

You can check the real-time prices of currently supported cryptocurrencies (with/without fees applied).

**Request**

```http
GET /asset/price
Authorization: <YOUR_API_KEY>
```

**Response**

```json
{
  "exchangeFeeRate": "0.0050",
  "krw": "1320.000000",
  "krwWithFee": "1326.600000",
  "origin": {
    "tether": "1350.500000",
    "eth": "2650000.000000",
    "trx": "150.000000"
  },
  "fee": {
    "tether": "1350.500000",
    "eth": "2650000.000000",
    "trx": "150.000000"
  }
}
```

---

## 3. Customer Creation

To use the service, you must first create a customer.

**Request**

```http
POST /customer/create
Authorization: <YOUR_API_KEY>
Content-Type: application/json

{
  "name": "홍길동",
  "country": "KR"
}
```

**Response**

```json
{
  "id": 123,
  "partnerId": "partner-uuid-123",
  "name": "홍길동",
  "icon": "/icons/customer.svg",
  "country": "KR",
  "idCode": "1/0/123",
  "isActive": true,
  "isHidden": false,
  "createdAt": "2025-08-27T10:30:00.000Z",
  "updatedAt": "2025-08-27T10:30:00.000Z"
}
```

---

## 4. Invoice Issuance

Issue a payment invoice to a registered customer.

**Request**

```http
POST /invoice/issue
Authorization: <YOUR_API_KEY>
Content-Type: application/json

{
  "customerId": 123,
  "customerName": "김민수",
  "title": "USDT 10만원 구매",
  "priceAtRequest": 1350.5,
  "fiatAssetId": 1,
  "cryptoAssetId": 1001,
  "cashAmount": 100000,
  "expiredSecond": 300
}
```

**Response**

```json
{
  "invoice": {
    "id": "invoice-uuid-456",
    "partnerId": "partner-uuid-123",
    "amount": "100000.000000",
    "state": "Complete",
    "createdAt": "2025-08-27T09:00:00.000Z"
  },
  "url": "https://invoice.example.com/b2f1e3a4-56cd-7890-ab12-..."
}
```

👉 The customer accesses the `url` to proceed with payment.

---

## 5. Webhook Processing

When payment is completed, a Webhook event is sent to the server.
The server must receive, verify, and update the payment status accordingly.

**Webhook update-transaction Example**

```json
{
  "state": "Complete",
  "customerId": 7,
  "detail": "d1f10b55e61d16e3616d8d0ac7c42e0edcc8a5587b251239f0a14f587032cb18",
  "amount": "1.229"
}
```

**Server Example (Node.js / Express)**

```javascript
app.post("/update-transaction", (req, res) => {
  const payload = req.body;

  // 1. Signature verification
  verifySignature(payload, req.headers["x-signature"]);

  // 2. Event processing
  if (payload.state === "Completed") {
    console.log("Payment completed:", payload.amount);
    // DB update and other processing
  }

  res.sendStatus(200);
});
```

---

## Summary

1. API Key Setup
2. Price Inquiry
3. Customer Creation
4. Invoice Issuance
5. Webhook Processing

By following this procedure, you can quickly experience the actual payment flow.
Please refer to the **API Reference** for detailed endpoint descriptions.