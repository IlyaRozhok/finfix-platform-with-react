"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const helmet_1 = require("helmet");
const csrf_inerceptor_1 = require("./common/csrf.inerceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)({ crossOriginResourcePolicy: false }));
    app.use(cookieParser());
    app.setGlobalPrefix("api");
    app.enableCors({
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalInterceptors(new csrf_inerceptor_1.CsrfInterceptor());
    const config = new swagger_1.DocumentBuilder()
        .setTitle("FinFix API")
        .setDescription("Financial Management Platform API")
        .setVersion("1.0")
        .addApiKey({ type: "apiKey", in: "header", name: "x-csrf-token" }, "csrf")
        .build();
    const apiDocument = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api/docs", app, apiDocument, {
        swaggerOptions: {
            persistAuthorization: true,
            requestInterceptor: (req) => {
                const getCookie = (name) => {
                    const doc = globalThis.document;
                    if (!doc?.cookie)
                        return null;
                    const m = doc.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
                    return m ? decodeURIComponent(m[2]) : null;
                };
                const setHeader = (token) => {
                    if (!req.headers)
                        req.headers = {};
                    if (!req.headers["x-csrf-token"]) {
                        req.headers["x-csrf-token"] = token;
                    }
                    return req;
                };
                let token = getCookie("csrf");
                if (token)
                    return setHeader(token);
                return fetch("/api/auth/csrf", { credentials: "include" })
                    .then((r) => r.json())
                    .then((data) => setHeader(data.csrf));
            },
        },
    });
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`FinFix API is running on: http://localhost:${port}`);
    console.log(`Swagger: http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map