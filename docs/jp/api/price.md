# 価格API（Price API）

> [!info] 概要：リアルタイム暗号通貨および法定通貨の相場情報を照会できるAPIです。全ての価格はKRW基準で提供され、手数料適用/未適用価格を全て確認できます。

## リアルタイム相場照会

現在サポートしている全ての資産のリアルタイム相場を照会します。

### リクエスト

```http
GET /asset/price
Authorization: <YOUR_API_KEY>
```

### レスポンス

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

> [!note] レスポンスフィールド説明

| フィールド        | タイプ | 説明                                |
| ----------------- | ------ | ----------------------------------- |
| `exchangeFeeRate` | string | プラットフォーム手数料率（小数点表記） |
| `krw`             | string | KRW基準為替レート                   |
| `krwWithFee`      | string | 手数料が適用されたKRW為替レート     |
| `origin`          | object | 各暗号通貨の原本相場（KRW）         |
| `fee`             | object | 手数料が適用された各暗号通貨相場（KRW） |

**origin/feeオブジェクト内部フィールド**

| フィールド | 説明                    |
| ---------- | ----------------------- |
| `tether`   | USDT価格（TRC20/ERC20） |
| `eth`      | Ethereum価格            |
| `trx`      | Tron価格                |

---

## サポート資産一覧照会

プラットフォームでサポートしている全ての資産一覧を照会します。

### リクエスト

```http
GET /asset
Authorization: <YOUR_API_KEY>
```

### レスポンス

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

> [!note] レスポンスフィールド説明

| フィールド | タイプ  | 説明                                          |
| ---------- | ------- | --------------------------------------------- |
| `id`       | number  | 資産固有ID                                    |
| `type`     | string  | 資産タイプ（`CASH`, `COIN`, `TOKEN`）         |
| `name`     | string  | 資産全体名                                    |
| `symbol`   | string  | 資産シンボル（例：BTC, ETH, USDT）           |
| `network`  | string  | ブロックチェーンネットワーク（`BTC`, `ETH`, `TRX`, `LEGAL`） |
| `digit`    | number  | 小数点桁数                                    |
| `price`    | string  | 現在価格（KRW基準）                           |
| `isActive` | boolean | アクティブ状態                                |

---

## 暗号通貨一覧照会

暗号通貨（コイン/トークン）のみフィルタリングして照会します。

### リクエスト

```http
GET /asset/crypto
Authorization: <YOUR_API_KEY>
```

### レスポンス

```json
[
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
    "id": 102,
    "type": "COIN",
    "name": "Ethereum",
    "symbol": "ETH",
    "network": "ETH",
    "digit": 18,
    "price": "3269000.000000",
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

---

## 法定通貨一覧照会

法定通貨のみフィルタリングして照会します。

### リクエスト

```http
GET /asset/cash
Authorization: <YOUR_API_KEY>
```

### レスポンス

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
    "id": 2,
    "type": "CASH",
    "name": "USD Dollar",
    "symbol": "USD",
    "network": "LEGAL",
    "digit": 6,
    "price": "1400.000000",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z",
    "isActive": true
  }
]
```

---

## 資産タイプとネットワーク

### 資産タイプ

| タイプ  | 説明          | 例              |
| ------- | ------------- | --------------- |
| `CASH`  | 法定通貨      | KRW, USD        |
| `COIN`  | メインネットコイン | BTC, ETH, TRX   |
| `TOKEN` | トークン      | USDT, USDC      |

### サポートネットワーク

| ネットワーク | 説明                | サポート資産      |
| ------------ | ------------------- | ----------------- |
| `LEGAL`      | 法定通貨            | KRW, USD          |
| `BTC`        | ビットコインネットワーク | BTC               |
| `ETH`        | イーサリアムネットワーク | ETH, USDT-ERC20   |
| `TRX`        | トロンネットワーク   | TRX, USDT-TRC20   |

---

## エラーレスポンス

### 認証失敗

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "timestamp": "2025-09-05T10:30:00.000Z",
  "path": "/asset/price"
}
```

### 権限不足

```json
{
  "statusCode": 403,
  "message": "Only Master can access",
  "timestamp": "2025-09-05T10:30:00.000Z",
  "path": "/asset"
}
```

---

## 使用例

### Node.js (axios)

```javascript
import axios from "axios";

const API_KEY = "your-api-key-here";
const BASE_URL = "https://api.crypted-pay.com";

// リアルタイム相場照会
async function getPrice() {
  try {
    const response = await axios.get(`${BASE_URL}/asset/price`, {
      headers: {
        Authorization: API_KEY,
      },
    });

    console.log("現在のUSDT価格:", response.data.origin.tether);
    console.log("手数料込みUSDT価格:", response.data.fee.tether);

    return response.data;
  } catch (error) {
    console.error("価格照会失敗:", error.response?.data || error.message);
  }
}

// サポート暗号通貨一覧照会
async function getCryptoAssets() {
  try {
    const response = await axios.get(`${BASE_URL}/asset/crypto`, {
      headers: {
        Authorization: API_KEY,
      },
    });

    console.log("サポート暗号通貨:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "暗号通貨一覧照会失敗:",
      error.response?.data || error.message
    );
  }
}
```

### Python (requests)

```python
import requests

API_KEY = 'your-api-key-here'
BASE_URL = 'https://api.crypted-pay.com'

headers = {
    'Authorization': API_KEY
}

# リアルタイム相場照会
def get_price():
    try:
        response = requests.get(f'{BASE_URL}/asset/price', headers=headers)
        response.raise_for_status()

        data = response.json()
        print(f"現在のUSDT価格: {data['origin']['tether']}")
        print(f"手数料込みUSDT価格: {data['fee']['tether']}")

        return data
    except requests.exceptions.RequestException as e:
        print(f"価格照会失敗: {e}")

# サポート暗号通貨一覧照会
def get_crypto_assets():
    try:
        response = requests.get(f'{BASE_URL}/asset/crypto', headers=headers)
        response.raise_for_status()

        data = response.json()
        print(f"サポート暗号通貨: {data}")
        return data
    except requests.exceptions.RequestException as e:
        print(f"暗号通貨一覧照会失敗: {e}")
```

---

## ⚡ 注意事項

> [!warning] 重要事項
>
> 1. **認証必須**: 全てのAPI呼び出し時に`Authorization`ヘッダーに有効なAPIキーが必要です。
> 2. **権限制限**: 一部APIにはMaster権限が必要な場合があります。
> 3. **価格変動性**: 暗号通貨価格はリアルタイムで変動するため、決済時点の価格と差異がある場合があります。

> [!tip] ヒント
>
> - `fee`オブジェクトの価格はプラットフォーム手数料が適用された価格です。
> - Rate Limitingがある場合があるため、過度なリクエストは避けてください。

---

## 🔗 関連文書

- [顧客管理API](./customer) - 顧客管理API
- [インボイスAPI](./invoice) - インボイスAPI
- [取引照会API](./transaction) - 取引照会API

#api #cryptocurrency #price #documentation