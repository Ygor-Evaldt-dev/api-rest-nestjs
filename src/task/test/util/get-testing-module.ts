import { Test, TestingModule } from "@nestjs/testing";
import { BcryptService } from "src/auth/encrypter/bcrypt.service";
import { DatabaseModule } from "src/database/database.module";
import { PrismaService } from "src/database/prisma.service";
import { TaskController } from "src/task/task.controller";
import { TaskService } from "src/task/task.service";
import { PrismaRepository as UserPrismaRepository } from "src/user/repositories/prisma.repository";
import { PrismaRepository } from "src/task/repository/prisma.repository";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";

export async function getTestingModule() {
    const module: TestingModule = await Test.createTestingModule({
        imports: [DatabaseModule, UserModule],
        controllers: [TaskController],
        providers: [
            PrismaService,
            { provide: 'ITaskRepository', useClass: PrismaRepository },
            { provide: 'IUserRepository', useClass: UserPrismaRepository },
            { provide: 'IEncrypter', useClass: BcryptService },
            TaskService,
            UserService
        ],
    }).compile();

    return module;
}