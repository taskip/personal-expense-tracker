import express, { Request, Response } from "express";
import { getService } from "../providers/service-provider";
import { AccountService } from "./account.service";
import { AddAccount } from "./addaccount.type";


export const accountRouter = express.Router();




accountRouter.get('/', async (req: Request, res: Response) => {
    try {
        console.log('Get all accounts');
        const accountService = await getService<AccountService>('AccountService');
        const accounts = await accountService.getAll();
        //const accounts = await AppDataSource.manager.find(Account);
        console.log(accounts);
        res.status(200).send(accounts);

    } catch (e) {
        console.log(e);
        res.status(500).send('ERROR');
    }
});
accountRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const accountService = await getService<AccountService>('AccountService');
        console.log('Lookinf for account ' + req.params.id);
        const account = await accountService.getById(req.params.id);
        res.status(200).send(account);
    } catch (e) {
        console.log(e);
        res.status(500).send('ERROR');
    }
});

accountRouter.post('/', async (req: Request, res: Response) => {
    try {
        const accountService = await getService<AccountService>('AccountService');
        console.log('Saviong new account')
        console.log(req.body);
        const body = req.body;
        delete body.id;
        const account = await accountService.save(body as AddAccount);
        res.status(200).send(account);

    }catch (e) {
        console.log(e);
        res.status(500).send('ERROR IN SAVE');
    }
})

accountRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const accountService = await getService<AccountService>('AccountService');
        console.log('Delete account')
        const result = await accountService.remove(req.params.id);
        res.status(200).send(result);

    }catch (e) {
        console.log(e);
        res.status(500).send(JSON.stringify({error: 'Error removing account'}));
    }
})