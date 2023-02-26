import { DeleteResult, Repository } from "typeorm";
import { Account } from "../entity/Account";
import { AddAccount } from "./addaccount.type";

export class AccountService {
    constructor(
        private readonly accountRepository: Repository<Account>
    ){};

    async getById(id: string): Promise<Account> {
        return this.accountRepository.findOneOrFail({where: {id: id}});
    }
    async getAll(): Promise<Account[]> {
        return this.accountRepository.find();
    }

    async save(account: AddAccount): Promise<Account> {
        const newAccount = Object.assign(this.accountRepository.create(), account);
        
        return await this.accountRepository.save(newAccount);
    }

    async remove(id: string): Promise<DeleteResult> {
        return await this.accountRepository.delete(id);
    }
}