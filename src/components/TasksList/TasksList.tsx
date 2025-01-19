import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { taskStore, Task } from "../../stores/TaskStore";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./TasksList.module.scss";

const TasksList: React.FC = observer(() => {
  const [newTask, setNewTask] = useState<string>("");

  const handleToggle = (task: Task, isChecked: boolean) => {
    taskStore.toggleTask(task, isChecked);
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      taskStore.addTask({
        id: Date.now(),
        title: newTask,
        isChecked: false,
        subTasks: [],
      });
      setNewTask("");
    }
  };

  const handleAddSubTask = (parentTask: Task, title: string) => {
    taskStore.addSubTask(parentTask, title);
  };

  return (
    <div className={styles.tasks}>
      <h1 className={styles.tasks__title}>Список задач</h1>
      <div className={styles.tasks__block}>
        <input
          type="text"
          placeholder="Напиши задачу"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className={styles.tasks__button} onClick={handleAddTask}>
          Добавить задачу
        </button>
      </div>
      <div>
        {taskStore.tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onAddSubTask={handleAddSubTask}
          />
        ))}
      </div>
    </div>
  );
});

export default TasksList;
