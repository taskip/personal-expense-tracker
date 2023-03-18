import { AccountController } from "../account/account.controller";
import { AccountService } from "../account/account.service";
import { AuthController } from "../auth/auth.controller";
import { Type } from "../types/type.interface";
import { UserService } from "../user/user.service";
import { getService } from "./service-provider";



export async function getController<T>(c: Type<T>): Promise<T | undefined> {
    switch (typeof c) {
        case typeof AccountController: 
            const service = await getService<AccountService>('AccountService');
            return new AccountController(service) as unknown as T;
        case typeof AuthController: 
            return new AuthController(await getService<UserService>('UserService')) as unknown as T;
        
    }
}