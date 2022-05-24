import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    // criando um array de tarefas
    private tasks = [];

    //servico de listar todas as tarefas
    getAllTasks() {
        return this.tasks;
    }
}
