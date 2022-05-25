import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';

@Injectable()
export class TasksService {
    // criando um array de tarefas
    private tasks: Task[] = [];

    //servico de listar todas as tarefas
    getAllTasks(): Task[] {
        return this.tasks;
    }

    // metodo de criar tarefas
    createTask(createTaskDto: CreateTaskDto): Task {
        //anotacao esmc6
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);
        return task;
    }

    // para gerar o ID automaticament usamos a biblioteca <yarn add uuid>
    // comando de iniciar sever, yarn start:dev
}
