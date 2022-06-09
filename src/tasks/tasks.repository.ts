import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task-dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./tasks-status.enum";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task>{
    // metodo filtrar
    async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        //pesquisas com variaveis
        const { status, search } = filterDto;

        // daqui para baixo e pesquisa simples
        const query = this.createQueryBuilder('task');

        // adicionando a consulta por usuario
        query.where({user})

        // verificaçao para as pesquisas;
        if (status) {
            query.andWhere('task.status=:status', { status });
        }
        if (search) {
            query.andWhere(
                // usamo LOWER para poder pesquisar tanto maiuscula quanto minusculas
                '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
                { search: `%${search}%` });
        }
        const tasks = await query.getMany();
        return tasks;
    }

    // metodo create com o banco
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user,
        });
        await this.save(task);
        return task;
    }
}