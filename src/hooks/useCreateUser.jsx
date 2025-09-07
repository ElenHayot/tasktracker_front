import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { cleanObject } from "../utils/cleanObjects";
import API_CONFIG from "../config/api";

export function useCreateUser() {
  const navigate = useNavigate();

  const createUser = useCallback(async (userData) => {

    try {
      const payload = cleanObject(userData);
      const url = API_CONFIG.baseUrl + `/users`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error (error.Detail || `HTTP ${response.status} : ${response.statusText}`);
      }

      const data = await response.json();
      console.log("User created : ", data);
      navigate("/users"); // 👈 redirige vers la liste des users

    } catch (err) {
      console.error(err.message);
      alert(err.message);
      throw err;
    }
  }, [navigate]);

  return createUser;
}