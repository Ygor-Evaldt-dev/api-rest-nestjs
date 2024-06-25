import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../task.service';
import { getTestingModule } from './util/get-testing-module';
import { tasks } from './util/tasks';
import { UserService } from 'src/user/user.service';
import { users } from 'src/shared/test/users';

describe('TaskService', () => {
    let taskService: TaskService;
    let userService: UserService;

    beforeAll(async () => {
        const module: TestingModule = await getTestingModule();
        taskService = module.get<TaskService>(TaskService);
        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(taskService).toBeDefined();
        expect(userService).toBeDefined();
    });

    describe('create', () => {
        it('shoult create a new task', async () => {
            const { id } = await userService.findByEmail(users.exists.email);
            const exec = async () => taskService.create({
                ...tasks.new,
                userId: id
            });

            await expect(exec()).resolves.not.toThrow();
        });
    });

    describe('find many', () => {
        it('should', async () => {

        });
    })
});
