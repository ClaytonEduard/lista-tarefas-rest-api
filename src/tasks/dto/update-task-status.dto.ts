import { IsEnum } from "class-validator";
import { TaskStatus } from "../tasks-status.enum";

export class UpdateTaskStatusDto {
    // validara pelo menos uma propriedade dada classe TaskStatus
    @IsEnum(TaskStatus)
    status: TaskStatus;
}