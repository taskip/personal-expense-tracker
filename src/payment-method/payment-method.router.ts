import { PaymentMethodService } from "./payment-method.service";
import express, { Request, Response } from "express";
import { getService } from "../providers/service-provider";
import { AddPaymentMethod } from "./add-payment-method.type";
import { PaymentMethod } from "../entity/PaymentMethod";

export const paymentMethodRouter = express.Router();

paymentMethodRouter.get('/',async (req: Request, res: Response) => {
    try {
        const paymentMethodService = await getService<PaymentMethodService>('PaymentMethodService');
        const expenseTypes = await paymentMethodService.getAll();
        res.status(200).send(expenseTypes);
    } catch (e) {
        console.log(e);
        res.status(500).send('ERROR: failed loading expense types');  
    }
});

paymentMethodRouter.post('/',async (req: Request, res: Response) => {
    try {
        const paymentMethodService = await getService<PaymentMethodService>('PaymentMethodService');
        const body = req.body;
        const expenseTypes = await paymentMethodService.save(body as AddPaymentMethod);
        res.status(200).send(expenseTypes);
    } catch (e) {
        console.log(e);
        res.status(500).send('ERROR: failed loading expense types');  
    }
});

paymentMethodRouter.delete('/:id',async (req: Request, res: Response) => {
    try {
        const paymentMethodService = await getService<PaymentMethodService>('PaymentMethodService');
        const result = await paymentMethodService.remove(req.params.id);
        res.status(200).send(result);
    } catch (e) {
        console.log(e);
        res.status(500).send('ERROR: failed loading expense types');  
    }
});


paymentMethodRouter.patch('/:id',async (req: Request, res: Response) => {
    try {
        const paymentMethodService = await getService<PaymentMethodService>('PaymentMethodService');
        const body = req.body;

        const result = await paymentMethodService.update(req.body as PaymentMethod);
        res.status(200).send(result);
    } catch (e) {
        console.log(e);
        res.status(500).send('ERROR: failed loading expense types');  
    }
});

