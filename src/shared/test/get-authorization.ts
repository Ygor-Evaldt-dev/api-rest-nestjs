import { getTestingModule } from 'src/auth/test/utils/get-testing-module';
import { AuthService } from 'src/auth/auth.service';

export async function getAuthorization() {
    const module = await getTestingModule();
    const authService = module.get<AuthService>(AuthService);

    const token = await authService.singIn('admin@gmail.com', 'S3nh@admin');
    return token;
}
