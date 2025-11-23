import { useEffect } from "react";
import { useState } from "react";
import { API_URLS, API_BACKEND } from "../config/api";
import { getAuthHeaders } from "../utils/getAuthHeaders";

export function useRoles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = API_URLS.getRoles();
        console.log(`in usreRoles : api.js, API_BACKEND = ${API_BACKEND}`);
        console.log(`In userRoles : url = ${url}`);
        const response = await fetch(url, { headers: getAuthHeaders()});

        if (!response.ok) {
          throw new Error(`HTTP ${response.status} : ${response.statusText}`);
        }

        const datas = await response.json();
        setRoles(datas);
      } catch(error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return { roles, loading, error };
} 