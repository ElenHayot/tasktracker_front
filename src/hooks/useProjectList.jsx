// Composant récupérant la liste des projets en base
import { useEffect, useState } from "react";
import API_CONFIG from "../config/api";

export function useProjectList(){
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    try {
      const url = API_CONFIG.baseUrl + `/projects`;

      fetch(url)  // ton backend FastAPI
        .then(response => response.json())  // transforme la réponse http en objet JavaScript
        .then(data => setProjects(data))       // stocke le résultat dans "projects"
        .catch(error => console.error(error))
        .finally(() => setLoading(false));

    } catch (err) {
      console.error(err.message);
      setProjects([]);
      setLoading(false);
    }

  }, []);   // [] veut dire: exécuter ce code qu'une seule fois au montage du composant

  return { projects, loading };
}
