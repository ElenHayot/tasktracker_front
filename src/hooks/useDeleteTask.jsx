import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { parseToInt } from "../utils/parseToInt";
import { API_URLS } from "../config/api";

export function useDeleteTask() {
  const navigate = useNavigate();

  const deleteTask = useCallback(async (taskId) => {
    try {

      const taskIdInt = parseToInt(taskId);
      const url = API_URLS.deleteTask(taskIdInt);

      const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error (error.Detail || `HTTP ${response.status} : ${response.statusText}`);
      }

      console.log(`Task with ID "${taskId}" deleted`);
      navigate(`/tasks`);      

    } catch (err) {
      console.error(err.message);
      alert(err.message);
      throw err;
    }
  }, [navigate]);

  return deleteTask;
}