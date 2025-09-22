# 顧客 API (Customer API)

> [!info] 概要 決済サービスを利用する顧客を作成、照会、管理するAPIです。顧客情報、連絡先、メモなどを管理して、パーソナライズされた決済体験を提供できます。

## 👤 顧客作成

新しい顧客を作成します。

### リクエスト

```http
POST /customer/create/{name}
Authorization: <YOUR_API_KEY>
```

> [!note] パスパラメータ

| パラメータ | 型     | 必須 | 説明     |
| ---------- | ------ | ---- | -------- |
| `name`     | string | ✅   | 顧客名   |

### レスポンス

```json
{
  "id": "customer-cuid-123",
  "partnerId": "partner-uuid-456",
  "name": "田中太郎",
  "icon": "/images/customer.svg",
  "country": null,
  "idCode": "1/0/0",
  "isActive": true,
  "isHidden": false,
  "createdAt": "2025-09-05T10:30:00.000Z",
  "updatedAt": "2025-09-05T10:30:00.000Z"
}
```

> [!tip] レスポンスフィールド説明

| フィールド  | 型      | 説明                     |
| ----------- | ------- | ------------------------ |
| `id`        | string  | 顧客固有ID (CUID)        |
| `partnerId` | string  | パートナーID             |
| `name`      | string  | 顧客名                   |
| `icon`      | string  | 顧客アイコンURL          |
| `country`   | string  | 国コード                 |
| `idCode`    | string  | 階層構造識別子           |
| `isActive`  | boolean | アクティブ状態           |
| `isHidden`  | boolean | 非表示状態               |

---

## 📋 顧客リスト照会

パートナーの顧客リストを照会します。

### リクエスト

```http
GET /customer?searchType=name&search=田中&sortKey=createdAt&sortType=desc&page=1&size=10
Authorization: <YOUR_API_KEY>
```

> [!note] クエリパラメータ

| パラメータ   | 型     | 必須 | 説明                                           |
| ------------ | ------ | ---- | ---------------------------------------------- |
| `searchType` | string | ❌   | 検索タイプ (`name`, `email`, `phone`, `id`, ``) |
| `search`     | string | ❌   | 検索語                                         |
| `sortKey`    | string | ❌   | ソート基準 (`name`, `createdAt`, `updatedAt`, ``) |
| `sortType`   | string | ❌   | ソート方向 (`asc`, `desc`, ``)                 |
| `page`       | number | ❌   | ページ番号 (デフォルト: 1)                     |
| `size`       | number | ❌   | ページサイズ (デフォルト: 10)                  |

### レスポンス

```json
{
  "total": 25,
  "list": [
    {
      "id": "customer-cuid-123",
      "name": "田中太郎",
      "icon": "/images/customer.svg",
      "country": "JP",
      "createdAt": "2025-09-05T10:30:00.000Z",
      "CustomerContact": [
        {
          "id": 1,
          "type": "EMAIL",
          "value": "tanaka@example.com",
          "desc": "メインメール",
          "isActive": true
        },
        {
          "id": 2,
          "type": "PHONE",
          "value": "090-1234-5678",
          "desc": "携帯電話",
          "isActive": true
        }
      ]
    }
  ]
}
```

---

## 🔍 顧客詳細照会

特定顧客の詳細情報を照会します。

### リクエスト

```http
GET /customer/detail?targetId=customer-cuid-123
Authorization: <YOUR_API_KEY>
```

> [!note] クエリパラメータ

| パラメータ | 型     | 必須 | 説明     |
| ---------- | ------ | ---- | -------- |
| `targetId` | string | ✅   | 顧客ID   |

### レスポンス

```json
{
  "id": "customer-cuid-123",
  "partnerId": "partner-uuid-456",
  "name": "田中太郎",
  "icon": "/images/customer.svg",
  "country": "JP",
  "idCode": "1/0/0",
  "isActive": true,
  "isHidden": false,
  "createdAt": "2025-09-05T10:30:00.000Z",
  "updatedAt": "2025-09-05T10:30:00.000Z",
  "CustomerMemo": [
    {
      "id": 1,
      "memo": "VIP顧客",
      "createdAt": "2025-09-05T10:35:00.000Z",
      "isDeleted": false
    }
  ],
  "CustomerContact": [
    {
      "id": 1,
      "type": "EMAIL",
      "value": "tanaka@example.com",
      "desc": "メインメール",
      "isActive": true,
      "createdAt": "2025-09-05T10:30:00.000Z"
    }
  ],
  "partner": {
    "name": "パートナー会社",
    "icon": "/images/partner.svg"
  }
}
```

