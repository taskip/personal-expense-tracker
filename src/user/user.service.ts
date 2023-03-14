import { Repository } from "typeorm";
import  bcrypt from "bcrypt";
import { User } from "../entity/User";

export class UserService {
    constructor(
        private readonly userRepository: Repository<User>
    ){};

 
    async addUser(email: string, passwd: string): Promise<User> {
        try {
            const pwhash = await bcrypt.hash(passwd, 10);
            const user = this.userRepository.save({
                email: email,
                passwd: pwhash,
            });
            return user;
        } catch (e) {
            console.log('ERROR saving user');
            console.log(e);

        }
        throw new Error('User save failed');
    }

    async verifyUser(username: string, password: string): Promise<User | undefined> {
        try {
            const user = await this.userRepository.findOneBy({email: username});
            if (!user) {
                console.log('User not found!');
                return undefined;
            }
            if (await bcrypt.compare(password, user.passwd)) {
                console.log('auth success!');
                return user;
            }
        } catch (e) {
            console.log(`Error in user validation ${username}`);
            console.log(e);
        }
        return undefined;
    }
}