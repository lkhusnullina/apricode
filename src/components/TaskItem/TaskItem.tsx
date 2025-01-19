import React from "react";
import { observer } from "mobx-react-lite";
import { Task } from "../../stores/TaskStore";
import styles from "./TaskItem.module.scss";
import TaskForm from "../TaskForm/TaskForm";
import TaskCurrent from "../TaskCurrent/TaskCurrent";

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task, isChecked: boolean) => void;
  onAddSubTask: (parentTask: Task, title: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = observer(({ task, onToggle, onAddSubTask }) => {
  return (
    <div className={styles.taskItem}>
      <div className={styles.taskItem__block}>
        <TaskCurrent task={task} onToggle={onToggle} />
        <TaskForm
          onAdd={(title) => onAddSubTask(task, title)}
          placeholder="Напиши подзадачу"
          buttonText="Добавить подзадачу"
        />
      </div>
      {task.subTasks.length > 0 && (
        <div>
          {task.subTasks.map((subTask) => (
            <TaskItem
              key={subTask.id}
              task={subTask}
              onToggle={onToggle}
              onAddSubTask={onAddSubTask}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default TaskItem;