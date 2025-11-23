// Composant récupérant la liste des users en base
import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { API_URLS } from "../config/api";
import { getAuthHeaders } from "../utils/getAuthHeaders";

export function useUserList(){
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {

    const loadUsers = async () => {
      try {

        // Exemple QueryUrl
        const params = {};
        const name = searchParams.get('name');
        const role = searchParams.get('role');
        if (name) params.name = name;
        if (role) params.role = role;
        
        const url = API_URLS.getUsers(params);

        const response = await fetch(url, {
          headers: getAuthHeaders()
        });
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
