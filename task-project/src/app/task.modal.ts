import { User } from "../user";


export interface Task {
    id: number;
    name: string;
    description: string;
    date: string;
    completed: boolean;
    priority: string;
    updateDate: string;
    completeDate: string;
    createDate: string;
    taskStatus: string;
    deadlineDate: string;
    owner: User ;
}