import { useEffect, useState } from "react";
import { parseToInt } from "../utils/parseToInt";

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

      fetch(`http://localhost:8000/users/${userIdInt}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false));

    } catch (error) {
      console.error("Error parsing userId:", error.message);
      setUser(null);
      setLoading(false);   
    }

  }, [userId]);

  return { user, loading };

}