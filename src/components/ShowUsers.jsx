// Composant affichant la liste des utilisateurs
import { TaskItem } from "./TaskItem";
import { Link, useNavigate } from "react-router-dom";

export function ShowUsers({ users }) {
  const navigate = useNavigate();
  // Cas 1 : on passe l'ensemble des données du user à éditer (recommandé)
  const handleEditUserWithData = (user) => {
    navigate(`/users/update-user`, {
      state: { userData: user}  // on passe toutes les données
    });
  };
  // Cas 2 : on passe uniquement l'ID du user à éditer
  const handleEditUserWithId = (userId) => {
    navigate(`/users/update-user/${userId}`);
  };

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
          <Link to={`/users/details/${user.id}`}>Details</Link>

          {/* Bouton en passant les données complètes (plus efficace) */}
          <button onClick={() => handleEditUserWithData(user)}>Edit (with data)</button>

          {/* Bouton avec seulement ID */}
          <button onClick={() => handleEditUserWithId(user.id)}>Edit (ID only)</button>
        </li>
      ))}
    </ul>
  );
}