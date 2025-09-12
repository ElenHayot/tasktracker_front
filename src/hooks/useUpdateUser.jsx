import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getModifiedFields } from "../utils/getModifiedFields";
import { parseToInt } from "../utils/parseToInt";
import { API_URLS } from "../config/api";

export function useUpdateUser() {
  const navigate = useNavigate();

  const updateUser = useCallback(async (userId, initialUser, updates) => {

    try {

      const userIdInt = parseToInt(userId);
      const payloadUpdates = initialUser ? getModifiedFields(initialUser, updates) : {};
      const url = API_URLS.updateUser(userIdInt);

      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadUpdates)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error (error.detail || `HTTP ${response.status} : ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`User with ID "${userId}" updated`);
      navigate(`/users`);

    } catch (err) {
      console.error(err.message);
      alert(err.message);
      throw err;
    }
  }, [navigate]);

  return updateUser;

}