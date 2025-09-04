// Page affichant le détail d'une tâche

import { useTaskById } from "../hooks/useTaskById";
import { useParams } from "react-router-dom";
import { parseToInt } from "../utils/parseToInt";

function TaskDetail() {

  // Récupère les paramètres de l'URL courante
  const { taskId } = useParams();
  const {task, loading} = taskId ? useTaskById(taskId) : {task: null, loading: false};

  if (loading) {
    return <div>Chargement de la tâche ...</div>;
  }

  if (!task) {
    return <div>Tâche non trouvée</div>;
  }

  return (
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
  );
}

export default TaskDetail;