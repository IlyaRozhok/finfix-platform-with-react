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
    INCOMES: "incomes",
  },
  REGULAR_INCOMES: {
    GET: "regular-income",
    BY_ID: "regular-income/:id",
    CREATE: "regular-income/create",
  },
  EVENT_INCOMES: {
    GET: "event-income",
    BY_ID: "event-income/:id",
    CREATE: "event-income/create",
  },
};
