# 가격 API (Price API)

> [!info] 개요 : 실시간 암호화폐 및 법정화폐의 시세 정보를 조회할 수 있는 API입니다. 모든 가격은 KRW 기준으로 제공되며, 수수료 적용/미적용 가격을 모두 확인할 수 있습니다.

## 실시간 시세 조회

현재 지원하는 모든 자산의 실시간 시세를 조회합니다.

### 요청

```http
GET /asset/price
Authorization: <YOUR_API_KEY>
```

### 응답

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

> [!note] 응답 필드 설명

| 필드              | 타입   | 설명                                   |
| ----------------- | ------ | -------------------------------------- |
| `exchangeFeeRate` | string | 플랫폼 수수료율 (소수점 표기)          |
| `krw`             | string | KRW 기준 환율                          |
| `krwWithFee`      | string | 수수료가 적용된 KRW 환율               |
| `origin`          | object | 각 암호화폐의 원본 시세 (KRW)          |
| `fee`             | object | 수수료가 적용된 각 암호화폐 시세 (KRW) |

**origin/fee 객체 내부 필드**

| 필드     | 설명                    |
| -------- | ----------------------- |
| `tether` | USDT 가격 (TRC20/ERC20) |
| `eth`    | Ethereum 가격           |
| `trx`    | Tron 가격               |

---

## 지원 자산 목록 조회

플랫폼에서 지원하는 모든 자산 목록을 조회합니다.

### 요청

```http
GET /asset
Authorization: <YOUR_API_KEY>
```

### 응답

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

> [!note] 응답 필드 설명

| 필드       | 타입    | 설명                                             |
| ---------- | ------- | ------------------------------------------------ |
| `id`       | number  | 자산 고유 ID                                     |
| `type`     | string  | 자산 유형 (`CASH`, `COIN`, `TOKEN`)              |
| `name`     | string  | 자산 전체 이름                                   |
| `symbol`   | string  | 자산 심볼 (예: BTC, ETH, USDT)                   |
| `network`  | string  | 블록체인 네트워크 (`BTC`, `ETH`, `TRX`, `LEGAL`) |
| `digit`    | number  | 소수점 자릿수                                    |
| `price`    | string  | 현재 가격 (KRW 기준)                             |
| `isActive` | boolean | 활성화 상태                                      |

---

## 암호화폐 목록 조회

암호화폐 (코인/토큰)만 필터링하여 조회합니다.

### 요청

```http
GET /asset/crypto
Authorization: <YOUR_API_KEY>
```

### 응답

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

## 법정화폐 목록 조회

법정화폐만 필터링하여 조회합니다.

### 요청

```http
GET /asset/cash
Authorization: <YOUR_API_KEY>
```

### 응답

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

## 자산 유형 및 네트워크

### 자산 유형

| 유형    | 설명        | 예시          |
| ------- | ----------- | ------------- |
| `CASH`  | 법정화폐    | KRW, USD      |
| `COIN`  | 메인넷 코인 | BTC, ETH, TRX |
| `TOKEN` | 토큰        | USDT, USDC    |

### 지원 네트워크

| 네트워크 | 설명              | 지원 자산       |
| -------- | ----------------- | --------------- |
| `LEGAL`  | 법정화폐          | KRW, USD        |
| `BTC`    | 비트코인 네트워크 | BTC             |
| `ETH`    | 이더리움 네트워크 | ETH, USDT-ERC20 |
| `TRX`    | 트론 네트워크     | TRX, USDT-TRC20 |

---

## 에러 응답

### 인증 실패

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "timestamp": "2025-09-05T10:30:00.000Z",
  "path": "/asset/price"
}
```

### 권한 부족

```json
{
  "statusCode": 403,
  "message": "Only Master can access",
  "timestamp": "2025-09-05T10:30:00.000Z",
  "path": "/asset"
}
```

---

## 사용 예시

### Node.js (axios)

```javascript
import axios from "axios";

const API_KEY = "your-api-key-here";
const BASE_URL = "https://api.crypted-pay.com";

// 실시간 시세 조회
async function getPrice() {
  try {
    const response = await axios.get(`${BASE_URL}/asset/price`, {
      headers: {
        Authorization: API_KEY,
      },
    });

    console.log("현재 USDT 가격:", response.data.origin.tether);
    console.log("수수료 포함 USDT 가격:", response.data.fee.tether);

    return response.data;
  } catch (error) {
    console.error("가격 조회 실패:", error.response?.data || error.message);
  }
}

// 지원 암호화폐 목록 조회
async function getCryptoAssets() {
  try {
    const response = await axios.get(`${BASE_URL}/asset/crypto`, {
      headers: {
        Authorization: API_KEY,
      },
    });

    console.log("지원 암호화폐:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "암호화폐 목록 조회 실패:",
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

# 실시간 시세 조회
def get_price():
    try:
        response = requests.get(f'{BASE_URL}/asset/price', headers=headers)
        response.raise_for_status()

        data = response.json()
        print(f"현재 USDT 가격: {data['origin']['tether']}")
        print(f"수수료 포함 USDT 가격: {data['fee']['tether']}")

        return data
    except requests.exceptions.RequestException as e:
        print(f"가격 조회 실패: {e}")

# 지원 암호화폐 목록 조회
def get_crypto_assets():
    try:
        response = requests.get(f'{BASE_URL}/asset/crypto', headers=headers)
        response.raise_for_status()

        data = response.json()
        print(f"지원 암호화폐: {data}")
        return data
    except requests.exceptions.RequestException as e:
        print(f"암호화폐 목록 조회 실패: {e}")
```

---

## ⚡ 주의사항

> [!warning] 중요 사항
>
> 1. **인증 필수**: 모든 API 호출 시 `Authorization` 헤더에 유효한 API 키가 필요합니다.
> 2. **권한 제한**: 일부 API는 Master 권한이 필요할 수 있습니다.
> 3. **가격 변동성**: 암호화폐 가격은 실시간으로 변동되므로, 결제 시점의 가격과 차이가 있을 수 있습니다.

> [!tip] 팁
>
> - `fee` 객체의 가격은 플랫폼 수수료가 적용된 가격입니다.
> - Rate Limiting이 있을 수 있으니 과도한 요청은 피해주세요.

---

## 🔗 관련 문서

- [고객 관리 API](./customer) - 고객 관리 API
- [인보이스 API](./invoice) - 인보이스 API
- [거래 조회 API](./transaction) - 거래 조회 API

#api #cryptocurrency #price #documentation
