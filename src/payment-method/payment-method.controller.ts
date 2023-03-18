import express, { Request, Response, Router } from "express";
import { PaymentMethod } from "../entity/PaymentMethod";
import { getService } from "../providers/service-provider";
import { ControllerBase } from "../types/controller.base";
import { AddPaymentMethod } from "./add-payment-method.type";
import { PaymentMethodService } from "./payment-method.service";

export class PaymentMethodController extends ControllerBase {
    private router: Router;

    constructor(
        private readonly paymentMethodService: PaymentMethodService
    ) {
        super('PaymentMethodController', '/api/payment-methods');
        this.router = express.Router();
        this.initRoutes();
    }

    static async factory(): Promise<PaymentMethodController> {
        const service = await getService<PaymentMethodService>('PaymentMethodService')
        if (!service) {
            throw new Error('PaymentMethodService not awailable!');
        }
        return new PaymentMethodController(service);
    }


    getRouter(): Router {
        return this.router;
    }
    getPath(): string {
        return this.path;
    }

    private initRoutes(): void  {
        this.router.get('/', (req: Request, res: Response) => this.getAll(req, res));
        this.router.get('/:id', (req: Request, res: Response) => this.getById(req, res));
        this.router.post('/', (req: Request, res: Response) => this.add(req, res));
        this.router.patch('/:id', (req: Request, res: Response) =>  this.update(req, res));
        this.router.delete('/:id', (req: Request, res: Response) =>  this.delete(req, res));
    }


    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const paymentMethods = await this.paymentMethodService.getAll();
            res.status(200).send(paymentMethods);
        } catch (e) {
            console.log(e);
            res.status(500).send('ERROR: failed loading expense types');  
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const paymentMethods = await this.paymentMethodService.getById(req.params.id);
            res.status(200).send(paymentMethods);
        } catch (e) {
            console.log(e);
            res.status(500).send('ERROR: failed loading expense types');  
        }
    }
    async add(req: Request, res: Response): Promise<void> {
        try {
            const body = req.body;
            const expenseTypes = await this.paymentMethodService.save(body as AddPaymentMethod);
            res.status(200).send(expenseTypes);
        } catch (e) {
            console.log(e);
            res.status(500).send('ERROR: failed loading expense types');  
        }    
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.paymentMethodService.remove(req.params.id);
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
            res.status(500).send('ERROR: failed loading expense types');  
        }
    }
    async update(req: Request, res: Response): Promise<void> {
        try {
            const body = req.body;
            const result = await this.paymentMethodService.update(req.body as PaymentMethod);
            res.status(200).send(result);
        } catch (e) {
            console.log(e);
            res.status(500).send('ERROR: failed loading expense types');  
        }   
    }

}