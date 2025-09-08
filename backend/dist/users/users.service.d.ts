import { Repository } from "typeorm";
import { User } from "./user.entity";
import { GooglePayload } from "@/auth/strategies/types";
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findByGoogleSub(googleSub: string): Promise<User | null>;
    upsertFromGoogle(profile: GooglePayload): Promise<User>;
}
