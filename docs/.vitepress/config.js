import { defineConfig } from "vitepress";

// Shared configuration
const sharedConfig = {
  title: "Tapayz",
  description: "Cryptocurrency Payment API Documentation",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { name: "theme-color", content: "#3c8772" }],
  ],
  themeConfig: {
    logo: "/logo.svg",
    search: {
      provider: "local",
    },
  },
};

// Korean navigation
const koNav = [
  { text: "홈", link: "/ko/" },
  { text: "시작하기", link: "/ko/getting-started/" },
  { text: "API 레퍼런스", link: "/ko/api/" },
  { text: "Webhook", link: "/ko/webhook/" },
];

const koSidebar = {
  "/ko/": [
    {
      text: "소개",
      items: [{ text: "Tapayz란?", link: "/ko/" }],
    },
    {
      text: "시작하기",
      items: [
        { text: "연동 가이드", link: "/ko/getting-started/" },
        { text: "빠른 시작", link: "/ko/getting-started/quickflow" },
      ],
    },
    {
      text: "API 레퍼런스",
      items: [
        { text: "가격 조회", link: "/ko/api/price" },
        { text: "고객 관리", link: "/ko/api/customer" },
        { text: "인보이스", link: "/ko/api/invoice" },
        { text: "거래 조회", link: "/ko/api/transaction" },
      ],
    },
    {
      text: "Webhook",
      items: [
        { text: "Webhook 개요", link: "/ko/webhook/" },
        { text: "인보이스 Webhook", link: "/ko/webhook/invoice" },
        { text: "트랜잭션 Webhook", link: "/ko/webhook/transaction" },
      ],
    },
  ],
};

// Japanese navigation
const jpNav = [
  { text: "ホーム", link: "/jp/" },
  { text: "はじめに", link: "/jp/getting-started/" },
  { text: "APIリファレンス", link: "/jp/api/" },
  { text: "Webhook", link: "/jp/webhook/" },
];

const jpSidebar = {
  "/jp/": [
    {
      text: "紹介",
      items: [{ text: "Tapayzとは？", link: "/jp/" }],
    },
    {
      text: "はじめに",
      items: [
        { text: "連携ガイド", link: "/jp/getting-started/" },
        { text: "クイックスタート", link: "/jp/getting-started/quickflow" },
      ],
    },
    {
      text: "APIリファレンス",
      items: [
        { text: "価格照会", link: "/jp/api/price" },
        { text: "顧客管理", link: "/jp/api/customer" },
        { text: "インボイス", link: "/jp/api/invoice" },
        { text: "取引照会", link: "/jp/api/transaction" },
      ],
    },
    {
      text: "Webhook",
      items: [
        { text: "Webhook概要", link: "/jp/webhook/" },
        { text: "インボイスWebhook", link: "/jp/webhook/invoice" },
        { text: "トランザクションWebhook", link: "/jp/webhook/transaction" },
      ],
    },
  ],
};

// English navigation
const enNav = [
  { text: "Home", link: "/" },
  { text: "Getting Started", link: "/getting-started/" },
  { text: "API Reference", link: "/api/" },
  { text: "Webhook", link: "/webhook/" },
];

const enSidebar = {
  "/": [
    {
      text: "Introduction",
      items: [{ text: "What is Tapayz?", link: "/" }],
    },
    {
      text: "Getting Started",
      items: [
        { text: "Integration Guide", link: "/getting-started/" },
        { text: "Quick Start", link: "/getting-started/quickflow" },
      ],
    },
    {
      text: "API Reference",
      items: [
        { text: "Price API", link: "/api/price" },
        { text: "Customer API", link: "/api/customer" },
        { text: "Invoice API", link: "/api/invoice" },
        { text: "Transaction API", link: "/api/transaction" },
      ],
    },
    {
      text: "Webhook",
      items: [
        { text: "Webhook Overview", link: "/webhook/" },
        { text: "Invoice Webhook", link: "/webhook/invoice" },
        { text: "Transaction Webhook", link: "/webhook/transaction" },
      ],
    },
  ],
};

export default defineConfig({
  ...sharedConfig,

  // Multi-language support
  locales: {
    root: {
      label: "English",
      lang: "en-US",
      title: "Tapayz",
      description: "Cryptocurrency Payment API Documentation",
      themeConfig: {
        ...sharedConfig.themeConfig,
        nav: enNav,
        sidebar: enSidebar,
        outline: {
          label: "Table of Contents",
        },
        lastUpdated: {
          text: "Last Updated",
        },
        docFooter: {
          prev: "Previous",
          next: "Next",
        },
      },
    },
    ko: {
      label: "한국어",
      lang: "ko-KR",
      title: "Tapayz",
      description: "암호화폐 결제 API 문서",
      themeConfig: {
        ...sharedConfig.themeConfig,
        nav: koNav,
        sidebar: koSidebar,
        outline: {
          label: "목차",
        },
        lastUpdated: {
          text: "최종 업데이트",
        },
        docFooter: {
          prev: "이전",
          next: "다음",
        },
        darkModeSwitchLabel: "다크 모드",
        sidebarMenuLabel: "메뉴",
        returnToTopLabel: "맨 위로",
      },
    },
    jp: {
      label: "日本語",
      lang: "ja-JP",
      title: "Tapayz",
      description: "暗号通貨決済 API ドキュメント",
      themeConfig: {
        ...sharedConfig.themeConfig,
        nav: jpNav,
        sidebar: jpSidebar,
        outline: {
          label: "目次",
        },
        lastUpdated: {
          text: "最終更新",
        },
        docFooter: {
          prev: "前へ",
          next: "次へ",
        },
        darkModeSwitchLabel: "ダークモード",
        sidebarMenuLabel: "メニュー",
        returnToTopLabel: "トップへ戻る",
      },
    },
  },

  // Move English content to root
  rewrites: {
    "en/:rest*": ":rest*"
  },

  // Build options
  base: "/",
  outDir: "../dist",

  // Development server
  server: {
    port: 5000,
    host: true,
  },

  // Markdown options
  markdown: {
    lineNumbers: true,
    theme: {
      light: "github-light",
      dark: "github-dark",
    },
  },
});
