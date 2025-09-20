# 빠른 절차 (Quick Flow)

이 문서는 API를 처음 사용하는 개발자가 빠르게 엔드투엔드(End-to-End) 흐름을 경험할 수 있도록 최소한의 절차를 안내합니다.

---

## 1. API Key 설정.

모든 API 호출 시 `Authorization` 헤더에 포함해야 합니다.

```http
Authorization: <YOUR_API_KEY>
```

---

## 2. 코인 시세 조회

현재 지원하는 암호화폐의 실시간 시세(수수료 적용/미적용)를 조회할 수 있습니다.

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

## 3. 고객 생성

서비스를 이용하기 위해서는 반드시 고객을 먼저 생성해야 합니다.

**Request**

```http
POST /customer/create
Authorization: <YOUR_API_KEY>
Content-Type: application/json

{
  "name": "홍길동",
  "country": "KR"
}
```

**Response**

```json
{
  "id": 123,
  "partnerId": "partner-uuid-123",
  "name": "홍길동",
  "icon": "/icons/customer.svg",
  "country": "KR",
  "idCode": "1/0/123",
  "isActive": true,
  "isHidden": false,
  "createdAt": "2025-08-27T10:30:00.000Z",
  "updatedAt": "2025-08-27T10:30:00.000Z"
}
```

---

## 4. 인보이스 발행

등록된 고객에게 결제 인보이스를 발행합니다.

**Request**

```http
POST /invoice/issue
Authorization: <YOUR_API_KEY>
Content-Type: application/json

{
  "customerId": 123,
  "customerName": "김민수",
  "title": "USDT 10만원 구매",
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

👉 고객은 `url` 로 접속해 결제를 진행합니다.

---

## 5. Webhook 처리

결제가 완료되면, 서버로 Webhook 이벤트가 전달됩니다.  
서버는 이를 수신하고 검증하여 결제 상태를 업데이트해야 합니다.

**Webhook update-transaction 예시**

```json
{
  "state": "Complete",
  "customerId": 7,
  "detail": "d1f10b55e61d16e3616d8d0ac7c42e0edcc8a5587b251239f0a14f587032cb18",
  "amount": "1.229"
}
```

**서버 예제 (Node.js / Express)**

```javascript
app.post("/update-transaction", (req, res) => {
  const payload = req.body;

  // 1. 시그니처 검증
  verifySignature(payload, req.headers["x-signature"]);

  // 2. 이벤트 처리
  if (payload.state === "Completed") {
    console.log("결제 완료:", payload.amount);
    // DB 업데이트 등 처리
  }

  res.sendStatus(200);
});
```

---

## 요약

1. API Key 설정.  
2. 시세 조회
3. 고객 생성  
4. 인보이스 발행  
5. Webhook 처리  

이 절차를 따라 하면 실제 결제 흐름을 빠르게 체험할 수 있습니다.  
자세한 엔드포인트 설명은 **API Reference**를 참고하세요.
