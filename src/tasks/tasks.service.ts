import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import console from 'console';

@Injectable()
export class TasksService {
    // injetar o servico do banco
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository,
    ) { }

    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto);
    }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOne(id);
        // if não tiver erro(404)
        if (!found) {
            throw new NotFoundException(`Tarefa com ID "${id}" não encontrado!`);
        }
        // else retrna o a tarefa encontrada
        return found;
    }

    // metodo de criar tarefas
    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto);
    }

    // metodo delete - retorna void (nulo) pois nao ira retornar valor
    async deleteTask(id: string): Promise<void> {
        const result = await this.tasksRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Nota com ID:"${id}" não escontrado`);
        }
    }

    // // metodo update task
    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await this.tasksRepository.save(task);
        return task;
    }

    // para gerar o ID automaticament usamos a biblioteca <yarn add uuid>
    // comando de iniciar sever, yarn start:dev
}
