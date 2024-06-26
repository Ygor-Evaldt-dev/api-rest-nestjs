import { getTestingModule } from 'src/auth/test/utils/get-testing-module';
import { getTestingModule as userGetTestingModule } from 'src/user/test/utils/get-testing-module';
import { AuthService } from 'src/auth/auth.service';
import { users } from './users';
import { UserService } from 'src/user/user.service';

export async function getAuthorization() {
    const module = await getTestingModule();
    const userModule = await userGetTestingModule();

    const authService = module.get<AuthService>(AuthService);
    const userService = userModule.get<UserService>(UserService);

    try {
        await userService.findByEmail(users.exists.email);
    } catch (error: any) {
        await userService.create({ ...users.exists });
    }

    const { email, password } = users.exists;
    const token = await authService.singIn(email, password);
    return token;
}
