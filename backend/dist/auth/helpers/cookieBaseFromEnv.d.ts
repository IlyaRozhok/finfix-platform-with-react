import { ConfigService } from "@nestjs/config";
export declare const cookieBaseFromEnv: (cfg: ConfigService) => {
    httpOnly: boolean;
    secure: boolean;
    sameSite: "none" | "lax";
    path: string;
    maxAge: any;
    domain: string;
};
