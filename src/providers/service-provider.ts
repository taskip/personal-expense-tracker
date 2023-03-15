import { AccountService } from "../account/account.service";
import { Account } from "../entity/Account";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { UserService } from "../user/user.service";
import { ExpenseTypeService } from "../expense-type/expense-type.service";
import { ExpenseType } from "../entity/ExpenseType";
import { PaymentMethodService } from "../payment-method/payment-method.service";
import { PaymentMethod } from "../entity/PaymentMethod";
import { ExpenseService } from "../expense/expense.service";

export async function getService<T>(name: string): Promise<T> {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    
    switch (name) {
        case 'AccountService':
            return new AccountService(AppDataSource.getRepository(Account)) as unknown as T;
        case 'UserService':
            return new UserService(AppDataSource.getRepository(User)) as unknown as T;
        case 'ExpenseTypeService':
            return new ExpenseTypeService(AppDataSource.getRepository(ExpenseType)) as unknown as T;
        case 'PaymentMethodService':
            return new PaymentMethodService(AppDataSource.getRepository(PaymentMethod)) as unknown as T;
        case 'ExpenseService':
            return new ExpenseService(AppDataSource) as unknown as T;

    }
    throw new Error(`Service not defined: ${name}`);
}