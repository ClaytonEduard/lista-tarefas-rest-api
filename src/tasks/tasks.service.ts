import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TasksService {
    // criando um array de tarefas
    private tasks: Task[] = [];

    //servico de listar todas as tarefas
    getAllTasks(): Task[] {
        return this.tasks;
    }
    //servio de listar por filtros
    getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto;
        //definir um array temporario com todos os resultados
        let tasks = this.getAllTasks();
        //se o status estiver definido
        if (status) {
            tasks = tasks.filter((task) => task.status === status);
        }
        // realiza a pesquisa
        if (search) {
            tasks = tasks.filter((task) => {
                if (task.title.includes(search) || task.description.includes(search)) {
                    return true;
                }
                return false;
            })
        }

        return tasks;
    }


    //criando o metodo de criacao de id onde ele verifica se o id e igual listado 
    getTaskById(id: string): Task {

        // tentar obter uma tarefa
        const found = this.tasks.find((task) => task.id === id)
        // if não tiver erro(404)
        if (!found) {
            throw new NotFoundException(`Tarefa com ID "${id}" não encontrado!`);

        }
        // else retrna o a tarefa encontrada
        return found;

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


    // metodo delete - retorna void (nulo) pois nao ira retornar valor
    deleteTask(id: string): void {
        // validacao para a remoção da tarefa
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter((task) => task.id !== found.id);
    }

    // metodo update task
    updateTaskStatus(id: string, status: TaskStatus) {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    // para gerar o ID automaticament usamos a biblioteca <yarn add uuid>
    // comando de iniciar sever, yarn start:dev
}
