import { CATCH_WATERMARK } from "@nestjs/common/constants";

export const ROUTE_SEGMENTS = {
  AUTH: "auth",
  ONBOARDING: "onboarding",
  STATS: "stats",
  INSTALLMENTS: "installments",
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
  INSTALLMENTS: {
    GET: "get",
    CREATE: "create",
  },
  STATS: {
    OVERVIEW: "overview",
    REGULAR_INCOMES: "regular_incomes",
    EVENT_INCOMES: "event_incomes",
  },
};
