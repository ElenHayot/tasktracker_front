// Composant affichant la liste des utilisateurs
import { useTaskById } from "../hooks/useTaskById";
import { TaskItem } from "./TaskItem";
import { TaskSelector } from "./TaskSelector";

export function ShowUsers({ users }) {
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
                user.task_ids.map(taskId => (
                  <TaskItem key={taskId} taskId={taskId} />
                ))
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}