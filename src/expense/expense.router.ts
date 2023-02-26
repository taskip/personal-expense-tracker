import express, { Request, Response } from "express";
import { Expense } from "../entity/Expense";
import { getService } from "../providers/service-provider";
import { AddExpense } from "./add-expense.type";
import { ExpenseService } from "./expense.service";

export const expenseRouter = express.Router();

expenseRouter.get('/',async (req: Request, res: Response) => {
    try {
        const expenseService = await getService<ExpenseService>('ExpenseService');
        const expenseTypes = await expenseService.getAll();
        res.status(200).send(expenseTypes);
    } catch (e) {
        console.log(e);
        res.status(500).send('ERROR: failed loading expense types');  
    }
});

expenseRouter.post('/',async (req: Request, res: Response) => {
    try {
        const expenseService = await getService<ExpenseService>('ExpenseService');
        const body = req.body;
        const expense = await expenseService.addExpense(body as AddExpense);
        res.status(200).send(expense);
    } catch (e) {
        console.log(e);
        res.status(500).send('ERROR: failed loading expense types');  
    }
});

expenseRouter.delete('/:id',async (req: Request, res: Response) => {
    try {
        const expenseService = await getService<ExpenseService>('ExpenseService');
        const result = await expenseService.remove(req.params.id);
        res.status(200).send(result);
    } catch (e) {
        console.log(e);
        res.status(500).send('ERROR: failed loading expense types');  
    }
});


expenseRouter.patch('/:id',async (req: Request, res: Response) => {
    try {
        const expenseService = await getService<ExpenseService>('ExpenseService');
        const body = req.body;

        const result = await expenseService.update(req.body as Expense);
        res.status(200).send(result);
    } catch (e) {
        console.log(e);
        res.status(500).send('ERROR: failed loading expense types');  
    }
});
