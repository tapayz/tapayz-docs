# 取引照会 API

暗号通貨取引記録を照会し管理します。

## API概要

取引照会APIを通じて完了した決済の取引状態を照会し、取引詳細情報を確認できます。

- **Base URL**: `https://api.crypted-pay.com`
- **認証**: APIキー必要
- **レスポンス形式**: JSON

## 認証

```http
Authorization: YOUR_API_KEY
```

## 取引照会

取引IDで取引詳細情報を照会します。

### リクエスト

```http
GET /api/v1/transactions/{transaction_id}
```

### レスポンス

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

## 取引リスト照会

フィルターオプションを使用して取引リストを照会します。

### リクエスト

```http
GET /api/v1/transactions?status=completed&limit=10
```

### クエリパラメータ

| パラメータ | 型 | 説明 |
|---------|------|------|
| `status` | string | 取引状態別フィルタリング (`pending`, `completed`, `failed`) |
| `invoice_id` | string | インボイスID別フィルタリング |
| `limit` | integer | 返すレコード数 (デフォルト: 20, 最大: 100) |
| `offset` | integer | スキップするレコード数 (デフォルト: 0) |

### レスポンス

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

## 取引状態

| 状態 | 説明 |
|------|------|
| `pending` | 取引処理中 |
| `completed` | 取引確認完了 |
| `failed` | 取引失敗または拒否 |

## エラーレスポンス

### 取引が見つからない

```json
{
  "statusCode": 404,
  "message": "Transaction not found",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "path": "/api/v1/transactions/txn_invalid"
}
```

## 関連API

- [価格照会 API](./price) - 価格照会 API
- [顧客管理 API](./customer) - 顧客管理 API
- [インボイス API](./invoice) - インボイス API