import { CATCH_WATERMARK } from "@nestjs/common/constants";

export const ROUTE_SEGMENTS = {
  AUTH: "auth",
  ONBOARDING: "onboarding",
  STATS: "stats",
  INSTALLMENTS: "installments",
  INCOMES: "incomes",
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
    INCOMES: "incomes",
  },

  REGULAR_INCOMES: {
    GET: "regular",
    BY_ID: "regular/:id",
    CREATE: "regular/create",
  },
  EVENT_INCOMES: {
    GET: "event",
    BY_ID: "event/:id",
    CREATE: "event/create",
  },
};
