// Composant affichant la liste des tâches

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export function ShowTask({ tasks }) {
  const navigate = useNavigate();
  const goToTaskDetail = (taskId) => {
    navigate(`/tasks/details/${taskId}`);
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <p>ID : {task.id} {'>>'}</p>
          <span>
            Title = {task.title} | 
            {/* Description = {task.description}| 
            Assigned project ID = {task.project_id} | 
            Assigned user ID = {task.user_id} | 
            Comment = {task.comment} | */}
            Status = {task.status} 
            <button onClick={() => goToTaskDetail(task.id)} style={{ marginLeft: "10px" }}>View details</button>
            <Link to={`/tasks/details/${task.id}`}>Details</Link>
          </span>
        </li>
      ))}
    </ul>
  );
}
