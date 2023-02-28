import { Repository } from "typeorm";
import { Account } from "../entity/Account";
import { AccountService } from "./account.service";

const accountRepositoryMock: jest.MockedObject<Repository<Account>> = {
    find: jest.fn(),
    create: jest.fn(),
    findOneOrFail: jest.fn(),
} as unknown as jest.MockedObject<Repository<Account>>;


describe('AccountService', () => {
    let service: AccountService;
    beforeEach(() => {
        jest.clearAllMocks();
        service = new AccountService(accountRepositoryMock);

    })
    describe('#getAll', () => {
        it('Loads a list', async () => {
            const mockAccount: Account = {
                id: 'bogus-id',
                name: 'mock-name',
                balance: 2000,
                balanceType: 'debig'
            };
            accountRepositoryMock.find.mockResolvedValueOnce([
                mockAccount
            ]);
            expect(await service.getAll()).toEqual([mockAccount]);
            expect(accountRepositoryMock.find).toBeCalled;
        });
    });
    describe('#getById', () => {
        it('Returns correctly if id found', async () => {
            const mockAccount: Account = {
                id: 'bogus-id',
                name: 'mock-name',
                balance: 2000,
                balanceType: 'debig'
            };
            accountRepositoryMock.findOneOrFail.mockResolvedValueOnce(
                mockAccount
            );
            expect(await service.getById('bogus-id')).toEqual(mockAccount);
            expect(accountRepositoryMock.findOneOrFail).toHaveBeenCalledWith({where: {id: 'bogus-id'}});
        });
    });
});