---

## ✏️ 顧客情報修正

### 顧客名修正

```http
POST /customer/name
Authorization: <YOUR_API_KEY>
Content-Type: application/json
```

```json
{
  "targetId": "customer-cuid-123",
  "name": "田中太郎"
}
```

### 顧客アイコンアップロード

```http
POST /customer/icon
Authorization: <YOUR_API_KEY>
Content-Type: multipart/form-data
```

**Form Data:**

- `targetId`: customer-cuid-123
- `file`: 画像ファイル (最大5MB)

### レスポンス

```json
{
  "id": "customer-cuid-123",
  "icon": "https://cdn.example.com/web/upload/icons/1725539400_abc123"
}
```

---

## 📝 顧客メモ管理

### メモ追加

```http
POST /customer/memo
Authorization: <YOUR_API_KEY>
Content-Type: application/json
```

```json
{
  "targetId": "customer-cuid-123",
  "memo": "VIP顧客 - 特別管理が必要"
}
```

### メモ修正

```http
POST /customer/memo/edit
Authorization: <YOUR_API_KEY>
Content-Type: application/json
```

```json
{
  "targetId": "customer-cuid-123",
  "memoId": 1,
  "memo": "VIP顧客 - プレミアムサービス提供"
}
```

### メモ削除

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

## 📞 顧客連絡先管理

### 連絡先追加

```http
POST /customer/contact
Authorization: <YOUR_API_KEY>
Content-Type: application/json
```

```json
{
  "targetId": "customer-cuid-123",
  "type": "EMAIL",
  "value": "tanaka@example.com",
  "desc": "メインメールアドレス"
}
```

> [!note] 連絡先タイプ

| タイプ  | 説明           |
| ------- | -------------- |
| `EMAIL` | メールアドレス |
| `PHONE` | 電話番号       |

### 連絡先修正

```http
POST /customer/contact/edit
Authorization: <YOUR_API_KEY>
Content-Type: application/json
```

```json
{
  "targetId": "customer-cuid-123",
  "contactId": 1,
  "value": "newemail@example.com",
  "desc": "新しいメールアドレス"
}
```

### 連絡先削除

```http
POST /customer/contact/delete
Authorization: <YOUR_API_KEY>
Content-Type: application/json
```

```json
{
  "targetId": "customer-cuid-123",
  "contactId": 1
}
```

---

## 🔍 検索とフィルタリング

### 検索タイプ別クエリ例

**名前で検索:**

```http
GET /customer?searchType=name&search=田中太郎
```

**メールで検索:**

```http
GET /customer?searchType=email&search=tanaka@example.com
```

**電話番号で検索:**

```http
GET /customer?searchType=phone&search=090-1234-5678
```

**作成日時ソート:**

```http
GET /customer?sortKey=createdAt&sortType=desc
```

---

## ⚠️ エラーレスポンス

### 認証失敗

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "timestamp": "2025-09-05T10:30:00.000Z",
  "path": "/customer"
}
```

### 権限なし

```json
{
  "statusCode": 403,
  "message": "No permission",
  "timestamp": "2025-09-05T10:30:00.000Z",
  "path": "/customer/detail"
}
```

### 顧客なし

```json
{
  "statusCode": 404,
  "message": "Customer not found",
  "timestamp": "2025-09-05T10:30:00.000Z",
  "path": "/customer/detail"
}
```

### ファイルサイズ超過

```json
{
  "statusCode": 413,
  "message": "File too large",
  "timestamp": "2025-09-05T10:30:00.000Z",
  "path": "/customer/icon"
}
```

---

## 💻 使用例

### Node.js (axios)

```javascript
import axios from "axios";

const API_KEY = "your-api-key-here";
const BASE_URL = "https://api.crypted-pay.com";

// 顧客作成
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

    console.log("顧客作成完了:", response.data);
    return response.data;
  } catch (error) {
    console.error("顧客作成失敗:", error.response?.data || error.message);
  }
}

// 顧客リスト照会
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

    console.log(`合計${response.data.total}名の顧客`);
    return response.data;
  } catch (error) {
    console.error(
      "顧客リスト照会失敗:",
      error.response?.data || error.message
    );
  }
}

// 顧客詳細照会
async function getCustomerDetail(customerId) {
  try {
    const response = await axios.get(`${BASE_URL}/customer/detail`, {
      headers: {
        Authorization: API_KEY,
      },
      params: {
        targetId: customerId,
      },
    });

    console.log("顧客詳細情報:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "顧客詳細照会失敗:",
      error.response?.data || error.message
    );
  }
}

