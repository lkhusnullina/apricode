import styles from './App.module.scss';
import TasksList from './components/TasksList/TasksList';

function App() {
  return (
    <div className={styles.container}>
      <TasksList/>
    </div>
  )
}

export default App