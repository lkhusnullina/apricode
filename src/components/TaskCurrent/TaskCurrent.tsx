import React from "react";
import { observer } from "mobx-react-lite";
import { Task } from "../../stores/TaskStore";
import styles from "./TaskCurrent.module.scss";


interface TaskCurrentProps {
  task: Task;
  onToggle: (task: Task, isChecked: boolean) => void;
}

const TaskCurrent: React.FC<TaskCurrentProps> = observer(({ task, onToggle }) => {
  return (
    <div className={styles.taskCurrent}>
      <input
        type="checkbox"
        checked={task.isChecked}
        onChange={(e) => onToggle(task, e.target.checked)} 
      />
      {task.title}
    </div>
  );
});

export default TaskCurrent;