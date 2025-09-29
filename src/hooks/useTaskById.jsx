import { useEffect, useState } from "react";
import { parseToInt } from "../utils/parseToInt";
import { API_URLS } from "../config/api";
import { getAuthHeaders } from "../utils/getAuthHeaders";

export function useTaskById(taskId) {

  const [ task, setTask ] = useState(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {

    if(!taskId) {
      console.log("taskId is null or undefined");
      setLoading(false);
      return;
    }

    const loadTask = async () => {
      try {
        const taskIdInt = parseToInt(taskId);
        const url = API_URLS.getTaskById(taskIdInt);

        const response = await fetch(url, {
          headers: getAuthHeaders()
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} : ${response.statusText}`);
        }

        const data = await response.json();
        setTask(data);

      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadTask();
    
  }, [taskId]);

  return { task, loading };

}