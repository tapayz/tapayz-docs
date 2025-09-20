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
