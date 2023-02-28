
import express, { Express, Request, Response } from 'express';
import { ReadableStreamDefaultController } from 'stream/web';
import { User } from '../entity/User';
import { getService } from '../providers/service-provider';
import { UserService } from '../user/user.service';

const authController = express.Router();

authController.post('/login', async (req, res) => {
    let authuser: User | undefined;
    let authOk = false;
    try {
        const userService = await getService<UserService>('UserService');
        const username = req.body?.username ?? undefined;
        const password = req.body?.password ?? undefined;
        if (!username || !password) {
            console.log('User or pw missing!');
        }
        const user = await userService.verifyUser(username, password);
        if (user) {
            console.log('User auth ok, setting to session..');
            req.session.user = 
            {
                id: user.id,
                username: user.email,
                authenticated: true
            }
            authuser = user;
            authOk = true;
        }
        
    } catch (e) {
        console.log(e);
        console.log('auth-error');
    }
    if (!authuser) {
        res.status(401).send('auth failed');
    } else {
        res.status(200).send({username: authuser.email, id: authuser.id});
    }
});

export default authController;
