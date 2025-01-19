import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { taskStore } from "../../stores/TaskStore";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./TasksList.module.scss";

const TasksList: React.FC = observer(() => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      taskStore.addTask({
        id: Date.now(),
        title: newTaskTitle,
        isChecked: false,
        subTasks: [],
      });
      setNewTaskTitle("");
    }
  };

  return (
    <div className={styles.tasks}>
      <h1 className={styles.tasks__title}>Список задач</h1>
      <div className={styles.tasks__block}>
        <input
          type="text"
          placeholder="Напиши задачу"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button className={styles.tasks__button} onClick={handleAddTask}>Добавить задачу</button>
      </div>
      <div>
        {taskStore.tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
});

export default TasksList;