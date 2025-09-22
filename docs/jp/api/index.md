# APIリファレンス

Tapayz APIを使用して暗号通貨決済システムを構築できます。

## API概要

- **ベースURL**: `https://api.crypted-pay.com`
- **認証方式**: API Key (Authorizationヘッダー)
- **レスポンス形式**: JSON
- **HTTPS必須**: 全てのAPIはHTTPSを通してのみアクセス可能

## 認証

全てのAPIリクエストにはAuthorizationヘッダーにAPI Keyが含まれる必要があります:

```http
Authorization: YOUR_API_KEY
```

## API一覧

### 価格照会API

リアルタイム暗号通貨相場と資産情報を照会します。

- [価格照会API](./price) - リアルタイム相場および資産一覧

### 顧客管理API

決済サービスを利用する顧客を作成、照会、管理します。

- [顧客管理API](./customer) - 顧客CRUDおよび連絡先管理

### インボイスAPI

暗号通貨決済のためのインボイスを発行、照会、管理します。

- [インボイスAPI](./invoice) - 決済要求書発行および管理

## レスポンス形式

### 成功レスポンス

```json
{
  "data": {
    // レスポンスデータ
  }
}
```

### エラーレスポンス

```json
{
  "statusCode": 400,
  "message": "Error message",
  "timestamp": "2025-09-20T10:30:00.000Z",
  "path": "/api/endpoint"
}
```

## ステータスコード

- `200` - 成功
- `400` - 不正なリクエスト
- `401` - 認証失敗
- `403` - 権限なし
- `404` - リソースなし
- `500` - サーバーエラー

## Rate Limiting

API使用量制限が適用される場合があります。過度なリクエスト時は429ステータスコードが返されます。