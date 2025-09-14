export const ENV = {
  API_URL: import.meta.env.VITE_API_URL as string,
  AUTH: {
    ME: "/api/auth/me",
    GOOGLE: "/api/auth/google",
    LOGOUT: "/api/auth/logout",
    CSRF: "/api/auth/csrf",
  },
};
