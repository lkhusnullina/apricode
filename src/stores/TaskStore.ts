import { makeAutoObservable } from "mobx";

export interface Task {
  id: number;
  title: string;
  isChecked: boolean;
  children: Task[];
}

class TaskStore {
  tasks: Task[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTask(title: string) {
    this.tasks.push({
        id: Date.now(),
        title,
        isChecked: false,
        children: [],
      });
  }

  toggleTask(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      task.isChecked = !task.isChecked;
    }
  }
}
export const taskStore = new TaskStore();
