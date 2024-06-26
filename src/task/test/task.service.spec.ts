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
        if (user) return;

        await userService.create(users.exists);
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
        });

        it('should return an existing task', async () => {
            const { registers } = await taskService.findAll({
                page: 0,
                take: 1,
                userId: user.id
            })
            const task = await taskService.findUnique(registers[0].id);

            expect(task).toBeDefined();
            expect(task).toHaveProperty('title');
        });
    });

    describe('filter', () => {
        it('should throw NotFoundExeption if the filter finds no tasks', async () => {
            const exec = async () => taskService.filter({
                page: 0,
                take: 10,
                userId: 0,
                id: 0,
                title: 'any',
                finished: true
            });
            await expect(exec()).rejects.toThrow('Nenhuma tarefa encontrada');
        });

        it('should return filtred tasks', async () => {
            const filtredTasks = await taskService.filter({
                page: 0,
                take: 10,
                userId: user.id,
                finished: false
            });

            expect(filtredTasks).toHaveProperty('registers');
            expect(filtredTasks.registers.length).toBeGreaterThan(0);
        });
    });

    describe('update', () => {
        it('shoult throw NotFoundExeption if task is not registred', async () => {
            const exec = async () => taskService.update(0, {});
            await expect(exec()).rejects.toThrow('Tarefa não cadastrada');
        });

        it('should update an existing task', async () => {
            const { registers } = await taskService.findAll({
                page: 0,
                take: 1,
                userId: user.id
            });
            const exec = async () => taskService.update(registers[0].id, registers[0]);
            await expect(exec()).resolves.not.toThrow();
        })
    });

    describe('remove', () => {
        it('shoult throw NotFoundExeption if task is not registred', async () => {
            const exec = async () => taskService.remove(0);
            await expect(exec()).rejects.toThrow('Tarefa não cadastrada');
        });

        it('should remove an existing task', async () => {
            const { registers } = await taskService.findAll({
                page: 0,
                take: 1,
                userId: user.id
            });
            const exec = async () => taskService.remove(registers[0].id);
            await expect(exec()).resolves.not.toThrow();
        })
    });
});
