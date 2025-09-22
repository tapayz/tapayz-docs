# クイック手順（Quick Flow）

この文書は、APIを初めて使用する開発者が迅速にエンドツーエンド（End-to-End）フローを体験できるよう最小限の手順を案内します。

---

## 1. API Key設定

全てのAPI呼び出し時に`Authorization`ヘッダーに含める必要があります。

```http
Authorization: <YOUR_API_KEY>
```

---

## 2. コイン相場照会

現在サポートしている暗号通貨のリアルタイム相場（手数料適用/未適用）を照会できます。

**Request**

```http
GET /asset/price
Authorization: <YOUR_API_KEY>
```

**Response**

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
    "tether": "1350.500000",
    "eth": "2650000.000000",
    "trx": "150.000000"
  }
}
```

---

## 3. 顧客作成

サービスを利用するためには必ず顧客を先に作成する必要があります。

**Request**

```http
POST /customer/create
Authorization: <YOUR_API_KEY>
Content-Type: application/json

{
  "name": "田中太郎",
  "country": "JP"
}
```

**Response**

```json
{
  "id": 123,
  "partnerId": "partner-uuid-123",
  "name": "田中太郎",
  "icon": "/icons/customer.svg",
  "country": "JP",
  "idCode": "1/0/123",
  "isActive": true,
  "isHidden": false,
  "createdAt": "2025-08-27T10:30:00.000Z",
  "updatedAt": "2025-08-27T10:30:00.000Z"
}
```

---

## 4. インボイス発行

登録された顧客に決済インボイスを発行します。

**Request**

```http
POST /invoice/issue
Authorization: <YOUR_API_KEY>
Content-Type: application/json

{
  "customerId": 123,
  "customerName": "佐藤次郎",
  "title": "USDT 10万円購入",
  "priceAtRequest": 1350.5,
  "fiatAssetId": 1,
  "cryptoAssetId": 1001,
  "cashAmount": 100000,
  "expiredSecond": 300
}
```

**Response**

```json
{
  "invoice": {
    "id": "invoice-uuid-456",
    "partnerId": "partner-uuid-123",
    "amount": "100000.000000",
    "state": "Complete",
    "createdAt": "2025-08-27T09:00:00.000Z"
  },
  "url": "https://invoice.example.com/b2f1e3a4-56cd-7890-ab12-..."
}
```

👉 顧客は`url`にアクセスして決済を進行します。

---

## 5. Webhook処理

決済が完了すると、サーバーにWebhookイベントが送達されます。
サーバーはこれを受信し検証して決済状態を更新する必要があります。

**Webhook update-transaction例**

```json
{
  "state": "Complete",
  "customerId": 7,
  "detail": "d1f10b55e61d16e3616d8d0ac7c42e0edcc8a5587b251239f0a14f587032cb18",
  "amount": "1.229"
}
```

**サーバー例（Node.js / Express）**

```javascript
app.post("/update-transaction", (req, res) => {
  const payload = req.body;

  // 1. シグネチャ検証
  verifySignature(payload, req.headers["x-signature"]);

  // 2. イベント処理
  if (payload.state === "Completed") {
    console.log("決済完了:", payload.amount);
    // DB更新等処理
  }

  res.sendStatus(200);
});
```

---

## 要約

1. API Key設定
2. 相場照会
3. 顧客作成
4. インボイス発行
5. Webhook処理

この手順に従えば実際の決済フローを迅速に体験できます。
詳細なエンドポイント説明は **APIリファレンス** を参考してください。