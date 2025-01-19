import React, { useState } from "react";
import styles from "./TaskForm.module.scss";

interface TaskFormProps {
  onAdd: (title: string) => void;
  placeholder: string;
  buttonText: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onAdd,
  placeholder,
  buttonText,
}) => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      onAdd(taskTitle);
      setTaskTitle("");
    }
  };

  return (
    <div className={styles.taskForm}>
      <input
        type="text"
        placeholder={placeholder}
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <button className={styles.taskForm__button} onClick={handleAddTask}>
        {buttonText}
      </button>
    </div>
  );
};
export default TaskForm;