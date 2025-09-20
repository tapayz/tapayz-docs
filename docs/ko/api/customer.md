# 고객 API (Customer API)

> [!info] 개요 결제 서비스를 이용하는 고객을 생성, 조회, 관리할 수 있는 API입니다. 고객 정보, 연락처, 메모 등을 관리하여 개인화된 결제 경험을 제공할 수 있습니다.

## 👤 고객 생성

새로운 고객을 생성합니다.

### 요청

```http
POST /customer/create/{name}
Authorization: <YOUR_API_KEY>
```

> [!note] 경로 파라미터

| 파라미터 | 타입   | 필수 | 설명      |
| -------- | ------ | ---- | --------- |
| `name`   | string | ✅   | 고객 이름 |

### 응답

```json
{
  "id": "customer-cuid-123",
  "partnerId": "partner-uuid-456",
  "name": "김민수",
  "icon": "/images/customer.svg",
  "country": null,
  "idCode": "1/0/0",
  "isActive": true,
  "isHidden": false,
  "createdAt": "2025-09-05T10:30:00.000Z",
  "updatedAt": "2025-09-05T10:30:00.000Z"
}
```

> [!tip] 응답 필드 설명

| 필드        | 타입    | 설명                |
| ----------- | ------- | ------------------- |
| `id`        | string  | 고객 고유 ID (CUID) |
| `partnerId` | string  | 파트너 ID           |
| `name`      | string  | 고객 이름           |
| `icon`      | string  | 고객 아이콘 URL     |
| `country`   | string  | 국가 코드           |
| `idCode`    | string  | 계층 구조 식별자    |
| `isActive`  | boolean | 활성화 상태         |
| `isHidden`  | boolean | 숨김 상태           |

---

## 📋 고객 목록 조회

파트너의 고객 목록을 조회합니다.

### 요청

```http
GET /customer?searchType=name&search=김&sortKey=createdAt&sortType=desc&page=1&size=10
Authorization: <YOUR_API_KEY>
```

> [!note] 쿼리 파라미터

| 파라미터     | 타입   | 필수 | 설명                                             |
| ------------ | ------ | ---- | ------------------------------------------------ |
| `searchType` | string | ❌   | 검색 유형 (`name`, `email`, `phone`, `id`, ``)   |
| `search`     | string | ❌   | 검색어                                           |
| `sortKey`    | string | ❌   | 정렬 기준 (`name`, `createdAt`, `updatedAt`, ``) |
| `sortType`   | string | ❌   | 정렬 방향 (`asc`, `desc`, ``)                    |
| `page`       | number | ❌   | 페이지 번호 (기본값: 1)                          |
| `size`       | number | ❌   | 페이지 크기 (기본값: 10)                         |

### 응답

```json
{
  "total": 25,
  "list": [
    {
      "id": "customer-cuid-123",
      "name": "김민수",
      "icon": "/images/customer.svg",
      "country": "KR",
      "createdAt": "2025-09-05T10:30:00.000Z",
      "CustomerContact": [
        {
          "id": 1,
          "type": "EMAIL",
          "value": "kim@example.com",
          "desc": "주 이메일",
          "isActive": true
        },
        {
          "id": 2,
          "type": "PHONE",
          "value": "010-1234-5678",
          "desc": "휴대폰",
          "isActive": true
        }
      ]
    }
  ]
}
```

---

## 🔍 고객 상세 조회

특정 고객의 상세 정보를 조회합니다.

### 요청

```http
GET /customer/detail?targetId=customer-cuid-123
Authorization: <YOUR_API_KEY>
```

> [!note] 쿼리 파라미터

| 파라미터   | 타입   | 필수 | 설명    |
| ---------- | ------ | ---- | ------- |
| `targetId` | string | ✅   | 고객 ID |

### 응답

```json
{
  "id": "customer-cuid-123",
  "partnerId": "partner-uuid-456",
  "name": "김민수",
  "icon": "/images/customer.svg",
  "country": "KR",
  "idCode": "1/0/0",
  "isActive": true,
  "isHidden": false,
  "createdAt": "2025-09-05T10:30:00.000Z",
  "updatedAt": "2025-09-05T10:30:00.000Z",
  "CustomerMemo": [
    {
      "id": 1,
      "memo": "VIP 고객",
      "createdAt": "2025-09-05T10:35:00.000Z",
      "isDeleted": false
    }
  ],
  "CustomerContact": [
    {
      "id": 1,
      "type": "EMAIL",
      "value": "kim@example.com",
      "desc": "주 이메일",
      "isActive": true,
      "createdAt": "2025-09-05T10:30:00.000Z"
    }
  ],
  "partner": {
    "name": "파트너 회사",
    "icon": "/images/partner.svg"
  }
}
```

---

## ✏️ 고객 정보 수정

### 고객 이름 수정

```http
POST /customer/name
Authorization: <YOUR_API_KEY>
Content-Type: application/json
```

```json
{
  "targetId": "customer-cuid-123",
  "name": "김민수"
}
```

### 고객 아이콘 업로드

```http
POST /customer/icon
Authorization: <YOUR_API_KEY>
Content-Type: multipart/form-data
```

**Form Data:**

- `targetId`: customer-cuid-123
- `file`: 이미지 파일 (최대 5MB)

### 응답

```json
{
  "id": "customer-cuid-123",
  "icon": "https://cdn.example.com/web/upload/icons/1725539400_abc123"
}
```

---

## 📝 고객 메모 관리

### 메모 추가

```http
POST /customer/memo
Authorization: <YOUR_API_KEY>
Content-Type: application/json
```

