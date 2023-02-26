import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { ExpenseType } from "../entity/ExpenseType";
import { AddExpenseType } from "./addexpensetype.type";

export class ExpenseTypeService {
    constructor(
        private readonly expenseTypeRepository: Repository<ExpenseType>
    ){};

    async getById(id: string): Promise<ExpenseType> {
        return this.expenseTypeRepository.findOneOrFail({where: {id: id}});
    }

    async getAll(): Promise<ExpenseType[]> {
        return this.expenseTypeRepository.find();
    }

    async save(expenseType: AddExpenseType): Promise<ExpenseType> {
        const newExpenseType = Object.assign(this.expenseTypeRepository.create(), expenseType);
        return await this.expenseTypeRepository.save(newExpenseType);
    }

    async update(updatedType: ExpenseType): Promise<ExpenseType | undefined> {
        const current = await this.expenseTypeRepository.findOneOrFail({where: {id: updatedType.id}});
        if (!current) {
            return undefined;
        }
        current.name = updatedType.name;
        return await this.expenseTypeRepository.save(current);
    }

    async remove(id: string): Promise<DeleteResult> {
        return await this.expenseTypeRepository.delete(id);
    }
}