import { TestingModule } from '@nestjs/testing';
import { TaskController } from '../task.controller';
import { getTestingModule } from './util/get-testing-module';
import { getAxiosInstance } from 'src/shared/test/get-axios-instance';
import { AxiosInstance } from 'axios';
import { getAuthorization } from 'src/shared/test/get-authorization';
import { tasks } from './util/tasks';
import { HttpStatus } from '@nestjs/common';
import { TITLE_MAX_LENGTH, TITLE_MIN_LENGTH } from 'src/shared/constants/validator.constants';

describe('TaskController', () => {
    let taskController: TaskController;
    let axiosInstance: AxiosInstance;

    beforeAll(async () => {
        const module: TestingModule = await getTestingModule();
        taskController = module.get<TaskController>(TaskController);

        const { accessToken } = await getAuthorization();
        axiosInstance = getAxiosInstance();
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    });

    it('should be defined', () => {
        expect(taskController).toBeDefined();
    });

    it('should axiosInstance be defined', () => {
        expect(axiosInstance).toBeDefined();
    });

    describe('create', () => {
        it('shoult throw bad request error if title is not provided', async () => {
            try {
                await axiosInstance.post('/task', {
                    ...tasks.new,
                    title: null
                });
            } catch (error: any) {
                const { status, data } = error.response;

                expect(status).toBe(HttpStatus.BAD_REQUEST);
                expect(data.message[0]).toBe('Título é obrigatório');
            }
        });

        it('shoult throw bad request error if title is too long', async () => {
            try {
                await axiosInstance.post('/task', {
                    ...tasks.bigTitle
                });
            } catch (error: any) {
                const { status, data } = error.response;

                expect(status).toBe(HttpStatus.BAD_REQUEST);
                expect(data.message[0]).toBe(`Título deve ter no mínimo ${TITLE_MIN_LENGTH} e no máximo ${TITLE_MAX_LENGTH} caracteres`);
            }
        });

        it('shoult create a new task', async () => {
            const { status } = await axiosInstance.post('/task', tasks.new);
            expect(status).toBe(HttpStatus.CREATED);
        });
    });

    describe('find all', () => {
        test('should return http status note found if any task is found', async () => {
            try {
                await axiosInstance.get(`task/${Date.now()}/25`);
            } catch (error: any) {
                const { status, data } = error.response;
                expect(status).toBe(HttpStatus.NOT_FOUND);
                expect(data.message).toBe('Nenhuma tarefa cadastrada');
            }
        });

        test('should return http status bad request if take is invalid', async () => {
            try {
                const page = 0;
                const take = 0;
                await axiosInstance.get(`task/${page}/${take}`);
            } catch (error: any) {
                const { status } = error.response;
                expect(status).toBe(HttpStatus.BAD_REQUEST);
            }
        });

        test('should return http status ok if tasks is found', async () => {
            const page = 0;
            const take = 25;
            const response = await axiosInstance.get(`task/${page}/${take}`);
            const { data } = response;

            expect(response.status).toBe(HttpStatus.OK);
            expect(data.registers.length).toBeGreaterThan(0);
            expect(data.total).toBeGreaterThan(0);
            expect(data.page).toBe(page);
            expect(data.take).toBe(take);
        });
    });
});
