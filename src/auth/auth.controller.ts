
import express, { Request, Response, Router } from "express";
import { ReadableStreamDefaultController } from 'stream/web';
import { threadId } from "worker_threads";
import { User } from '../entity/User';
import { getService } from '../providers/service-provider';
import { UserService } from '../user/user.service';



export class AuthController {
    private router: Router;
    private path: string;   

    constructor(
        private readonly userService: UserService
    ) {
        this.router = express.Router();
        this.login = this.login.bind(this);
        this.path = '/api/auth';
        this.initRoutes();
        console.log('AuthController building up ..');
    }
    

    static async factory(): Promise<AuthController> {
        const userService = await getService<UserService>('UserService');
        return new AuthController(userService);
    }

    private initRoutes(): void  {
        this.router.post('/login', this.login);
    }

    public getRouter(): Router {
        return this.router;
    }

    public getPath(): string {
        return this.path;
    }

    async login(req: Request, res: Response): Promise<void> {
        let authuser: User | undefined;
        let authOk = false;
        try {
            const username = req.body?.username ?? undefined;
            const password = req.body?.password ?? undefined;
            if (!(username && password)) {
                console.log('User or pw missing!');
            }
            const user = await this.userService.verifyUser(username, password);
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
            } else {
                console.log('User-verify failed..');
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
    
    }
}

