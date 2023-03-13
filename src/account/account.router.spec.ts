import { getService}  from "../providers/service-provider";
import { Repository, SimpleConsoleLogger } from "typeorm";
import { Account } from "../entity/Account";
import { AccountService } from "./account.service";
import { AccountController } from "./account.controller";
import express from "express";
import { accountRouter } from "../account/account.router";
import request from 'supertest'
import {Express} from 'express-serve-static-core'

jest.mock('../providers/service-provider');

const mockedProvider = jest.mocked(getService);


const router = accountRouter;

let app: Express;
describe('AccountRouter', ( )=> {

    const accountServiceMock: jest.MockedObject<AccountService> = {
        getById: jest.fn(),
    } as unknown as jest.MockedObject<AccountService>;
    
    beforeEach( () => {
        app = express();
        const controller = new AccountController(accountServiceMock);
        app.use('/api/accounts', controller.getRouter());
        jest.clearAllMocks();
    });
    describe('#byId', () => {
        it('gets one by id', async () => {
            const mockAccount: Account = {
                id: 'bogus-id',
                name: 'mock-name',
                balance: 2000,
                balanceType: 'debig'
            };
            accountServiceMock.getById.mockResolvedValueOnce(mockAccount);
            const response = await request(app).get('/api/accounts/bogus-id');
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(mockAccount);
            expect(accountServiceMock.getById).toHaveBeenCalledWith('bogus-id');
        });
    });

});