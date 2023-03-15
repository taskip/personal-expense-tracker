import { getService } from "../providers/service-provider";
import { UserService } from "../user/user.service";
import { AuthController } from "./auth.controller";

export class AuthControllerFactory {
    static async getInstance(): Promise<AuthController> {
        const service = await getService<UserService>('UserService');
        return new AuthController(service);
    }
}