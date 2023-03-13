import express, { Request, Response, Router } from "express";
import { getService } from "../providers/service-provider";
import { Controller } from "../types/controller.base";
import { Express } from "express";

import { AccountService } from "./account.service";
import { AddAccount } from "./addaccount.type";

export class AccountController {
    private router: Router;
    private path: string;
    //private accountService: AccountService;

    constructor(
      private readonly accountService: AccountService  
    ) {
        this.router = express.Router();
        this.getAccounts = this.getAccounts.bind(this);
        this.getAccountById = this.getAccountById.bind(this);
        this.path = '/api/accounts';
        //this.initService();
        this.initRoutes();
    }

    static async setup(app: Express): Promise<Express> {
        const service = await getService<AccountService>('AccountService');
        const controller = new AccountController(service);
        return app.use(controller.getPath(), controller.getRouter());
    }

    private initRoutes(): void  {
        this.router.get('/', this.getAccounts);
        this.router.get('/:id', this.getAccountById);
        this.router.post('/', this.saveAccount);
        this.router.delete('/:id', this.deleteAccount);
    }

    public getPath(): string {
        return this.path;
    }

    public getRouter(): Router {
        return this.router;
    }

    async getAccounts(req: Request, res: Response): Promise<void> {
        try {
            const accounts = await this.accountService.getAll();
            res.status(200).send(accounts);
        } catch (e) {
            console.log(e);
            res.status(500).send('ERROR');
        }
    }

    async getAccountById(req: Request, res: Response): Promise<void> {
        try {
            const account = await this.accountService.getById(req.params.id);
            res.status(200).send(account);
        } catch (e) {
            console.log(e);
            res.status(500).send('ERROR');
        }
    
    }

    async saveAccount(req: Request, res: Response): Promise<void> {
        try {
            const body = req.body;
            delete body.id;
            const account = await this.accountService.save(body as AddAccount);
            res.status(200).send(account);
    
        }catch (e) {
            console.log(e);
            res.status(500).send('ERROR IN SAVE');
        }
    }    

    async deleteAccount(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.accountService.remove(req.params.id);
            res.status(200).send(result);
    
        } catch (e) {
            console.log(e);
            res.status(500).send(JSON.stringify({error: 'Error removing account'}));
        }
    }
}