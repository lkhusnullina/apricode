import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Task, taskStore } from "../../stores/TaskStore";
import styles from "./TaskItem.module.scss";

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task, isChecked: boolean) => void;
  onAddSubTask: (parentTask: Task, title: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = observer(({ task, onToggle, onAddSubTask }) => {
    const [newSubtask, setNewSubtask] = useState("");

    const handleAddSubTask = () => {
      if (newSubtask.trim()) {
        onAddSubTask(task, newSubtask);
        setNewSubtask("");
      }
    };

    return (
      <div className={styles.subTask}>
        <div className={styles.subTask__block}>
          <div className={styles.subTask__title}>
            <input
              type="checkbox"
              checked={task.isChecked}
              onChange={(e) => taskStore.toggleTask(task, e.target.checked)}
            />
            {task.title}
          </div>
          <div className={styles.subTask__addSubTask}>
            <input
              type="text"
              placeholder="Напиши подзадачу"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
            />
            <button
              className={styles.subTask__button}
              onClick={handleAddSubTask}
            >
              Добавить подзадачу
            </button>
          </div>
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
  }
);

export default TaskItem;