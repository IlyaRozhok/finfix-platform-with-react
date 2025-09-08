import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
export declare class CsrfInterceptor implements NestInterceptor {
    intercept(ctx: ExecutionContext, next: CallHandler): import("rxjs").Observable<any>;
}
