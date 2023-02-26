import { ExpenseType } from "../entity/ExpenseType";

export type AddExpenseType = Omit<ExpenseType, 'id'>;