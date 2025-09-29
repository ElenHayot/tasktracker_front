import { useNavigate } from "react-router-dom";
import { getModifiedFields } from "../utils/getModifiedFields";
import { parseToInt } from "../utils/parseToInt";
import { API_URLS } from "../config/api";
import { useCallback } from "react";
import { getAuthHeaders } from "../utils/getAuthHeaders";

export function useUpdateProject() {

  const navigate = useNavigate();

  const updateProject = useCallback(async (projectId, initialProject, updates) => {

    if (!projectId) return;

    try {
      const projectIdInt = parseToInt(projectId);
      const payloadUpdates = initialProject ? getModifiedFields(initialProject, updates) : {};
      const url = API_URLS.updateProject(projectIdInt);

      const response = await fetch(url, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(payloadUpdates)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error (error.detail || `HTTP ${response.status} : ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`Project with ID ${projectId} updated`);
      navigate(`/projects`);
      
    } catch (err) {
      console.error(err.message);
      alert(err.message);
      throw err;
    }
  }, [navigate]);

  return updateProject;
}