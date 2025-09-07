import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { parseToInt } from "../utils/parseToInt";
import API_CONFIG from "../config/api";

export function useDeleteUser() {
  const navigate = useNavigate();

  const deleteUser = useCallback(async (userId) => {

    try {
      const userIdInt = parseToInt(userId);
      const url = API_CONFIG.baseUrl + `/users/${userIdInt}`;

      const response = await fetch(url,{
        method: "DELETE",
        headers: { "Content-Type": "application/json" }  // pas besoin de body lors du delete, paramètre dans l'URL
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error (error.Detail || `HTTP ${response.status} : ${response.statusText}`);
      }

      console.log("User deleted");
      navigate("/users");

    } catch (err) {
      console.error(err.message);
      alert(err.message);
      throw err;
    }
  }, [navigate]);

  return deleteUser;

}