import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ExpenseCategorisation } from "./ExpenseCategorisation";

@Entity()
export class ExpenseCategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    name: string;

    @OneToMany(() => ExpenseCategorisation, (expenseCategorisations) => expenseCategorisations.category )
    expenseCategorisations: ExpenseCategorisation[];

}