import React from "react";
import { observer } from "mobx-react-lite";
import { taskStore, Task } from "../../stores/TaskStore";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./TasksList.module.scss";
import TaskForm from "../TaskForm/TaskForm";

const TasksList: React.FC = observer(() => {

  const handleToggle = (task: Task, isChecked: boolean) => {
    taskStore.toggleTask(task, isChecked);
  };

  const handleAddTask = (title: string) => {
    taskStore.addTask({
      id: Date.now(),
      title,
      isChecked: false,
      subTasks: [],
    });
  };

  const handleAddSubTask = (parentTask: Task, title: string) => {
    taskStore.addSubTask(parentTask, title);
  };

  return (
    <div className={styles.tasksList}>
      <h1 className={styles.tasksList__title}>Список задач</h1>
      <TaskForm
        onAdd={handleAddTask}
        placeholder="Напиши задачу"
        buttonText="Добавить задачу"
      />
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
