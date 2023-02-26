import { Expense } from "../entity/Expense";

export type AddExpense = Omit<Expense, 'id'>;