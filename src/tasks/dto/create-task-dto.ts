//creando a Class de create para  heranca da dados
import { IsNotEmpty } from "class-validator"; // classe para validacao de dados

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty() // validacao para nao gravar nada em branco
    description: string;
}


// instalar dois pacotes para as validacoes
//  yarn add class-validator class-transformer