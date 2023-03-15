import "reflect-metadata"
import { DataSource } from "typeorm"

import { Account } from "./entity/Account"
import { Expense } from "./entity/Expense"
import { ExpenseCategorisation } from "./entity/ExpenseCategorisation"
import { ExpenseCategory } from "./entity/ExpenseCategory"
import { ExpenseType } from "./entity/ExpenseType"
import { PaymentMethod } from "./entity/PaymentMethod"
import { User } from "./entity/User"
import { getConfig } from "./providers/config-provider"
import dotenv from "dotenv";

dotenv.config();

//export const  getDatasource = () => {
 export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USERNAME ?? 'postgres',
    password: getConfig('POSTGRES_PASSWORD'),
    database: process.env.POSTGRES_DATABASE ?? 'postgres',
    synchronize: true,
    logging: true,
    entities: [User, Account, PaymentMethod, Expense, ExpenseType, ExpenseCategory, ExpenseCategorisation],
    //entities: ['entity/*.ts'],
    //migrations: ['src/migrations/*.ts'],
    subscribers: [],
    });

