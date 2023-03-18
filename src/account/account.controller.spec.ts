import { Account } from "../entity/Account";
import { getService}  from "../providers/service-provider";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import request from 'supertest'
import express, { Request, Response } from "express";
import {Express} from 'express-serve-static-core'


jest.mock('../providers/service-provider');

const mockedProvider = jest.mocked(getService);
let app: Express;
describe('AccountController, factory', () => {

    const accountServiceMock: jest.MockedObject<AccountService> = {
        getById: jest.fn(),
    } as unknown as jest.MockedObject<AccountService>;

    beforeEach(() => {
        jest.clearAllMocks();
    })
    it('Makes proper instance', async () => {
        mockedProvider.mockResolvedValueOnce(accountServiceMock);
        const instance = await AccountController.factory();
        expect(instance).toBeInstanceOf(AccountController);
    });
    //fixme: cant seem to get exception checkgin working..
    /*
    it('Fails if service not available', async () => {
        mockedProvider.mockResolvedValueOnce(undefined);
        async function getInstance() {
            await AccountController.factory();
        }
        expect(
            await getInstance
        ).toThrow("AccountService not available!");
    });
    */
});

describe('AccountController, router', () => {
    let controller: AccountController;
    
    const accountServiceMock: jest.MockedObject<AccountService> = {
        getById: jest.fn(),
    } as unknown as jest.MockedObject<AccountService>;
    

    beforeEach(async () => {
        controller = new AccountController(accountServiceMock);
        app = express();
        app.use(controller.getPath(), controller.getRouter());
        jest.clearAllMocks();

    }) ;

    describe('Test trough router', () => {
        it('Loads account by id', async () => {
            const mockAccount: Account =  {
                    id: 'mock-id',
                    name: 'mock-account',
                    balance: 100,
                    limit: 10,
                    balanceType: 'debit'                    
                }; 
            accountServiceMock.getById.mockResolvedValueOnce(mockAccount);
            const response = await request(app).get('/api/accounts/bogus-id');
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(mockAccount);
            expect(accountServiceMock.getById).toHaveBeenCalledWith('bogus-id');

        })
    })
})
describe('AccountController, methods', () => {
    let controller: AccountController;
    
    const accountServiceMock: jest.MockedObject<AccountService> = {
        getById: jest.fn(),
    } as unknown as jest.MockedObject<AccountService>;
    
    const responseMock: jest.MockedObject<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    } as unknown as jest.MockedObject<Response>;

    beforeEach(async () => {
        controller = new AccountController(accountServiceMock);
        jest.clearAllMocks();
    }) ;

    describe('Test methods only', () => {
        it('Loads account by id', async () => {
            const mockAccount: Account =  {
                    id: 'mock-id',
                    name: 'mock-account',
                    balance: 100,
                    limit: 10,
                    balanceType: 'debit'                    
                }; 
            accountServiceMock.getById.mockResolvedValueOnce(mockAccount);
            const requestMock = {
                params: {
                    id: 'mock-id',
                }
            } as unknown as Request;
            await controller.getAccountById(requestMock, responseMock);
            expect(responseMock.status).toBeCalledWith(200);
            expect(responseMock.send).toBeCalledWith(mockAccount);

        });
    })
})