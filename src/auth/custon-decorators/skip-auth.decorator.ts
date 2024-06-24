import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from 'src/shared/constants/auth.contants';

export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);
