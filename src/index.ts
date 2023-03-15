import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { AppDataSource } from "./data-source";
import { client}  from "./services/cache.service"
import session from 'express-session';
import connectRedis from "connect-redis"
import { sessionCheck } from "./middleware/session-check";
import { SessionUser } from "./types/session-user.interface";
import { userRouter } from "./user/user.router";
import { expenseTypeRouter } from "./expense-type/expense-type.router";
import { paymentMethodRouter } from "./payment-method/payment-method.router";
import { expenseRouter } from "./expense/expense.router";
import { AccountController } from "./account/account.controller";
import { AccountService } from "./account/account.service";
import { getService } from "./providers/service-provider";
import { Server } from "./server";
import { AuthControllerFactory } from "./auth/auth.controller.factory";
import { AccountControllerFactory } from "./account/account.controller.factory";
import { User } from "./entity/User";
import { UsingJoinColumnIsNotAllowedError } from "typeorm";



dotenv.config();

declare module "express-session" {
  interface SessionData {
    user: SessionUser;
    
  }
}


const server = new Server();
server.init().then(() => {
  server.run();
});



let RedisStore = connectRedis(session);

/*
let accountController: AccountController;
getService<AccountService>('AccountService').then((service) => {
  accountController = new AccountController(service);
});
*/

//const AppDataSource = getDatasource();
/*
AppDataSource.initialize().then( async () => {
    const PORT: number = parseInt(process.env.PORT as string, 10);
    const app = express();

    const personRepo = AppDataSource.getRepository(User);
    const users = await personRepo.find();
    console.log(users);

    app.use(express.json());
    app.use(session({
      store: new RedisStore({ client: client }),
      secret: 'huhhuh',
      saveUninitialized: false,
      resave: false,

    }))

    app.use(cors({
      origin: 'http://localhost:5173',
      credentials: true
    }));
    app.use(sessionCheck);
    app.use('/api/auth', AuthControllerFactory.getInstance().getRouter());
    app.use('/api/user', userRouter);
    app.use('/api/accounts', AccountControllerFactory.getInstance().getRouter());
    app.use('/api/expense-types', expenseTypeRouter);
    app.use('/api/payment-methods', paymentMethodRouter);
    app.use('/api/expenses', expenseRouter);
    app.listen(PORT, () => {
      console.log(`Server istening on port ${PORT}`);
    });
});
*/