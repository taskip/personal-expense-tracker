import exp from "constants";
import { DataSource, Repository, DeleteResult } from "typeorm";
import { Account } from "../entity/Account";
import { Expense } from "../entity/Expense";
import { PaymentMethod } from "../entity/PaymentMethod";
import { AddExpense } from "./add-expense.type";


export class ExpenseService {
    private expenseRepository: Repository<Expense>;
    private accountRepository: Repository<Account>;
    private paymentMethodRepository: Repository<PaymentMethod>;

    /** taking datasource here to have access to multiple repositories */
    constructor(
        private readonly dataSrouce: DataSource,
    ) {
        this.expenseRepository = this.dataSrouce.getRepository(Expense);
        this.accountRepository = this.dataSrouce.getRepository(Account);
        this.paymentMethodRepository = this.dataSrouce.getRepository(PaymentMethod);
    }

    async getById(id: string): Promise<Expense> {
        return this.expenseRepository.findOneOrFail({where: {id: id}});
    }

    async getAll(): Promise<Expense[]> {
        return this.expenseRepository.find();
    }

    async addExpense(expense: AddExpense): Promise<Expense> {
        const newExpense = Object.assign(this.expenseRepository.create(), expense);
        const savedExpense = await this.expenseRepository.save(newExpense);
        if (expense.paymentMethod) {
            // need to load it with account
            const paymentMethod = await this.paymentMethodRepository.findOne({
                where: {
                    id: expense.paymentMethod.id
                },
                relations: ['account']
            });
            if (paymentMethod && paymentMethod.account) {
                //reduce the balance from account by expense-sum.
                paymentMethod.account.balance -= expense.sum;
                const updatedAccount = this.accountRepository.save(paymentMethod.account);
            } 
        }
        return savedExpense;
    }
    async save(expense: AddExpense): Promise<Expense> {
        const newExpense = Object.assign(this.expenseRepository.create(), expense);
        return await this.expenseRepository.save(newExpense);
    }

    async update(updatedType: Expense): Promise<Expense | undefined> {
        const current = await this.expenseRepository.findOneOrFail({where: {id: updatedType.id}});
        if (!current) {
            return undefined;
        }
        current.sum = updatedType.sum;
        if (updatedType.where) {
            current.where = updatedType.where;
        }

        return await this.expenseRepository.save(current);
    }

    async remove(id: string): Promise<DeleteResult> {
        return await this.expenseRepository.delete(id);
    }
}