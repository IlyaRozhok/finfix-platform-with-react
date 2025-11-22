import { CATCH_WATERMARK } from "@nestjs/common/constants";

export const ROUTE_SEGMENTS = {
  AUTH: "auth",
  ONBOARDING: "onboarding",
  STATS: "stats",
};

export const ENDPOINTS = {
  AUTH: {
    GOOGLE: "google",
    GOOGLE_CALLBACK: "google/callback",
    ME: "me",
    LOGOUT: "logout",
    CSRF: "csrf",
  },
  ONBOARDING: {
    SUMMARY: "summary",
    CATEGORIES: "categories",
    CURRENCIES: "currencies",
    INCOMES: "incomes",
    EXPENSES: "expenses",
    DEBTS: "debts",
    INSTALLMENTS: "installments",
  },
  STATS: {
    OVERVIEW: "overview",
  },
};
