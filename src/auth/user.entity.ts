import { Task } from "../tasks/task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ unique: true })
    username: string;
    @Column()
    password: string;

    // criando relacao um para muitos como a classe tasks
    @OneToMany((_type) => Task, (task) => task.user, { eager: true })
    tasks: Task[];
}