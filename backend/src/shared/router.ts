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
    REGULAR_INCOMES: "regular_incomes",
    EVENT_INCOMES: "event_incomes",
  },
  INCOMES: {
    FIND_REGULAR: "regular/find",
    FIND_EVENT: "event/find",
    FIND_ALL: "all/find",
    REGULAR: "regular/:id",
    EVENT: "event/:id",
    REGULAR_CREATE: "regular/create",
    EVENT_CREATE: "event/create",
  },
};
