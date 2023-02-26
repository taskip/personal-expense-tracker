import express, { Request, Response } from "express";
import { ExpenseType } from "../entity/ExpenseType";
import { getService } from "../providers/service-provider";
import { AddExpenseType } from "./addexpensetype.type";
import { ExpenseTypeService } from "./expense-type.service";

export const expenseTypeRouter = express.Router();

 expenseTypeRouter.get('/',async (req: Request, res: Response) => {
    try {
        const expenseTypeService = await getService<ExpenseTypeService>('ExpenseTypeService');
        const expenseTypes = await expenseTypeService.getAll();
        res.status(200).send(expenseTypes);
    } catch (e) {
        console.log(e);
        res.status(500).send('ERROR: failed loading expense types');  
    }
});

expenseTypeRouter.post('/',async (req: Request, res: Response) => {
    try {
        const expenseTypeService = await getService<ExpenseTypeService>('ExpenseTypeService');
        const body = req.body;
        const expenseTypes = await expenseTypeService.save(body as AddExpenseType);
        res.status(200).send(expenseTypes);
    } catch (e) {
        console.log(e);
        res.status(500).send('ERROR: failed loading expense types');  
    }
});

expenseTypeRouter.delete('/:id',async (req: Request, res: Response) => {
    try {
        const expenseTypeService = await getService<ExpenseTypeService>('ExpenseTypeService');
        const result = await expenseTypeService.remove(req.params.id);
        res.status(200).send(result);
    } catch (e) {
        console.log(e);
        res.status(500).send('ERROR: failed loading expense types');  
    }
});


expenseTypeRouter.patch('/:id',async (req: Request, res: Response) => {
    try {
        const expenseTypeService = await getService<ExpenseTypeService>('ExpenseTypeService');
        const body = req.body;

        const result = await expenseTypeService.update(req.body as ExpenseType);
        res.status(200).send(result);
    } catch (e) {
        console.log(e);
        res.status(500).send('ERROR: failed loading expense types');  
    }
});

