# Customer API

> **Overview**: API for creating, querying, and managing customers who use the payment service. You can manage customer information, contacts, memos, etc. to provide personalized payment experiences.

## 👤 Customer Creation

Create a new customer.

### Request

```http
POST /customer/create/{name}
Authorization: <YOUR_API_KEY>
```

> **Path Parameters**

| Parameter | Type   | Required | Description   |
| --------- | ------ | -------- | ------------- |
| `name`    | string | ✅       | Customer name |

### Response

```json
{
  "id": "customer-cuid-123",
  "partnerId": "partner-uuid-456",
  "name": "John Doe",
  "icon": "/images/customer.svg",
  "country": null,
  "idCode": "1/0/0",
  "isActive": true,
  "isHidden": false,
  "createdAt": "2025-09-05T10:30:00.000Z",
  "updatedAt": "2025-09-05T10:30:00.000Z"
}
```

> **Response Field Description**

| Field       | Type    | Description                       |
| ----------- | ------- | --------------------------------- |
| `id`        | string  | Customer unique ID (CUID)         |
| `partnerId` | string  | Partner ID                        |
| `name`      | string  | Customer name                     |
| `icon`      | string  | Customer icon URL                 |
| `country`   | string  | Country code                      |
| `idCode`    | string  | Hierarchical structure identifier |
| `isActive`  | boolean | Active status                     |
| `isHidden`  | boolean | Hidden status                     |

---

## 📋 Customer List Query

Query the customer list of a partner.

### Request

```http
GET /customer?searchType=name&search=John&sortKey=createdAt&sortType=desc&page=1&size=10
Authorization: <YOUR_API_KEY>
```

> **Query Parameters**

| Parameter    | Type   | Required | Description                                      |
| ------------ | ------ | -------- | ------------------------------------------------ |
| `searchType` | string | ❌       | Search type (`name`, `email`, `phone`, `id`)     |
| `search`     | string | ❌       | Search term                                      |
| `sortKey`    | string | ❌       | Sort criteria (`name`, `createdAt`, `updatedAt`) |
| `sortType`   | string | ❌       | Sort direction (`asc`, `desc`)                   |
| `page`       | number | ❌       | Page number (default: 1)                         |
| `size`       | number | ❌       | Page size (default: 10)                          |

### Response

```json
{
  "total": 25,
  "list": [
    {
      "id": "customer-cuid-123",
      "name": "John Doe",
      "icon": "/images/customer.svg",
      "country": "US",
      "createdAt": "2025-09-05T10:30:00.000Z",
      "CustomerContact": [
        {
          "id": 1,
          "type": "EMAIL",
          "value": "john@example.com",
          "desc": "Primary email",
          "isActive": true
        },
        {
          "id": 2,
          "type": "PHONE",
          "value": "010-1234-5678",
          "desc": "Mobile phone",
          "isActive": true
        }
      ]
    }
  ]
}
```

---

## 🔍 Customer Detail Query

Query detailed information of a specific customer.

### Request

```http
GET /customer/detail?targetId=customer-cuid-123
Authorization: <YOUR_API_KEY>
```

> **Query Parameters**

| Parameter  | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| `targetId` | string | ✅       | Customer ID |

### Response

```json
{
  "id": "customer-cuid-123",
  "partnerId": "partner-uuid-456",
  "name": "John Doe",
  "icon": "/images/customer.svg",
  "country": "US",
  "idCode": "1/0/0",
  "isActive": true,
  "isHidden": false,
  "createdAt": "2025-09-05T10:30:00.000Z",
  "updatedAt": "2025-09-05T10:30:00.000Z",
  "CustomerMemo": [
    {
      "id": 1,
      "memo": "VIP customer",
      "createdAt": "2025-09-05T10:35:00.000Z",
      "isDeleted": false
    }
  ],
  "CustomerContact": [
    {
      "id": 1,
      "type": "EMAIL",
      "value": "john@example.com",
      "desc": "Primary email",
      "isActive": true,
      "createdAt": "2025-09-05T10:30:00.000Z"
    }
  ],
  "partner": {
    "name": "Partner Company",
    "icon": "/images/partner.svg"
  }
}
```

---

## 📝 Customer Memo Management

### Add Memo

```http
POST /customer/memo
Authorization: <YOUR_API_KEY>
Content-Type: application/json
```

```json
{
  "targetId": "customer-cuid-123",
  "memo": "VIP customer - requires special attention"
}
```

### Edit Memo

```http
POST /customer/memo/edit
Authorization: <YOUR_API_KEY>
Content-Type: application/json
```

```json
{
  "targetId": "customer-cuid-123",
  "memoId": 1,
  "memo": "VIP customer - provide premium service"
}
```

### Delete Memo

```http
POST /customer/memo/delete
Authorization: <YOUR_API_KEY>
Content-Type: application/json
```

```json
{
  "targetId": "customer-cuid-123",
  "memoId": 1
}
```

---

## 📞 Customer Contact Management

### Add Contact

```http
POST /customer/contact
Authorization: <YOUR_API_KEY>
Content-Type: application/json
```

```json
{
  "targetId": "customer-cuid-123",
  "type": "EMAIL",
  "value": "john@example.com",
  "desc": "Primary email address"
}
```

> **Contact Types**

| Type    | Description   |
| ------- | ------------- |
| `EMAIL` | Email address |
| `PHONE` | Phone number  |

---

## ⚠️ Error Responses

### Authentication Failed

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "timestamp": "2025-09-05T10:30:00.000Z",
  "path": "/customer"
}
```

### No Permission

```json
{
  "statusCode": 403,
  "message": "No permission",
  "timestamp": "2025-09-05T10:30:00.000Z",
  "path": "/customer/detail"
}
```

### Customer Not Found

```json
{
  "statusCode": 404,
  "message": "Customer not found",
  "timestamp": "2025-09-05T10:30:00.000Z",
  "path": "/customer/detail"
}
```

---

## 💻 Usage Examples

### Node.js (axios)

```javascript
import axios from "axios";

const API_KEY = "your-api-key-here";
const BASE_URL = "https://api.crypted-pay.com";

// Create customer
async function createCustomer(name) {
  try {
    const response = await axios.post(
      `${BASE_URL}/customer/create/${encodeURIComponent(name)}`,
      {},
      {
        headers: {
          Authorization: API_KEY,
        },
      }
    );

    console.log("Customer created:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Customer creation failed:",
      error.response?.data || error.message
    );
  }
}

// Get customer list
async function getCustomerList(
  searchType = "",
  search = "",
  page = 1,
  size = 10
) {
  try {
    const response = await axios.get(`${BASE_URL}/customer`, {
      headers: {
        Authorization: API_KEY,
      },
      params: {
        searchType,
        search,
        sortKey: "createdAt",
        sortType: "desc",
        page,
        size,
      },
    });

    console.log(`Total ${response.data.total} customers`);
    return response.data;
  } catch (error) {
    console.error(
      "Customer list query failed:",
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
> 2. **Permission Verification**: Partners can only query/modify customers they created.
> 3. **File Size Limit**: Maximum 5MB upload for icon upload.

> **Tips**
>
> - Customer names must be unique within a partner.
> - Email and phone searches are performed in the contact table.
> - Memos and contacts can be added unlimited.
> - `idCode` represents hierarchical structure and is automatically generated.

---

## 🔗 Related Documentation

- [Price API](./price) - Price query API
- [Invoice API](./invoice) - Invoice API
- [Transaction API](./transaction) - Transaction query API
