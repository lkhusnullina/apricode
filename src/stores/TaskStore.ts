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
    this.updateParentStatus(task);
  }

  updateParentStatus(task: Task | null) {
    if (!task) return;
    const parent = this.findParentTask(task);
    if (parent) {
      parent.isChecked = parent.subTasks.every((t) => t.isChecked);
      this.updateParentStatus(parent);
    }
  }

  findParentTask(childTask: Task, tasks: Task[] = this.tasks): Task | null {
    for (const task of tasks) {
      if (task.subTasks.includes(childTask)) {
        return task;
      }
      const parent = this.findParentTask(childTask, task.subTasks);
      if (parent) return parent;
    }
    return null;
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
  
    if (parentTask.isChecked) {
      parentTask.isChecked = false;
      this.updateParentStatus(parentTask); 
    }
  }

}
export const taskStore = new TaskStore();