```json
{
  "targetId": "customer-cuid-123",
  "memo": "VIP 고객 - 특별 관리 필요"
}
```

### 메모 수정

```http
POST /customer/memo/edit
Authorization: <YOUR_API_KEY>
Content-Type: application/json
```

```json
{
  "targetId": "customer-cuid-123",
  "memoId": 1,
  "memo": "VIP 고객 - 프리미엄 서비스 제공"
}
```

### 메모 삭제

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

## 📞 고객 연락처 관리

### 연락처 추가

```http
POST /customer/contact
Authorization: <YOUR_API_KEY>
Content-Type: application/json
```

```json
{
  "targetId": "customer-cuid-123",
  "type": "EMAIL",
  "value": "kim@example.com",
  "desc": "주 이메일 주소"
}
```

> [!note] 연락처 타입

| 타입    | 설명        |
| ------- | ----------- |
| `EMAIL` | 이메일 주소 |
| `PHONE` | 전화번호    |

### 연락처 수정

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
  "desc": "새로운 이메일 주소"
}
```

### 연락처 삭제

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

## 🔍 검색 및 필터링

### 검색 유형별 쿼리 예시

**이름으로 검색:**

```http
GET /customer?searchType=name&search=김민수
```

**이메일로 검색:**

```http
GET /customer?searchType=email&search=kim@example.com
```

**전화번호로 검색:**

```http
GET /customer?searchType=phone&search=010-1234-5678
```

**생성일자 정렬:**

```http
GET /customer?sortKey=createdAt&sortType=desc
```

---

## ⚠️ 에러 응답

### 인증 실패

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "timestamp": "2025-09-05T10:30:00.000Z",
  "path": "/customer"
}
```

### 권한 없음

```json
{
  "statusCode": 403,
  "message": "No permission",
  "timestamp": "2025-09-05T10:30:00.000Z",
  "path": "/customer/detail"
}
```

### 고객 없음

```json
{
  "statusCode": 404,
  "message": "Customer not found",
  "timestamp": "2025-09-05T10:30:00.000Z",
  "path": "/customer/detail"
}
```

### 파일 크기 초과

```json
{
  "statusCode": 413,
  "message": "File too large",
  "timestamp": "2025-09-05T10:30:00.000Z",
  "path": "/customer/icon"
}
```

---

## 💻 사용 예시

### Node.js (axios)

```javascript
import axios from "axios";

const API_KEY = "your-api-key-here";
const BASE_URL = "https://api.crypted-pay.com";

// 고객 생성
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

    console.log("고객 생성 완료:", response.data);
    return response.data;
  } catch (error) {
    console.error("고객 생성 실패:", error.response?.data || error.message);
  }
}

// 고객 목록 조회
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

    console.log(`총 ${response.data.total}명의 고객`);
    return response.data;
  } catch (error) {
    console.error(
      "고객 목록 조회 실패:",
      error.response?.data || error.message
    );
  }
}

// 고객 상세 조회
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

    console.log("고객 상세 정보:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "고객 상세 조회 실패:",
      error.response?.data || error.message
    );
  }
}

// 고객 메모 추가
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

    console.log("메모 추가 완료:", response.data);
    return response.data;
  } catch (error) {
    console.error("메모 추가 실패:", error.response?.data || error.message);
  }
}

// 고객 연락처 추가
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

    console.log("연락처 추가 완료:", response.data);
    return response.data;
  } catch (error) {
    console.error("연락처 추가 실패:", error.response?.data || error.message);
  }
}

// 고객 아이콘 업로드
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

    console.log("아이콘 업로드 완료:", response.data);
    return response.data;
  } catch (error) {
    console.error("아이콘 업로드 실패:", error.response?.data || error.message);
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

# 고객 생성
def create_customer(name):
    try:
        response = requests.post(f'{BASE_URL}/customer/create/{name}',
                               headers={'Authorization': API_KEY})
        response.raise_for_status()

        data = response.json()
        print(f"고객 생성 완료: {data['name']} (ID: {data['id']})")
        return data
    except requests.exceptions.RequestException as e:
        print(f"고객 생성 실패: {e}")

# 고객 목록 조회
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
        print(f"총 {data['total']}명의 고객")
        return data
    except requests.exceptions.RequestException as e:
        print(f"고객 목록 조회 실패: {e}")

# 고객 메모 추가
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
        print(f"메모 추가 완료: {memo}")
        return data
    except requests.exceptions.RequestException as e:
        print(f"메모 추가 실패: {e}")

# 고객 연락처 추가
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
        print(f"연락처 추가 완료: {value}")
        return data
    except requests.exceptions.RequestException as e:
        print(f"연락처 추가 실패: {e}")
```

---

## ⚡ 주의사항

> [!warning] 중요 사항
>
> 1. **인증 필수**: 모든 API 호출 시 `Authorization` 헤더에 유효한 API 키가 필요합니다.
> 2. **권한 확인**: 파트너는 자신이 생성한 고객만 조회/수정할 수 있습니다.
> 3. **파일 크기 제한**: 아이콘 업로드 시 최대 5MB까지 업로드 가능합니다.

> [!tip] 팁
>
> - 고객 이름은 파트너 내에서 고유해야 합니다.
> - 검색 시 이메일과 전화번호는 연락처 테이블에서 검색됩니다.
> - 메모와 연락처는 무제한으로 추가할 수 있습니다.
> - `idCode`는 계층 구조를 나타내며 자동으로 생성됩니다.

---

## 🔗 관련 문서

- [가격 조회 API](./price) - 가격 조회 API
- [인보이스 API](./invoice) - 인보이스 API
- [거래 조회 API](./transaction) - 거래 조회 API

#api #customer #management #documentation
