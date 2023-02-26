import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Expense } from "./Expense";
import { ExpenseCategory } from "./ExpenseCategory";

@Entity()
export class ExpenseCategorisation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Expense, (expense) => expense.expenseCategorisations)
    expense: Expense;

    @ManyToOne(() => ExpenseCategory, (category) => category.expenseCategorisations)
    category: ExpenseCategory;
}