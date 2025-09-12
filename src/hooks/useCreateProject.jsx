import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { cleanObject } from "../utils/cleanObjects";
import { API_URLS } from "../config/api";

export function useCreateProject() {
  const navigate = useNavigate();

  const createProject = useCallback(async (projectData) => {

    try {
      const payload = cleanObject(projectData);
      const url = API_URLS.createProject();

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || `HTTP ${response.status} : ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Project created : ", data);
      navigate("/projects");

    } catch (err) {
      console.error(err.message);
      alert(err.message);
      throw err;
    }
  }, [navigate]);

  return createProject;
}