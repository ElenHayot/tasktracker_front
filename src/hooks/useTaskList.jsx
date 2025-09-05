// Composant récupérant la liste des tâches présentes en base
import { useEffect, useState } from "react";
import API_CONFIG from "../config/api";

export function useTaskList(){
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    try {
      const url = API_CONFIG.baseUrl + `/tasks`;

      fetch(url)  // ton backend FastAPI
        .then(response => response.json())  // transforme la réponse http en objet JavaScript
        .then(data => setTasks(data))       // stocke le résultat dans "tasks"
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    } catch(err) {
      console.error(err.message);
      setTasks([]);
      setLoading(false);
    }
  }, []);

  return { tasks, loading };

}