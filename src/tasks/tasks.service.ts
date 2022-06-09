import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import console from 'console';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    // injetar o servico do banco
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository,
    ) { }
    // filtrar por usuario adiciona os user: User
    getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto, user);
    }

    async getTaskById(id: string, user: User): Promise<Task> {
        // busa somente por um id
        //  const found = await this.tasksRepository.findOne(id);
        // assim busca pelo id e pelo usuario
        const found = await this.tasksRepository.findOne({ where: { id, user } });
        // if não tiver erro(404)
        if (!found) {
            throw new NotFoundException(`Tarefa com ID "${id}" não encontrado!`);
        }
        // else retrna o a tarefa encontrada
        return found;
    }

    // metodo de criar tarefas
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto, user);
    }

    // metodo delete - retorna void (nulo) pois nao ira retornar valor
    async deleteTask(id: string, user: User): Promise<void> {
        const result = await this.tasksRepository.delete({ id, user });
        if (result.affected === 0) {
            throw new NotFoundException(`Nota com ID:"${id}" não escontrado`);
        }
    }

    // // metodo update task
    async updateTaskStatus(
        id: string,
        status: TaskStatus,
        user: User,
    ): Promise<Task> {
        const task = await this.getTaskById(id, user);
        task.status = status;
        await this.tasksRepository.save(task);
        return task;
    }

    // para gerar o ID automaticament usamos a biblioteca <yarn add uuid>
    // comando de iniciar sever, yarn start:dev
}
