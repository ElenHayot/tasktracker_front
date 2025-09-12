// Composant affichant la liste des tâches

import { useNavigate, Link } from "react-router-dom";

export function ShowTask({ tasks }) {
  const navigate = useNavigate();
  const handleEditTaskWithData = (task) => {
    navigate(`/tasks/update-task`, {
      state: { taskData: task }
    });
  };
  const handleEditTaskWithId = (taskId) => {
    navigate(`/tasks/update-task/${taskId}`);
  };


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
          </span>
          <div>
            <Link to={`/tasks/details/${task.id}`}>Details</Link>
            <button onClick={() => handleEditTaskWithData(task)}>Edit (with data)</button>
            <button onClick={() => handleEditTaskWithId(task.id)}>Edit (ID only)</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
