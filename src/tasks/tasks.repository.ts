import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task-dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./tasks-status.enum";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task>{
    // metodo filtrar
    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        //pesquisas com variaveis
        const { status, search } = filterDto;

        // daqui para baixo e pesquisa simples
        const query = this.createQueryBuilder('task');

        // verificaçao para as pesquisas;
        if (status) {
            query.andWhere('task.status=:status', { status });
        }
        if (search) {
            query.andWhere(
                'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
                { search: `%${search}%` },);
        }
        const tasks = await query.getMany();
        return tasks;
    }






    // metodo create com o banco
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });
        await this.save(task);

        return task;
    }
}