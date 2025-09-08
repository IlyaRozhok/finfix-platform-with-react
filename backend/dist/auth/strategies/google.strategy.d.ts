import { ConfigService } from "@nestjs/config";
import { Profile } from "passport-google-oauth20";
import { GooglePayload } from "./types";
declare const GoogleStrategy_base: new (...args: any[]) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    constructor(cfg: ConfigService);
    validate(_: string, __: string, profile: Profile): Promise<GooglePayload>;
}
export {};
