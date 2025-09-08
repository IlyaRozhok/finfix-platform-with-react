import { UsersService } from "./users.service";
import { User } from "./user.entity";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findById(id: string): Promise<User>;
}
