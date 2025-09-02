// Composant affichant la liste des utilisateurs
import { getTaskById } from "../tools/getTaskById";
import showOneListInLine from "../tools/showOneListInLine";
import { TaskSelector } from "./TaskSelector";

function ShowUsers({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <p>ID : {user.id} {'>>'}</p>
          <span>
            Firstname = {user.firstname} |
            Name = {user.name} |
            Email = {user.email} |
            Phone = {user.phone} |
            Role = {user.role} |
          </span>
          <div className="task-section">
            <label className="task-label">Associated tasks</label>
            <div className="task-container selected-tasks">
              {user.task_ids.length == 0 ? (<p> No associated task </p>) : (
                user.task_ids.map(taskId => {
                  const task = getTaskById(taskId);
                  return (<div className="task-item">ID : {taskId} - {task ? task.title : `Unknown task`}</div>)
                })
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ShowUsers;