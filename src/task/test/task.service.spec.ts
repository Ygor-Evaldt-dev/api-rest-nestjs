import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../task.service';
import { getTestingModule } from './util/get-testing-module';
import { tasks } from './util/tasks';
import { UserService } from 'src/user/user.service';
import { users } from 'src/shared/test/users';
import { User } from 'src/user/entities/user.entity';

describe('TaskService', () => {
    let taskService: TaskService;
    let userService: UserService;
    let user: User;

    beforeAll(async () => {
        const module: TestingModule = await getTestingModule();
        taskService = module.get<TaskService>(TaskService);
        userService = module.get<UserService>(UserService);

        user = await userService.findByEmail(users.exists.email);
    });

    it('should be defined', () => {
        expect(taskService).toBeDefined();
        expect(userService).toBeDefined();
    });

    describe('create', () => {
        it('shoult create a new task', async () => {
            const exec = async () => taskService.create({
                ...tasks.new,
                userId: user.id
            });

            await expect(exec()).resolves.not.toThrow();
        });
    });

    describe('find all', () => {
        it('should throw NotFoundException if there are not user tasks', async () => {
            const exec = async () => taskService.findAll({
                page: 0,
                take: 10,
                userId: 0
            });

            await expect(exec()).rejects.toThrow('Nenhuma tarefa cadastrada');
        });

        it('should return tasks by user', async () => {
            const page = 0;
            const take = 10;
            const response = await taskService.findAll({
                page,
                take,
                userId: user.id
            });

            expect(response.total).toBeGreaterThan(0);
            expect(response.registers.length).toBeGreaterThan(0);
            expect(response.page).toBe(page);
            expect(response.take).toBe(take);
        });
    });

    describe('find unique', () => {
        it('should throw NotFoundExeption if task is not registred', async () => {
            const exec = async () => taskService.findUnique(0);
            await expect(exec()).rejects.toThrow('Tarefa não cadastrada');
        })
    });
});
