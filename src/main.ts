import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            dismissDefaultMessages: true,
            skipNullProperties: true,
            stopAtFirstError: true,
            skipUndefinedProperties: true,
            transform: true,
        }),
    );

    const config = new DocumentBuilder()
        .setTitle('API REST - Lista de tarefas')
        .setDescription(
            'Construída para servir aplicações web onde um usuário pode descrever e salvar as tarefas que deseja realizar, além de poder sinalizar as tarefas que já concluiu',
        )
        .setVersion('1.0')
        .addTag('Serviços disponíveis')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(process.env.PORT || 3000, () => {
        console.log(`server on: ${process.env.BASE_URL}`);
    });
}
bootstrap();
