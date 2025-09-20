# Transaction API

Query and manage cryptocurrency transaction records.

## API Overview

The Transaction API allows you to query transaction statuses and retrieve transaction details for completed payments.

- **Base URL**: `https://api.crypted-pay.com`
- **Authentication**: API Key required
- **Response Format**: JSON

## Authentication

```http
Authorization: YOUR_API_KEY
```

## Get Transaction

Retrieve transaction details by transaction ID.

### Request

```http
GET /api/v1/transactions/{transaction_id}
```

### Response

```json
{
  "data": {
    "id": "txn_1234567890",
    "invoice_id": "inv_abcdef123456",
    "status": "completed",
    "amount": "100.00",
    "currency": "USDT",
    "network": "TRC20",
    "hash": "0x1234567890abcdef...",
    "confirmations": 30,
    "created_at": "2024-01-15T10:30:00Z",
    "confirmed_at": "2024-01-15T10:35:00Z"
  }
}
```

## List Transactions

Retrieve a list of transactions with optional filters.

### Request

```http
GET /api/v1/transactions?status=completed&limit=10
```

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by transaction status (`pending`, `completed`, `failed`) |
| `invoice_id` | string | Filter by invoice ID |
| `limit` | integer | Number of records to return (default: 20, max: 100) |
| `offset` | integer | Number of records to skip (default: 0) |

### Response

```json
{
  "data": {
    "transactions": [
      {
        "id": "txn_1234567890",
        "invoice_id": "inv_abcdef123456",
        "status": "completed",
        "amount": "100.00",
        "currency": "USDT",
        "network": "TRC20",
        "hash": "0x1234567890abcdef...",
        "confirmations": 30,
        "created_at": "2024-01-15T10:30:00Z",
        "confirmed_at": "2024-01-15T10:35:00Z"
      }
    ],
    "total": 1,
    "limit": 10,
    "offset": 0
  }
}
```

## Transaction Status

| Status | Description |
|--------|-------------|
| `pending` | Transaction is being processed |
| `completed` | Transaction has been confirmed |
| `failed` | Transaction failed or was rejected |

## Error Responses

### Transaction Not Found

```json
{
  "statusCode": 404,
  "message": "Transaction not found",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/v1/transactions/txn_invalid"
}
```

## Related APIs

- [Price API](./price) - Price query API
- [Customer API](./customer) - Customer management API
- [Invoice API](./invoice) - Invoice API