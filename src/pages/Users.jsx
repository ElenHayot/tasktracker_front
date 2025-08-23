import { useEffect, useState } from "react";

// monte le composant App (appelé dans main.jsx)
function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/users")  // ton backend FastAPI
      .then(response => response.json())  // transforme la réponse http en objet JavaScript
      .then(data => setUsers(data))       // stocke le résultat dans "users"
      .catch(error => console.error(error));
  }, []);   // [] veut dire: exécuter ce code qu'une seule fois au montage du composant

   // users.map() parcoure le tableau des données utilisateurs
   // chaque "li" doit avoir une clef unique (ici PK de users) pour que React puisse identifier chaque élément

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            firstname = {user.firstname} : name = {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;