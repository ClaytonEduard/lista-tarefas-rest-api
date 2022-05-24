export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
}

// tratando um enum para o status da tarefa
export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}
