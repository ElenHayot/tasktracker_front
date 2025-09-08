import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { parseToInt } from "../utils/parseToInt";
import { getModifiedFields } from "../utils/getModifiedFields";
import { API_URLS } from "../config/api";

export function useUpdateTask() {

  const navigate = useNavigate();

  const updateTask = useCallback(async (taskId, initialTask, updates) => {
    if (!taskId) return;  // hook appelé à la racine donc taskId=null au premier appel

    try {
      const taskIdInt = parseToInt(taskId);
      const payloadUpdates = initialTask ? getModifiedFields(initialTask, updates) : {};
      const url = API_URLS.updateTask(taskIdInt);

      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadUpdates)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.Detail || `HTTP ${response.status} : ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`Task with ID ${taskId} updated.`);
      navigate(`/tasks`);

    } catch (err) {
      console.error(err.message);
      alert(err.message);
      throw err;
    }
  }, [navigate]);

  return updateTask;

}