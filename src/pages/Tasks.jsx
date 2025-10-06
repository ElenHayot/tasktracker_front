import { useTaskList } from "../hooks/useTaskList";
import { ShowTask } from "../components/ShowTasks";
import { useNavigate } from "react-router-dom";
import './Buttons.css';

// monte le composant App (appelé dans main.jsx)
function Tasks() {
  const { tasks, loading } = useTaskList();
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/tasks/create-task');
  };

  if (loading) return <p>Loading...</p>
  return (
    <div className="relative pt-12">
      <button type="submit" onClick={handleCreate} className="create-btn">New</button>
      <h1>Liste des tâches</h1>
      <ShowTask tasks={tasks} />
    </div>
  );
}

export default Tasks;