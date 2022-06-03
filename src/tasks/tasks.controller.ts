import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }
    // metodo listar do lado do service
    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
        //se tivermos algum filtro definido basta chamar todas as tarefas
        return this.tasksService.getTasks(filterDto)
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    // metodo criar do lado do service
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto)
    }
    @Delete('/:id')
    deleteTask(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTask(id)
    }
    // metodo de update
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    ): Promise<Task> {
        // cria um constante para obter o status
        const { status } = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status);
    }
}
