import express, { Express, Request, Response, Router } from "express";
import { AppDataSource } from "./data-source-migrations";
import cors from "cors";
import dotenv from "dotenv";
import { sessionCheck } from "./middleware/session-check";
import { SessionUser } from "./types/session-user.interface";
import session from 'express-session';
import connectRedis from "connect-redis"
import { client}  from "./services/cache.service"
import { ExpenseController } from "./expense/expense.controller";
import { AccountController } from "./account/account.controller";
import { ControllerBase } from "./types/controller.base";
import { serverConfig } from "./config/server.config";

declare module "express-session" {
    interface SessionData {
      user: SessionUser;
      
    }
  }
  
  dotenv.config();

export class Server {
    private app: Express;
    private router: Router;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        let RedisStore = connectRedis(session);
        this.app.use(session({
          store: new RedisStore({ client: client }),
          secret: 'huhhuh',
          saveUninitialized: false,
          resave: false,
    
        }))
        this.app.use(cors({
          origin: 'http://localhost:5173',
          credentials: true
        }));
        this.app.use(sessionCheck);
        this.defaultHanler = this.defaultHanler.bind(this);
        this.initDefaultRouter();
    }

    async initialize(): Promise<void> {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
      }
    }

    async defaultHanler(req: Request, res: Response): Promise<void> {
      res.status(404).send('Not found');
    }
    
    initDefaultRouter(): void {
      this.router = express.Router();
      this.router.all('/', this.defaultHanler);
    }

    async initRoutes(): Promise<void> {
        console.log('Initializing routes/controllers  ..');
        //todo: separate controller-initialization ?
        for (let controlleClass of serverConfig.controllers) {
          const controller = await controlleClass.factory();
          console.log(`Adding contoller [ ${controller.constructor.name} ] -> ${controller.getPath()}`);
          this.app.use(controller.getPath(), controller.getRouter());
        }
    }

    async init(): Promise<void> {
        console.log('Initializing basics..');
        await this.initialize().then( async () => {
          console.log('Initializing routes..');
          await this.initRoutes();
      });
      console.log('init done');
      return;
    }

    run(): void {
        const PORT: number = parseInt(process.env.PORT as string, 10);
        this.app.listen(PORT, () => {
        console.log(`Server istening on port ${PORT}`);
        });
    }
}