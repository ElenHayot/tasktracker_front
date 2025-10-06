// Composant affichant la liste des tâches

import { useNavigate, Link } from "react-router-dom";

export function ShowTask({ tasks }) {
  const navigate = useNavigate();
  const handleEditTaskWithData = (task) => {
    navigate(`/tasks/update-task`, {
      state: { taskData: task }
    });
  };


  return (
    <ul className="relative-pt-12">
      {tasks.map((task) => (
        <li key={task.id} className="list-container">
          <p>ID : {task.id} {'>>'}</p>
          <span className="label-container">
            <label className="label">{task.title}</label>
            <label className="status">{task.status}</label>
          </span>
          <div className="relative-pt-12">
            <Link to={`/tasks/details/${task.id}`} className="link-container">Details</Link>
            <button onClick={() => handleEditTaskWithData(task)} className="cpnt-update-btn">Edit</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
