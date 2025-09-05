import { useEffect, useState } from "react";
import { parseToInt } from "../utils/parseToInt";
import API_CONFIG from "../config/api";

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

    try {
      const userIdInt = parseToInt(userId); // peut planter, d'où le try/catch
      const url = API_CONFIG.baseUrl + `/users/${userIdInt}`;

      fetch(url)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false));

    } catch (error) {
      console.error(error.message);
      setUser(null);
      setLoading(false);   
    }

  }, [userId]);

  return { user, loading };

}