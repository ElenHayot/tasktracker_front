// Composant récupérant la liste des tâches présentes en base
import { useEffect, useState } from "react";
import API_CONFIG from "../config/api";

export function useTaskList(){
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadTasks = async () => {
      try {
        const url = API_CONFIG.baseUrl + `/tasks`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} : ${response.statusText}`);
        }

        const data = await response.json();
        setTasks(data);

      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();

  }, []);

  return { tasks, loading };

}