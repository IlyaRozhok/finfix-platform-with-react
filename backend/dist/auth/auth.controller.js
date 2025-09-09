"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const passport_1 = require("@nestjs/passport");
const router_1 = require("../shared/router");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const users_service_1 = require("../users/users.service");
const config_1 = require("@nestjs/config");
const cookieBaseFromEnv_1 = require("./helpers/cookieBaseFromEnv");
const crypto_1 = require("crypto");
const google_auth_guard_1 = require("./guards/google-auth-guard");
let AuthController = class AuthController {
    constructor(authService, usersService, cfg) {
        this.authService = authService;
        this.usersService = usersService;
        this.cfg = cfg;
    }
    async googleAuth() { }
    async googleAuthRedirect(req, res) {
        const cookieState = req.cookies?.["oauth_state"];
        const queryState = req.query?.["state"];
        if (!cookieState || !queryState || cookieState !== queryState) {
            return res.redirect(`${process.env.FRONTEND_URL}/app/auth/callback?success=false&error=${encodeURIComponent("bad state")}`);
        }
        res.clearCookie("oauth_state", { path: "/" });
        try {
            const { access_token, user } = await this.authService.googleAuth(req.user);
            const COOKIE_NAME = this.cfg.get("COOKIE_NAME") ?? "finfix_token";
            const csrf = (0, crypto_1.randomBytes)(32).toString("hex");
            const base = (0, cookieBaseFromEnv_1.cookieBaseFromEnv)(this.cfg);
            res.cookie(COOKIE_NAME, access_token, base);
            res.cookie("csrf", csrf, { ...base, httpOnly: false });
            console.log("USER", user);
            const route = user.isOnboarded ? "dashboard" : "onboarding";
            return res.redirect(`${process.env.FRONTEND_URL}/${route}`);
        }
        catch (error) {
            const msg = error?.message ?? "Authentication failed";
            return res.redirect(`${process.env.FRONTEND_URL}/app/auth/callback?success=false&error=${encodeURIComponent(msg)}`);
        }
    }
    async isAuthentificated(req) {
        const jwtUser = req.user;
        if (!jwtUser?.sub) {
            throw new common_1.UnauthorizedException("Not authorized");
        }
        const user = await this.usersService.findById(jwtUser.sub);
        if (!user)
            throw new common_1.UnauthorizedException("Session is invalid");
        return {
            id: user.id,
            userName: user.userName,
            email: user.email,
            avatarUrl: user.avatarUrl,
            isOnboarded: user.isOnboarded,
        };
    }
    logout(req, res) {
        const name = this.cfg.get("COOKIE_NAME") ?? "finfix_token";
        const base = (0, cookieBaseFromEnv_1.cookieBaseFromEnv)(this.cfg);
        res.clearCookie("csrf", { ...base, httpOnly: false });
        res.clearCookie(name, { ...base });
        return res.status(204).send();
    }
    csrf(res) {
        const csrf = (0, crypto_1.randomBytes)(32).toString("hex");
        const base = (0, cookieBaseFromEnv_1.cookieBaseFromEnv)(this.cfg);
        res.cookie("csrf", csrf, {
            ...base,
            httpOnly: false,
            maxAge: 50 * 60 * 1000,
        });
        return res.json({ csrf });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)(router_1.ENDPOINTS.AUTH.GOOGLE),
    (0, common_1.UseGuards)(google_auth_guard_1.GoogleAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)(router_1.ENDPOINTS.AUTH.GOOGLE_CALLBACK),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(router_1.ENDPOINTS.AUTH.GOOGLE)),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, common_1.Get)(router_1.ENDPOINTS.AUTH.ME),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Header)("Cache-Control", "no-store"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "isAuthentificated", null);
__decorate([
    (0, common_1.Post)(router_1.ENDPOINTS.AUTH.LOGOUT),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)(router_1.ENDPOINTS.AUTH.CSRF),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "csrf", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)(router_1.ROUTE_SEGMENTS.AUTH),
    (0, common_1.Controller)(router_1.ROUTE_SEGMENTS.AUTH),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService,
        config_1.ConfigService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map