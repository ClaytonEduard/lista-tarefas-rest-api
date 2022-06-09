import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { Logger } from '@nestjs/common';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    // instancido o logger, e vai se controlado pelo TasksController
    private logger = new Logger('TasksController');
    constructor(private tasksService: TasksService) { }
    // metodo listar do lado do controller por usuario adiciona o @GetUser
    @Get()
    getTasks(
        @Query() filterDto: GetTasksFilterDto,
        @GetUser() user: User,
    ): Promise<Task[]> {
        // log ativado para os recursos realizados pelo usuario 
        this.logger.verbose(`Usuario: "${user.username}" listando as tarefas. Listadas:${JSON.stringify(filterDto)}`)
        //se tivermos algum filtro definido basta chamar todas as tarefas
        return this.tasksService.getTasks(filterDto, user)
    }
    // selecionar somente a tarefa do usuario logado, adiciona o @GetUser
    @Get('/:id')
    getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
        return this.tasksService.getTaskById(id, user);
    }

    // metodo criar do lado do service
    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        // obter todos os dados do usuario
        @GetUser() user: User,
    ): Promise<Task> {
        // log para criacao de tarefas por user
        this.logger.verbose(`Usuário "${user.username}" criou uma nova tarefa. Dado: ${JSON.stringify(
            createTaskDto)}`)
        return this.tasksService.createTask(createTaskDto, user)
    }
    @Delete('/:id')
    deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        return this.tasksService.deleteTask(id, user)
    }
    // metodo de update
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
        // obter todos os dados do usuario
        @GetUser() user: User,
    ): Promise<Task> {
        // cria um constante para obter o status
        const { status } = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status, user);
    }
}
