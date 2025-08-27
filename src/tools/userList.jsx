// Composant récupérant la liste des users en base
import { useState, useEffect } from "react";

function userList(){
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/users`)  // ton backend FastAPI
      .then(response => response.json())  // transforme la réponse http en objet JavaScript
      .then(data => setUsers(data))       // stocke le résultat dans "users"
      .catch(error => console.error(error))
      .finally(() => setLoading(false));  // une fois fini, on dit que le loading est terminé : info pour celui qui appelle la fonction
  }, []);   // [] veut dire: exécuter ce code qu'une seule fois au montage du composant

  return { users, loading };
}

export default userList;