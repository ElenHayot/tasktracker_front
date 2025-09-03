import { useTaskList } from "../hooks/useTaskList";
import { ShowTask } from "../components/ShowTasks";

// monte le composant App (appelé dans main.jsx)
function Tasks() {
  const { tasks, loading } = useTaskList();

  if (loading) return <p>Loading...</p>
  return (
    <div>
      <h1>Liste des tâches</h1>
      <ShowTask tasks={tasks} />
    </div>
  );
}

export default Tasks;