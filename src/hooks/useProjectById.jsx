import { useEffect, useState } from "react";
import { API_URLS } from "../config/api";
import { getAuthHeaders } from "../utils/getAuthHeaders";
import { mapProjectReadForBackend } from "../config/backendMapper";

export function useProjectById(projectId) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!projectId) {
      console.log("projectId is null or undefined");
      setLoading(false);
      return;
    }

    const loadProject = async () => {
      try {
        const projectIdInt = parseInt(projectId);
        const url = API_URLS.getProjectById(projectIdInt);

        const response = await fetch(url, {
          headers: getAuthHeaders()
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} : ${response.statusText}`);
        }

        const data = await response.json();
        // On mappe l'objet selon le backend
        const mappedProject = mapProjectReadForBackend(data);
        // On envoie l'objet mappé
        setProject(mappedProject);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProject();

  }, [projectId]);

  return { project, loading };
}