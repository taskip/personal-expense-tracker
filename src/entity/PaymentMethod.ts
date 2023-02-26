import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./Account";
import { Expense } from "./Expense";

@Entity()
export class PaymentMethod {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    type: string;
    
    @Column()
    description: string;

    @OneToOne(() => Account, {nullable: true})
    @JoinColumn()
    account?: Account;

    @OneToMany(() => Expense, (expense) => expense.paymentMethod)
    expenses: Expense[];
}