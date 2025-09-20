# 거래 조회 API

암호화폐 거래 기록을 조회하고 관리합니다.

## API 개요

거래 조회 API를 통해 완료된 결제의 거래 상태를 조회하고 거래 세부 정보를 확인할 수 있습니다.

- **Base URL**: `https://api.crypted-pay.com`
- **인증**: API Key 필요
- **응답 형식**: JSON

## 인증

```http
Authorization: YOUR_API_KEY
```

## 거래 조회

거래 ID로 거래 상세 정보를 조회합니다.

### 요청

```http
GET /api/v1/transactions/{transaction_id}
```

### 응답

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

## 거래 목록 조회

필터 옵션을 사용하여 거래 목록을 조회합니다.

### 요청

```http
GET /api/v1/transactions?status=completed&limit=10
```

### 쿼리 파라미터

| 파라미터 | 타입 | 설명 |
|---------|------|------|
| `status` | string | 거래 상태별 필터링 (`pending`, `completed`, `failed`) |
| `invoice_id` | string | 인보이스 ID별 필터링 |
| `limit` | integer | 반환할 레코드 수 (기본값: 20, 최대: 100) |
| `offset` | integer | 건너뛸 레코드 수 (기본값: 0) |

### 응답

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

## 거래 상태

| 상태 | 설명 |
|------|------|
| `pending` | 거래 처리 중 |
| `completed` | 거래 확인 완료 |
| `failed` | 거래 실패 또는 거부됨 |

## 오류 응답

### 거래를 찾을 수 없음

```json
{
  "statusCode": 404,
  "message": "Transaction not found",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/v1/transactions/txn_invalid"
}
```

## 관련 API

- [가격 조회 API](./price) - 가격 조회 API
- [고객 관리 API](./customer) - 고객 관리 API
- [인보이스 API](./invoice) - 인보이스 API