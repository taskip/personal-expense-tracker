
import express, { Request, Response } from "express";
import { getService } from "../providers/service-provider";
import { UserService } from "./user.service";

export const userRouter = express.Router();

userRouter.post('/add', async (req: Request, res: Response) => {
    try {
        const email = req.body?.email ?? undefined;
        const pw = req.body?.passwd ?? undefined;
        if (!pw && !email) {
            console.log('ERROR : No data !');
            res.status(400).send('Missing data');
        }
        const userService = await getService<UserService>('UserService');
        const user = await userService.addUser(email, pw);
        res.status(200).send({message: 'user created'});
    } catch (e) {
        res.status(500).send('error');
    }
});
