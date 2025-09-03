// Composant récupérant la liste des tâches présentes en base
import { useEffect, useState } from "react";

export function useTaskList(){
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/tasks`)  // ton backend FastAPI
      .then(response => response.json())  // transforme la réponse http en objet JavaScript
      .then(data => setTasks(data))       // stocke le résultat dans "tasks"
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return { tasks, loading };

}