import { getService}  from "../providers/service-provider";
import { Repository, SimpleConsoleLogger } from "typeorm";
import { Account } from "../entity/Account";
import { AccountService } from "./account.service";
import express from "express";
import { accountRouter } from "../account/account.router";
import request from 'supertest'
import {Express} from 'express-serve-static-core'

jest.mock('../providers/service-provider');

const mockedProvider = jest.mocked(getService);

const accountServiceMock: jest.MockedObject<AccountService> = {
    getById: jest.fn(),
} as unknown as jest.MockedObject<AccountService>;

const router = accountRouter;

let app: Express;
describe('AccountRouter', ( )=> {

    beforeEach( () => {
        app = express();
        app.use('/api/accounts', router);
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
            mockedProvider.mockImplementation(async () => Promise.resolve(accountServiceMock));
            accountServiceMock.getById.mockResolvedValueOnce(mockAccount);
            const response = await request(app).get('/api/accounts/asdfasdf');
            expect(response.status).toEqual(200);
            expect(response.body).toEqual(mockAccount);
        });
    });

});