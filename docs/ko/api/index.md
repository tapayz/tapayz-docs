# API 레퍼런스

Tapayz API를 사용하여 암호화폐 결제 시스템을 구축할 수 있습니다.

## API 개요

- **베이스 URL**: `https://api.crypted-pay.com`
- **인증 방식**: API Key (Authorization 헤더)
- **응답 형식**: JSON
- **HTTPS 필수**: 모든 API는 HTTPS를 통해서만 접근 가능

## 인증

모든 API 요청에는 Authorization 헤더에 API Key가 포함되어야 합니다:

```http
Authorization: YOUR_API_KEY
```

## API 목록

### 가격 조회 API

실시간 암호화폐 시세와 자산 정보를 조회합니다.

- [가격 조회 API](./price) - 실시간 시세 및 자산 목록

### 고객 관리 API

결제 서비스를 이용하는 고객을 생성, 조회, 관리합니다.

- [고객 관리 API](./customer) - 고객 CRUD 및 연락처 관리

### 인보이스 API

암호화폐 결제를 위한 인보이스를 발행, 조회, 관리합니다.

- [인보이스 API](./invoice) - 결제 요청서 발행 및 관리

## 응답 형식

### 성공 응답

```json
{
  "data": {
    // 응답 데이터
  }
}
```

### 에러 응답

```json
{
  "statusCode": 400,
  "message": "Error message",
  "timestamp": "2025-09-20T10:30:00.000Z",
  "path": "/api/endpoint"
}
```

## 상태 코드

- `200` - 성공
- `400` - 잘못된 요청
- `401` - 인증 실패
- `403` - 권한 없음
- `404` - 리소스 없음
- `500` - 서버 오류

## Rate Limiting

API 사용량 제한이 적용될 수 있습니다. 과도한 요청 시 429 상태 코드가 반환됩니다.
