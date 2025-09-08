"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsrfInterceptor = void 0;
const common_1 = require("@nestjs/common");
let CsrfInterceptor = class CsrfInterceptor {
    intercept(ctx, next) {
        const req = ctx.switchToHttp().getRequest();
        const url = req.url;
        if (url.startsWith("/api/docs") || url.startsWith("/api-json")) {
            return next.handle();
        }
        if (["GET", "HEAD", "OPTIONS"].includes(req.method))
            return next.handle();
        const tokenHeader = req.header("x-csrf-token");
        const tokenCookie = req.cookies?.["csrf"];
        if (!tokenHeader || !tokenCookie || tokenHeader !== tokenCookie) {
            throw new common_1.ForbiddenException("Bad CSRF token");
        }
        return next.handle();
    }
};
exports.CsrfInterceptor = CsrfInterceptor;
exports.CsrfInterceptor = CsrfInterceptor = __decorate([
    (0, common_1.Injectable)()
], CsrfInterceptor);
//# sourceMappingURL=csrf.inerceptor.js.map