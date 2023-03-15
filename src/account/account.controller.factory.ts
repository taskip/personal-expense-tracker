import { getService } from "../providers/service-provider";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";

export class AccountControllerFactory {
    static async getInstance(): Promise<AccountController> {
        const service = await getService<AccountService>('AccountService');
        return new AccountController(service);
    }
}