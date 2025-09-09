import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { GooglePayload } from "./strategies/types";
import { CategoriesService } from "@/categories/categories.service";
export declare class AuthService {
    private usersService;
    private jwtService;
    private categoriesService;
    constructor(usersService: UsersService, jwtService: JwtService, categoriesService: CategoriesService);
    googleAuth(googleUser: GooglePayload): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            userName: string;
            avatarUrl: string;
            isOnboarded: boolean;
        };
    }>;
}
