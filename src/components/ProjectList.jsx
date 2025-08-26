// Composant récupérant la liste des projets en base
import { useEffect, useState } from "react";

function projectList(){
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/projects")  // ton backend FastAPI
      .then(response => response.json())  // transforme la réponse http en objet JavaScript
      .then(data => setProjects(data))       // stocke le résultat dans "projects"
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);   // [] veut dire: exécuter ce code qu'une seule fois au montage du composant

  return { projects, loading };
}

export default projectList;