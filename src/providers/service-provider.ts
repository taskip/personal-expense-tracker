import { AccountService } from "../account/account.service";
import { Account } from "../entity/Account";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { UserService } from "../user/user.service";
import { ExpenseTypeService } from "../expense-type/expense-type.service";
import { ExpenseType } from "../entity/ExpenseType";

export async function getService<T>(name: string): Promise<T> {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    
    switch (name) {
        case 'AccountService':
            return new AccountService(AppDataSource.getRepository(Account)) as unknown as T;
            break;
        case 'UserService':
            return new UserService(AppDataSource.getRepository(User)) as unknown as T;
            break;
        case 'ExpenseTypeService':
            return new ExpenseTypeService(AppDataSource.getRepository(ExpenseType)) as unknown as T;
            break;

    }
    throw new Error('Service not defined: ' + name);
}