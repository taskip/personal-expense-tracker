import { getService } from "../providers/service-provider";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";

export class AccountControllerFactory {
    static getInstance(): AccountController {
        const service = getService<AccountService>('AccountService');
        return new AccountController(service);
    }
}