# API Reference

You can build cryptocurrency payment systems using the Tapayz API.

## API Overview

- **Base URL**: `https://api.crypted-pay.com`
- **Authentication**: API Key (Authorization header)
- **Response Format**: JSON
- **HTTPS Required**: All APIs are accessible only through HTTPS

## Authentication

All API requests must include an API Key in the Authorization header:

```http
Authorization: YOUR_API_KEY
```

## API List

### Price API

Query real-time cryptocurrency prices and asset information.

- [Price API](./price) - Real-time prices and asset lists

### Customer Management API

Create, query, and manage customers using the payment service.

- [Customer Management API](./customer) - Customer CRUD and contact management

### Invoice API

Issue, query, and manage invoices for cryptocurrency payments.

- [Invoice API](./invoice) - Payment request issuance and management

## Response Format

### Success Response

```json
{
  "data": {
    // Response data
  }
}
```

### Error Response

```json
{
  "statusCode": 400,
  "message": "Error message",
  "timestamp": "2025-09-20T10:30:00.000Z",
  "path": "/api/endpoint"
}
```

## Status Codes

- `200` - Success
- `400` - Bad Request
- `401` - Authentication Failed
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Rate Limiting

API usage limits may apply. When excessive requests are made, a 429 status code will be returned.