// 顧客メモ追加
async function addCustomerMemo(customerId, memo) {
  try {
    const response = await axios.post(
      `${BASE_URL}/customer/memo`,
      {
        targetId: customerId,
        memo: memo,
      },
      {
        headers: {
          Authorization: API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("メモ追加完了:", response.data);
    return response.data;
  } catch (error) {
    console.error("メモ追加失敗:", error.response?.data || error.message);
  }
}

// 顧客連絡先追加
async function addCustomerContact(customerId, type, value, desc) {
  try {
    const response = await axios.post(
      `${BASE_URL}/customer/contact`,
      {
        targetId: customerId,
        type: type, // 'EMAIL' or 'PHONE'
        value: value,
        desc: desc,
      },
      {
        headers: {
          Authorization: API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("連絡先追加完了:", response.data);
    return response.data;
  } catch (error) {
    console.error("連絡先追加失敗:", error.response?.data || error.message);
  }
}

// 顧客アイコンアップロード
async function uploadCustomerIcon(customerId, file) {
  try {
    const formData = new FormData();
    formData.append("targetId", customerId);
    formData.append("file", file);

    const response = await axios.post(`${BASE_URL}/customer/icon`, formData, {
      headers: {
        Authorization: API_KEY,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("アイコンアップロード完了:", response.data);
    return response.data;
  } catch (error) {
    console.error("アイコンアップロード失敗:", error.response?.data || error.message);
  }
}
```

### Python (requests)

```python
import requests

API_KEY = 'your-api-key-here'
BASE_URL = 'https://api.crypted-pay.com'

headers = {
    'Authorization': API_KEY,
    'Content-Type': 'application/json'
}

# 顧客作成
def create_customer(name):
    try:
        response = requests.post(f'{BASE_URL}/customer/create/{name}',
                               headers={'Authorization': API_KEY})
        response.raise_for_status()

        data = response.json()
        print(f"顧客作成完了: {data['name']} (ID: {data['id']})")
        return data
    except requests.exceptions.RequestException as e:
        print(f"顧客作成失敗: {e}")

# 顧客リスト照会
def get_customer_list(search_type='', search='', page=1, size=10):
    params = {
        'searchType': search_type,
        'search': search,
        'sortKey': 'createdAt',
        'sortType': 'desc',
        'page': page,
        'size': size
    }

    try:
        response = requests.get(f'{BASE_URL}/customer',
                              headers={'Authorization': API_KEY},
                              params=params)
        response.raise_for_status()

        data = response.json()
        print(f"合計{data['total']}名の顧客")
        return data
    except requests.exceptions.RequestException as e:
        print(f"顧客リスト照会失敗: {e}")

# 顧客メモ追加
def add_customer_memo(customer_id, memo):
    payload = {
        'targetId': customer_id,
        'memo': memo
    }

    try:
        response = requests.post(f'{BASE_URL}/customer/memo',
                               json=payload, headers=headers)
        response.raise_for_status()

        data = response.json()
        print(f"メモ追加完了: {memo}")
        return data
    except requests.exceptions.RequestException as e:
        print(f"メモ追加失敗: {e}")

# 顧客連絡先追加
def add_customer_contact(customer_id, contact_type, value, desc):
    payload = {
        'targetId': customer_id,
        'type': contact_type,  # 'EMAIL' or 'PHONE'
        'value': value,
        'desc': desc
    }

    try:
        response = requests.post(f'{BASE_URL}/customer/contact',
                               json=payload, headers=headers)
        response.raise_for_status()

        data = response.json()
        print(f"連絡先追加完了: {value}")
        return data
    except requests.exceptions.RequestException as e:
        print(f"連絡先追加失敗: {e}")
```

---

## ⚡ 注意事項

> [!warning] 重要事項
>
> 1. **認証必須**: すべてのAPI呼び出し時に`Authorization`ヘッダーに有効なAPIキーが必要です。
> 2. **権限確認**: パートナーは自分が作成した顧客のみ照会・修正できます。
> 3. **ファイルサイズ制限**: アイコンアップロード時は最大5MBまでアップロード可能です。

> [!tip] ヒント
>
> - 顧客名はパートナー内で一意である必要があります。
> - 検索時、メールと電話番号は連絡先テーブルから検索されます。
> - メモと連絡先は無制限に追加できます。
> - `idCode`は階層構造を表し、自動的に生成されます。

---

## 🔗 関連ドキュメント

- [価格照会 API](./price) - 価格照会 API
- [インボイス API](./invoice) - インボイス API
- [取引照会 API](./transaction) - 取引照会 API

#api #customer #management #documentation