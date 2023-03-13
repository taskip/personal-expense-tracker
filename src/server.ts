import express, { Express } from "express";
import { AccountController } from "./account/account.controller";
import { AppDataSource } from "./data-source-migrations";
import cors from "cors";
import dotenv from "dotenv";
import { sessionCheck } from "./middleware/session-check";
import { SessionUser } from "./types/session-user.interface";
import session from 'express-session';
import connectRedis from "connect-redis"
import { client}  from "./services/cache.service"

declare module "express-session" {
    interface SessionData {
      user: SessionUser;
      
    }
  }
  
  dotenv.config();

export class Server {
    private app: Express;

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
    }

    async initialize(): Promise<void> {
        await AppDataSource.initialize();
    }


    async initRoutes(): Promise<void> {
        this.app = await AccountController.setup(this.app);

    }

    async init(): Promise<void> {
        await this.initialize();
        await this.initRoutes();
    }

    run(): void {
        const PORT: number = parseInt(process.env.PORT as string, 10);
        this.app.listen(PORT, () => {
        console.log(`Server istening on port ${PORT}`);
        });
    }
}