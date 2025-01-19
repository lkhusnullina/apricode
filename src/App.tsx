import styles from './App.module.scss';
import Task from './components/Task/Task'

function App() {
  return (
    <div className={styles.container}>
      <Task/>
    </div>
  )
}

export default App
