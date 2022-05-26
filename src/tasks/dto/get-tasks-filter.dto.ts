import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../tasks.model";

export class GetTasksFilterDto {
    // validacao sabendo que os dois metodos de pesquisa sao opcionais
    // aplicar regras usando Enum
  //  @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;
    // queremos saber se é string mesmo
  //  @IsOptional()
    @IsString()
    search?: string;
}