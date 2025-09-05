// Composant récupérant la liste des users en base
import { useState, useEffect } from "react";
import API_CONFIG from "../config/api";

export function useUserList(){
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    try {
      const url = API_CONFIG.baseUrl + `/users`;
      fetch(url)  // ton backend FastAPI
        .then(response => response.json())  // transforme la réponse http en objet JavaScript
        .then(data => setUsers(data))       // stocke le résultat dans "users"
        .catch(error => console.error(error))
        .finally(() => setLoading(false));  // une fois fini, on dit que le loading est terminé : info pour celui qui appelle la fonction

    } catch (err) {
      console.error(err.message);
      setUsers([]);
      setLoading(false);
    }
    
  }, []);   // [] veut dire: exécuter ce code qu'une seule fois au montage du composant

  return { users, loading };
}
