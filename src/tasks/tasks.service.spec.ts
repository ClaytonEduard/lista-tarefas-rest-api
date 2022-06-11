// definido o ambiente de teste

// 1° antes de tudo precisamos pensar que e preciso realizar testes simples

import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TaskStatus } from "./tasks-status.enum";
import { TasksRepository } from "./tasks.repository";
import { TasksService } from "./tasks.service";

// variavel para buscar todas as funcoes do TasksRepository
const mockTasksRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),
});
// montando um usuario ficticio
const mockUser = {
    username: 'clayton',
    id: 'someid',
    password: 'somepassword',
    tasks: [],
}

// definindo a estrutura para obter os dadods do projeto
describe("TaskService", () => {
    let tasksService: TasksService;
    let tasksRepository:ReturnType<typeof mockTasksRepository>;

    beforeEach(async () => {
        // iniciando o modulo Netjs com tasksService e tasksRepository
        const module = await Test.createTestingModule({
            providers: [TasksService,
                { provide: TasksRepository, useFactory: mockTasksRepository },
            ],
        }).compile();
        tasksService = module.get(TasksService);
        tasksRepository = module.get(TasksRepository);
    });
    // iniciando os meios de teste
    // metodo de listar tarefas
    describe('getTasks', () => {
        it('Chamando TasksRepository.getTasks e retornando as tarefas.', async () => {
            //  expect(tasksRepository.getTasks()).not.toHaveBeenCalled();
            tasksRepository.getTasks.mockResolvedValue('someValue');
            const result = await tasksService.getTasks(null, mockUser);
            //   expect(tasksRepository.getTasks).not.toHaveBeenCalled();
            expect(result).toEqual('someValue');
        });
    });
    describe('getTaskById', () => {
        it('Chamando TasksRepository.findOne e retornonado o resultado', async () => {
            const mockTask = {
                title: 'Test title',
                description: 'Test desc',
                id: 'someId',
                status: TaskStatus.OPEN,
            };

            tasksRepository.findOne.mockResolvedValue(mockTask);
            const result = await tasksService.getTaskById('someId', mockUser);
            expect(result).toEqual(mockTask);
        });

        it('Chamand TasksRepository.findOne e trantando o erro', async () => {
            tasksRepository.findOne.mockResolvedValue(null);
            expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow(
                NotFoundException,
            );
        });
    });

});