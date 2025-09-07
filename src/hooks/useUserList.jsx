// Composant récupérant la liste des users en base
import { useState, useEffect } from "react";
import API_CONFIG from "../config/api";

export function useUserList(){
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadUsers = async () => {
      try {
        const url = API_CONFIG.baseUrl + `/users`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} : ${response.statusText}`);
        }

        const data = await response.json();
        setUsers(data);

      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
    
  }, []);   // [] veut dire: exécuter ce code qu'une seule fois au montage du composant

  return { users, loading };
}
