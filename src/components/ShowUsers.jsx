// Composant affichant la liste des utilisateurs

function ShowUsers({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <p>ID : {user.id} {'>>'}</p>Firstname = {user.firstname} | Name = {user.name} | Email = {user.email} | Phone = {user.phone} | Role = {user.role} | TaskIds = {user.task_ids}
        </li>
      ))}
    </ul>
  );
}

export default ShowUsers;