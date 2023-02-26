import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ExpenseCategorisation } from "./ExpenseCategorisation";
import { ExpenseType } from "./ExpenseType";
import {PaymentMethod} from "./PaymentMethod"

@Entity()
export class Expense {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    when: number;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    sum: number;

    @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.expenses)
    paymentMethod: PaymentMethod;

    @ManyToOne(() => ExpenseType, (expenseType) => expenseType.expenses)
    expenseType: ExpenseType;

    @OneToMany(() => ExpenseCategorisation, (expenseCategorisations) => expenseCategorisations.expense )
    expenseCategorisations: ExpenseCategorisation[];
    
    @Column()
    where?: string;

}