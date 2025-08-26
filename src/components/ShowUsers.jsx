// Composant affichant la liste des utilisateurs
import ShowOneListInLine from "./ShowOneListInLine";

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
            TaskIds = {ShowOneListInLine(user.task_ids)}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default ShowUsers;