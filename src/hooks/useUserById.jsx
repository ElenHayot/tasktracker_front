import { useEffect, useState } from "react";
import { parseToInt } from "../utils/parseToInt";
import { API_URLS } from "../config/api";
import { getAuthHeaders } from "../utils/getAuthHeaders";
import { mapUserReadForBackend } from "../config/backendMapper";

export function useUserById(userId) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ne pas sortir ça du useEffect == règle de hook !!
    if (!userId) {
      console.log("userId is null or undefined");
      setLoading(false);
      return;
    }

    const loadUser = async () => {
      try {
        const userIdInt = parseToInt(userId); // peut planter, d'où le try/catch
        const url = API_URLS.getUserById(userIdInt);

        const response = await fetch(url, {
          headers: getAuthHeaders()
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} : ${response.statusText}`);
        }
        
        const data = await response.json();
        // On map l'objet selon le backend
        const mappedUser = mapUserReadForBackend(data);
        // On envoie l'objet mappé
        setUser(mappedUser);

      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadUser();

  }, [userId]);

  return { user, loading };

}