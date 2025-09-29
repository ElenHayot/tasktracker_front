import { useEffect, useState } from "react";
import { API_URLS } from "../config/api";
import { getAuthHeaders } from "../utils/getAuthHeaders";

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
        setProject(data);
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