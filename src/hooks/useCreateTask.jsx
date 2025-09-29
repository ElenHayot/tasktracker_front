import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { cleanObject } from "../utils/cleanObjects";
import { API_URLS } from "../config/api";
import { getAuthHeaders } from "../utils/getAuthHeaders";

export function useCreateTask() {
  const navigate = useNavigate();

  const createTask = useCallback(async (taskData) => {
    try {
      const payload = cleanObject(taskData);  // supprime les clés vides
      const url = API_URLS.createTask();

      const response = await fetch(url, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || `HTTP ${response.status} : ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`Task "${payload.title}" created with ID <${data.id}>`);
      navigate(`/tasks`);

    } catch (err) {
      console.error(err.message);
      alert(err.message);
      throw err;
    }
  }, [navigate]);

  return createTask;
}