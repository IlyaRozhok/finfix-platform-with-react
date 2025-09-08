import { Response, Request } from "express";
import { AuthService } from "./auth.service";
import { UsersService } from "@/users/users.service";
import { ConfigService } from "@nestjs/config";
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    private readonly cfg;
    constructor(authService: AuthService, usersService: UsersService, cfg: ConfigService);
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: any, res: Response): Promise<void>;
    isAuthentificated(req: Request): Promise<{
        id: string;
        userName: string;
        email: string;
        avatarUrl: string;
    }>;
    logout(req: Request, res: Response): Response<any, Record<string, any>>;
    csrf(res: Response): Response<any, Record<string, any>>;
}
