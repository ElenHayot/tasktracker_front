// Composant récupérant la liste des projets en base
import { useEffect, useState } from "react";
import { API_URLS } from "../config/api";

export function useProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadProjects = async () => {
      try {
        const url = API_URLS.getProjects();
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} : ${response.statusText}`);
        }

        const data = await response.json();
        setProjects(data);

      } catch (err) {
        console.error(err.message);
      } finally { 
        setLoading(false);
      }
    };

    loadProjects();

  }, []);   // [] veut dire: exécuter ce code qu'une seule fois au montage du composant

  return { projects, loading };
}
