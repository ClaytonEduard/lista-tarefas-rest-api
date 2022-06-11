import { Exclude } from "class-transformer";
import { User } from "../auth/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./tasks-status.enum";

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    status: TaskStatus;

    // relacao muitos para um ,como os controle de users
    @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
    //exclui as propriedades privadas do usuario, é necessario criar uma class de trasnformacao - transform.interceptor.ts
    @Exclude({ toPlainOnly: true })
    user: User;

}