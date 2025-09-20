# Tapayz Documentation Website

VitePress 기반의 다국어 지원 API 문서 사이트입니다.

## 🚀 빠른 시작

### 설치 및 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 실행 (포트 5000)
yarn dev

# 프로덕션 빌드
yarn build

# 프로덕션 미리보기
yarn preview
```

### 접속

- **개발 서버**: http://localhost:5000
- **한국어**: http://localhost:5000/ko/ (기본값)
- **영어**: http://localhost:5000/en/

## 📁 프로젝트 구조

```
tapayz-docs/
├── docs/                        # VitePress 문서 루트
│   ├── .vitepress/
│   │   └── config.js            # VitePress 설정 (다국어 포함)
│   ├── public/                  # 정적 파일 (로고, 파비콘)
│   ├── ko/                      # 한국어 문서
│   │   ├── index.md
│   │   ├── getting-started/
│   │   ├── api/
│   │   └── webhook/
│   └── en/                      # 영어 문서
│       ├── index.md
│       ├── getting-started/
│       ├── api/
│       └── webhook/
├── package.json                 # 프로젝트 설정
└── README_PROJECT.md           # 이 파일
```

## 🌍 다국어 지원

### 언어 전환

- 우상단 언어 선택기에서 한국어/영어 전환 가능
- URL 경로로도 접근 가능:
  - 한국어: `/ko/`
  - 영어: `/en/`

### 문서 구조

각 언어별로 동일한 구조를 유지합니다:

```
/{locale}/
├── index.md                    # 홈페이지
├── getting-started/            # 시작 가이드
│   ├── index.md               # 연동 가이드
│   └── quickflow.md           # 빠른 시작
├── api/                        # API 레퍼런스
│   ├── index.md               # API 개요
│   ├── price.md               # 가격 조회 API
│   ├── customer.md            # 고객 관리 API
│   └── invoice.md             # 인보이스 API
└── webhook/                    # Webhook 가이드
    ├── index.md               # Webhook 개요
    ├── invoice.md             # 인보이스 Webhook
    └── transaction.md         # 트랜잭션 Webhook
```

## 🛠️ 기술 스택

- **VitePress 1.6.4**: 정적 사이트 생성기
- **Vue 3**: 프론트엔드 프레임워크
- **Markdown**: 문서 작성
- **Mermaid**: 다이어그램 지원

## ✨ 주요 기능

### 문서 기능

- 📱 반응형 디자인
- 🌙 다크/라이트 모드
- 🔍 전체 텍스트 검색
- 📋 목차 자동 생성
- 🔗 자동 링크 생성

### 개발자 경험

- ⚡ 빠른 핫 리로드
- 🎨 문법 하이라이팅
- 📊 Mermaid 다이어그램
- 🔧 TypeScript 지원

## 📝 문서 수정 가이드

### 한국어 문서 수정

`docs/ko/` 폴더 내의 해당 `.md` 파일을 수정합니다.

### 영어 문서 수정

`docs/en/` 폴더 내의 해당 `.md` 파일을 수정합니다.

### 새 페이지 추가

1. 해당 언어 폴더에 `.md` 파일 생성
2. `docs/.vitepress/config.js`의 사이드바 설정 업데이트

### 예시: 새 API 문서 추가

```javascript
// docs/.vitepress/config.js
const koSidebar = {
  "/ko/": [
    // ... 기존 설정
    {
      text: "API 레퍼런스",
      items: [
        // ... 기존 API들
        { text: "새 API", link: "/ko/api/new-api" }, // 추가
      ],
    },
  ],
};
```

## 🚀 배포

### GitHub Pages

```bash
# 빌드
yarn build

# dist 폴더를 GitHub Pages에 배포
```

### 기타 호스팅

생성된 `dist/` 폴더를 원하는 호스팅 서비스에 업로드합니다.

## 🔧 고급 설정

### 검색 최적화

VitePress는 기본적으로 로컬 검색을 제공합니다. Algolia DocSearch와 연동하려면:

```javascript
// docs/.vitepress/config.js
export default {
  themeConfig: {
    search: {
      provider: "algolia",
      options: {
        appId: "YOUR_APP_ID",
        apiKey: "YOUR_API_KEY",
        indexName: "YOUR_INDEX_NAME",
      },
    },
  },
};
```

### 커스텀 테마

```javascript
// docs/.vitepress/theme/index.js
import DefaultTheme from "vitepress/theme";
import "./custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 커스텀 컴포넌트 등록
  },
};
```

## 📄 라이선스

MIT License

## 🤝 기여

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

**문의사항이나 버그 리포트는 이슈로 등록해주세요.**
