import { AccountController } from "../account/account.controller";
import { AuthController } from "../auth/auth.controller";
import { ExpenseTypeController } from "../expense-type/expense-type.controller";
import { ExpenseController } from "../expense/expense.controller";
import { PaymentMethodController } from "../payment-method/payment-method.controller";

export const serverConfig = {
    controllers: [
        AuthController,
        AccountController,
        ExpenseController,
        ExpenseTypeController,
        PaymentMethodController,
    ]
}