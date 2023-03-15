import { AccountController } from "../account/account.controller";
import { ExpenseController } from "../expense/expense.controller";

export const serverConfig = {
    controllers: [AccountController, ExpenseController]
}