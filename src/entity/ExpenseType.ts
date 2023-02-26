import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Expense } from "./Expense";

@Entity()
export class ExpenseType {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Expense, (expense) => expense.paymentMethod)
    expenses: Expense[];
}