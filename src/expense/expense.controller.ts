import express, { Request, Response, Router } from "express";
import { Expense } from "../entity/Expense";
import { getService } from "../providers/service-provider";

import { ControllerBase } from "../types/controller.base";
import { AddExpense } from "./add-expense.type";
import { ExpenseService } from "./expense.service";

export class ExpenseController extends ControllerBase {
    private router: Router;
    
    constructor(
        private readonly expenseService: ExpenseService
    ) {
        super('ExpenseController', '/api/expenses');
        this.router = express.Router();
        this.initRoutes();

    }
    getRouter(): Router {
        return this.router;
    }
    getPath(): string {
        return this.path;
    }

    static async factory(): Promise<ExpenseController> {
        const service = await getService<ExpenseService>('ExpenseService');
        return new ExpenseController(service);
    }

    private initRoutes(): void {
        this.router.get('/', (req: Request, res: Response) => this.getExpenses(req, res));
        this.router.post('/', (req: Request, res: Response) => this.addExpense(req, res));
        this.router.patch('/:id', (req: Request, res: Response) => this.updateExpense(req, res));
        this.router.delete('/:id', (req: Request, res: Response) => this.deleteExpense(req, res));
    }

    async getExpenses(req: Request, res: Response): Promise<void> {
        try {
            const expenses = await this.expenseService.getAll();
            res.status(200).send(expenses);
        } catch (e) {
            console.log(e);
            res.status(500).send('ERROR: failed loading expense types');  
        }
    }

    async addExpense(req: Request, res: Response): Promise<void> {
        try {
            const body = req.body;
            const expense = await this.expenseService.addExpense(body as AddExpense);
            res.status(200).send(expense);
        } catch (e) {
            console.log(e);
            res.status(500).send('ERROR: failed loading expense types');  
        }
    }

    async updateExpense(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.expenseService.remove(req.params.id);
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
            res.status(500).send('ERROR: failed loading expense types');  
        }   
    }

    async deleteExpense(req: Request, res: Response): Promise<void> {
        try {
            const body = req.body;
            const result = await this.expenseService.update(req.body as Expense);
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
            res.status(500).send('ERROR: failed loading expense types');  
        }    
    }

}