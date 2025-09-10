import axios from "axios";
import { ENV } from "@/shared/config/env";

// Базовый клиент с cookie
export const api = axios.create({
  baseURL: ENV.API_URL,
  withCredentials: true,
});

// Простое хранилище CSRF
let csrfToken: string | null = null;
let csrfPromise: Promise<void> | null = null;

async function fetchCsrf() {
  const res = await api.get("/api/auth/csrf");
  // сервер может вернуть в body { csrfToken } или заголовком — поддержим оба
  csrfToken =
    res.data?.csrfToken ?? (res.headers["x-csrf-token"] as string) ?? null;
}

export async function ensureCsrf() {
  if (csrfToken) return;
  if (!csrfPromise)
    csrfPromise = fetchCsrf().finally(() => (csrfPromise = null));
  await csrfPromise;
}

// Добавляем CSRF только на мутации
api.interceptors.request.use(async (config) => {
  const method = (config.method ?? "get").toLowerCase();
  if (["post", "put", "patch", "delete"].includes(method)) {
    await ensureCsrf();
    if (csrfToken) {
      config.headers = { ...(config.headers ?? {}), "X-CSRF-Token": csrfToken };
    }
  }
  return config;
});

// Авто-рефреш CSRF при 403 из-за CSRF и сигнал о 401
api.interceptors.response.use(
  (r) => r,
  async (err) => {
    const status = err?.response?.status;
    if (
      status === 403 &&
      (err.response?.data?.reason === "CSRF" ||
        err.response?.data?.code === "EBADCSRFTOKEN")
    ) {
      csrfToken = null;
      await ensureCsrf();
      err.config.headers["X-CSRF-Token"] = csrfToken;
      return api.request(err.config);
    }
    if (status === 401) {
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }
    return Promise.reject(err);
  }
);
