import express, { Request, Response, Router } from "express";
import { getService } from "../providers/service-provider";
import { ControllerBase } from "../types/controller.base";
import { Express } from "express";

import { AccountService } from "./account.service";
import { AddAccount } from "./addaccount.type";

export class AccountController extends ControllerBase {
    private router: Router;
    //private accountService: AccountService;

    constructor(
      private readonly accountService: AccountService  
    ) {
        super('AccountController', '/api/accounts');
        this.router = express.Router();
        this.initRoutes();
    }


    static async factory(): Promise<AccountController> {
        const service = await getService<AccountService>('AccountService');
        if (!service) {
            throw new Error('AccountService not available!');
        }
        return new AccountController(service);
    }
    
    private initRoutes(): void  {
        this.router.get('/', (req: Request, res: Response) => this.getAccounts(req, res));
        this.router.get('/:id', (req: Request, res: Response) => this.getAccountById(req, res));
        this.router.post('/', (req: Request, res: Response) => this.saveAccount(req, res));
        this.router.delete('/:id', (req: Request, res: Response) =>  this.deleteAccount(req, res));
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
            body.id = undefined;
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