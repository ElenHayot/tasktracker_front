// Page affichant le détail d'une tâche
import { usePermissions } from "../hooks/usePermissions";
import { useTaskById } from "../hooks/useTaskById";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteTask } from "../hooks/useDeleteTask";
import './Buttons.css';
import { PERMISSIONS } from "../../permissions.config";

function TaskDetail() {

  // Récupère les paramètres de l'URL courante
  const { taskId } = useParams();
  const { task, loading } = useTaskById(taskId);
  const { canAccess } = usePermissions();
  const navigate = useNavigate();
  const deleteTask = useDeleteTask();

  const handleUpdateButtonClick = () => {
    navigate(`/tasks/update-task/${taskId}`, {
      state: { taskData: task }
    });
  };

  const handleDeleteButtonClick = () => {
    deleteTask(taskId);
  };


  if (loading) {
    return <div>Loading task data ...</div>;
  }

  if (!task) {
    return <div>Unfound task</div>;
  }

  return (
    <div className="space-y-4">
      <div className="relative pt-12">
        {canAccess(PERMISSIONS.TASKS_UPDATE) && (
          <button type="submit" onClick={handleUpdateButtonClick} className="update-btn">Edit</button>
        )}
        {canAccess(PERMISSIONS.TASKS_DELETE) && (
          <button type="submit" onClick={handleDeleteButtonClick} className="delete-btn">Delete account</button>
        )}
      </div>
      <div>
        <h1>{task.title} - {task.id}</h1>
        <div>
          <p>Description : </p>
          <div>{task.description}</div>
          <p>Associated project : {task.project_id}</p>
          <p>Associated user : {task.user_id}</p>
          <p>Status : {task.status}</p>
          <p>Comment : </p>
          <div>{task.comment}</div>
        </div>

      </div>
    </div>
  );
}

export default TaskDetail;