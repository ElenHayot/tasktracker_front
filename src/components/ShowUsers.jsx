// Composant affichant la liste des utilisateurs
import showOneListInLine from "../tools/showOneListInLine";

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
            TaskIds = {showOneListInLine(user.task_ids)}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default ShowUsers;