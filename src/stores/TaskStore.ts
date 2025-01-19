import { makeAutoObservable } from "mobx";

export interface Task {
  id: number;
  title: string;
  isChecked: boolean;
  subTasks: Task[];
}

class TaskStore {
  tasks: Task[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  toggleTask(task: Task, isChecked: boolean) {
    task.isChecked = isChecked;
    task.subTasks.forEach((subTask) => this.toggleTask(subTask, isChecked));
  }

  addTask(task: Task, parentTask?: Task) {
    if (parentTask) {
      parentTask.subTasks.push(task);
    } else {
      this.tasks.push(task);
    }
  }

  addSubTask(parentTask: Task, title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      isChecked: false,
      subTasks: [],
    };
    parentTask.subTasks.push(newTask);
  }

}
export const taskStore = new TaskStore();