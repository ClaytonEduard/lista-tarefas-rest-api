import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task-dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task } from "./task.entity";
import { TaskStatus } from "./tasks-status.enum";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task>{
    // metodo filtrar
    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const query = this.createQueryBuilder('task');
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