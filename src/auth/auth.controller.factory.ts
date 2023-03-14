import { getService } from "../providers/service-provider";
import { UserService } from "../user/user.service";
import { AuthController } from "./auth.controller";

export class AuthControllerFactory {
    static getInstance(): AuthController {
        const service = getService<UserService>('UserService');
        return new AuthController(service);
    }
}