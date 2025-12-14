import { useTaskList } from "../hooks/useTaskList";
import { ShowTask } from "../components/ShowTasks";
import { useNavigate } from "react-router-dom";
import './Pages.css';
import { usePermissions } from "../hooks/usePermissions";
import { PERMISSIONS } from "../../permissions.config";

// monte le composant App (appelé dans main.jsx)
function Tasks() {
  const { tasks, loading } = useTaskList();
  const navigate = useNavigate();
  const { canAccess } = usePermissions();

  const handleCreate = () => {
    navigate('/tasks/create-task');
  };

  if (loading) return <p>Loading...</p>
  return (
    <div className="relative pt-12">
      {canAccess(PERMISSIONS.TASKS_CREATE) && <button type="submit" onClick={handleCreate} className="create-btn">New</button>}
      <h1>Liste des tâches</h1>
      <ShowTask tasks={tasks} />
    </div>
  );
}

export default Tasks;