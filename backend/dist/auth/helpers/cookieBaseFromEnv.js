"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieBaseFromEnv = void 0;
const enums_1 = require("../../shared/enums");
const ms = require("ms");
const cookieBaseFromEnv = (cfg) => {
    const isProd = cfg.get("NODE_ENV") === enums_1.ENVIROMENT.PROD;
    const crossSite = cfg.get("CROSS_SITE") === "true";
    const jwtExp = cfg.get("APP_JWT_EXPIRES_IN") ?? "7d";
    const parsed = typeof jwtExp === "string" ? ms(jwtExp) : Number(jwtExp);
    const maxAge = Number.isFinite(parsed) ? parsed : 7 * 24 * 3600 * 1000;
    return {
        httpOnly: true,
        secure: isProd,
        sameSite: crossSite ? "none" : "lax",
        path: "/",
        maxAge,
        domain: cfg.get("COOKIE_DOMAIN") || undefined,
    };
};
exports.cookieBaseFromEnv = cookieBaseFromEnv;
//# sourceMappingURL=cookieBaseFromEnv.js.map