import { IsEnum } from "class-validator";
import { TaskStatus } from "../tasks.model";

export class UpdateTaskStatusDto {
    // validara pelo menos uma propriedade dada classe TaskStatus
    @IsEnum(TaskStatus)
    status: TaskStatus;
}