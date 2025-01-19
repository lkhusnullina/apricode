import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { taskStore } from "../../stores/TaskStore";
import styles from './Task.module.scss';

const TaskList: React.FC = observer(() => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      taskStore.addTask(taskTitle);
      setTaskTitle("");
    }
  };

  const handleToggleTask = (id: number) => {
    taskStore.toggleTask(id);
  };

  return (
    <div>
      <h1 className={styles.task__title}>Задачи</h1>
      <div className={styles.task__block}>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Напиши задачу"
        />
        <button onClick={handleAddTask}>Добавить задачу</button>
      </div>
      <ul className={styles.task__list}>
        {taskStore.tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.isChecked}
              onChange={() => handleToggleTask(task.id)} 
            />
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default TaskList;

