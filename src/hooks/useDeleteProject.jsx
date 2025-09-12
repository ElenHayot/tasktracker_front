import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { parseToInt } from "../utils/parseToInt";
import { API_URLS } from "../config/api";

export function useDeleteProject() {
  const navigate = useNavigate();

  const deleteProject = useCallback(async (projectId, forceTaskDeleting) => {
    try {

      const projectIdInt = parseToInt(projectId);
      const url = API_URLS.deleteProject(projectIdInt, forceTaskDeleting);

      const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || `HTTP ${response.status} : ${response.statusText}`);
      }
      console.log(`Project with ID "${projectId}" deleted`);
      navigate(`/projects`);

    } catch (err) {
      console.error(err.message);
      alert(err.message);
      throw err;
    }
  }, [navigate]);

  return deleteProject;
}