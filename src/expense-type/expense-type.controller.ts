import express, { Request, Response, Router } from "express";
import { ExpenseType } from "../entity/ExpenseType";
import { getService } from "../providers/service-provider";
import { ControllerBase } from "../types/controller.base";
import { AddExpenseType } from "./addexpensetype.type";
import { ExpenseTypeService } from "./expense-type.service";


export class ExpenseTypeController extends ControllerBase {
    private router: Router;

    constructor(
        private readonly expenseTypeService: ExpenseTypeService
    ) {
        super('ExpenseTypeController', '/api/expense-types');
        this.router = express.Router();
        this.initRoutes();
    }
    getRouter(): Router {
        return this.router;
    }
    getPath(): string {
        return this.path;
    }

    static async factory(): Promise<ExpenseTypeController> {
        const service = await getService<ExpenseTypeService>(ExpenseTypeService.getServiceName());
        return new ExpenseTypeController(service);
    }

    private initRoutes(): void {
        this.router.get('/', (req: Request, res: Response) => this.getExpenseTypes(req, res));
        this.router.get('/:id', (req: Request, res: Response) => this.getExpenseType(req, res));
        this.router.post('/', (req: Request, res: Response) => this.addExpenseType(req, res));
        this.router.patch('/:id', (req: Request, res: Response) => this.updateExpenseType(req, res));
        this.router.delete('/:id', (req: Request, res: Response) => this.deleteExpenseType(req, res));

    }
    async getExpenseTypes(req: Request, res: Response): Promise<void> {
        try {
        const expenseTypes = await this.expenseTypeService.getAll();
        res.status(200).send(expenseTypes);
    } catch (e) {
        console.log(e);
        res.status(500).send('ERROR: failed loading expense types');  
    }
    }

    async getExpenseType(req: Request, res: Response): Promise<void> {
        try {
        const expenseType = await this.expenseTypeService.getById(req.params.id);
        res.status(200).send(expenseType);
    } catch (e) {
        console.log(e);
        res.status(500).send('ERROR: failed loading expense type');  
    }
    }

    async addExpenseType(req: Request, res: Response): Promise<void> {
        try {
            const body = req.body;
            const expenseTypes = await this.expenseTypeService.save(body as AddExpenseType);
            res.status(200).send(expenseTypes);
        } catch (e) {
            console.log(e);
            res.status(500).send('ERROR: failed loading expense types');  
        }
    
    }
    async deleteExpenseType(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.expenseTypeService.remove(req.params.id);
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
            res.status(500).send('ERROR: failed loading expense types');  
        }
    }
    async updateExpenseType(req: Request, res: Response): Promise<void> {
        try {
            const body = req.body;
            const result = await this.expenseTypeService.update(req.body as ExpenseType);
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
            res.status(500).send('ERROR: failed loading expense types');  
        }
    }
    
    /*
    async xxExpenseType(req: Request, res: Response): Promise<void> {
    }
    */

}
