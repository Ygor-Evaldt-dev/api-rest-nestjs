import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        dismissDefaultMessages: true,
        skipNullProperties: true,
        stopAtFirstError: true,
        skipUndefinedProperties: true,
        transform: true
    }))
    await app.listen(3000);
}
bootstrap();
