# Price API

> **Overview**: API for querying real-time cryptocurrency and fiat currency price information. All prices are provided based on KRW, and you can check both fee-applied and fee-excluded prices.

## Real-time Price Query

Query real-time prices of all currently supported assets.

### Request

```http
GET /asset/price
Authorization: <YOUR_API_KEY>
```

### Response

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
    "tether": "1356.750000",
    "eth": "2663250.000000",
    "trx": "150.750000"
  }
}
```

> **Response Field Description**

| Field             | Type   | Description                                          |
| ----------------- | ------ | ---------------------------------------------------- |
| `exchangeFeeRate` | string | Platform fee rate (decimal notation)                 |
| `krw`             | string | KRW exchange rate                                    |
| `krwWithFee`      | string | KRW exchange rate with fees applied                  |
| `origin`          | object | Original price of each cryptocurrency (KRW)          |
| `fee`             | object | Price of each cryptocurrency with fees applied (KRW) |

**Fields inside origin/fee objects**

| Field    | Description              |
| -------- | ------------------------ |
| `tether` | USDT price (TRC20/ERC20) |
| `eth`    | Ethereum price           |
| `trx`    | Tron price               |

---

## Supported Asset List Query

Query the list of all assets supported by the platform.

### Request

```http
GET /asset
Authorization: <YOUR_API_KEY>
```

### Response

```json
[
  {
    "id": 1,
    "type": "CASH",
    "name": "Korea Won",
    "symbol": "KRW",
    "network": "LEGAL",
    "digit": 0,
    "price": "1.000000",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z",
    "isActive": true
  },
  {
    "id": 101,
    "type": "COIN",
    "name": "Tron",
    "symbol": "TRX",
    "network": "TRX",
    "digit": 6,
    "price": "220.000000",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z",
    "isActive": true
  },
  {
    "id": 1001,
    "type": "TOKEN",
    "name": "USDT-TRX",
    "symbol": "USDT",
    "network": "TRX",
    "digit": 6,
    "price": "1400.000000",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z",
    "isActive": true
  }
]
```

> **Response Field Description**

| Field      | Type    | Description                                       |
| ---------- | ------- | ------------------------------------------------- |
| `id`       | number  | Asset unique ID                                   |
| `type`     | string  | Asset type (`CASH`, `COIN`, `TOKEN`)              |
| `name`     | string  | Asset full name                                   |
| `symbol`   | string  | Asset symbol (e.g., BTC, ETH, USDT)               |
| `network`  | string  | Blockchain network (`BTC`, `ETH`, `TRX`, `LEGAL`) |
| `digit`    | number  | Decimal places                                    |
| `price`    | string  | Current price (KRW basis)                         |
| `isActive` | boolean | Active status                                     |

---

## Asset Types and Networks

### Asset Types

| Type    | Description   | Examples      |
| ------- | ------------- | ------------- |
| `CASH`  | Fiat currency | KRW, USD      |
| `COIN`  | Mainnet coins | BTC, ETH, TRX |
| `TOKEN` | Tokens        | USDT, USDC    |

### Supported Networks

| Network | Description      | Supported Assets |
| ------- | ---------------- | ---------------- |
| `LEGAL` | Fiat currency    | KRW, USD         |
| `BTC`   | Bitcoin network  | BTC              |
| `ETH`   | Ethereum network | ETH, USDT-ERC20  |
| `TRX`   | Tron network     | TRX, USDT-TRC20  |

---

## Error Responses

### Authentication Failed

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "timestamp": "2025-09-05T10:30:00.000Z",
  "path": "/asset/price"
}
```

### Insufficient Permissions

```json
{
  "statusCode": 403,
  "message": "Only Master can access",
  "timestamp": "2025-09-05T10:30:00.000Z",
  "path": "/asset"
}
```

---

## Usage Examples

### Node.js (axios)

```javascript
import axios from "axios";

const API_KEY = "your-api-key-here";
const BASE_URL = "https://api.crypted-pay.com";

// Real-time price query
async function getPrice() {
  try {
    const response = await axios.get(`${BASE_URL}/asset/price`, {
      headers: {
        Authorization: API_KEY,
      },
    });

    console.log("Current USDT price:", response.data.origin.tether);
    console.log("USDT price with fee:", response.data.fee.tether);

    return response.data;
  } catch (error) {
    console.error("Price query failed:", error.response?.data || error.message);
  }
}

// Crypto asset list query
async function getCryptoAssets() {
  try {
    const response = await axios.get(`${BASE_URL}/asset/crypto`, {
      headers: {
        Authorization: API_KEY,
      },
    });

    console.log("Supported cryptocurrencies:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Crypto asset list query failed:",
      error.response?.data || error.message
    );
  }
}
```

---

## ⚡ Important Notes

> **Critical Information**
>
> 1. **Authentication Required**: Valid API key must be included in the `Authorization` header for all API calls.
> 2. **Permission Restrictions**: Some APIs may require Master permissions.
> 3. **Price Volatility**: Cryptocurrency prices change in real-time, so there may be differences from prices at payment time.

> **Tips**
>
> - Prices in the `fee` object include platform fees.
> - Rate limiting may apply, so avoid excessive requests.

---

## 🔗 Related Documentation

- [Customer Management API](./customer) - Customer management API
- [Invoice API](./invoice) - Invoice API
- [Transaction API](./transaction) - Transaction query API
