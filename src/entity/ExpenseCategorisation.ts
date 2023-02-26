import { Entity, Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Expense } from "./Expense";
import { ExpenseCategory } from "./ExpenseCategory";

@Entity()
export class ExpenseCategorisation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    amount: number;

    @Column()
    isPrimary: boolean;

    @ManyToOne(() => Expense, (expense) => expense.expenseCategorisations)
    expense: Expense;

    @ManyToOne(() => ExpenseCategory, (category) => category.expenseCategorisations)
    category: ExpenseCategory;
}