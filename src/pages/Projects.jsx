import { useEffect, useState } from "react";

// monte le composant App (appelé dans main.jsx)
function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/projects")  // ton backend FastAPI
      .then(response => response.json())  // transforme la réponse http en objet JavaScript
      .then(data => setProjects(data))       // stocke le résultat dans "projects"
      .catch(error => console.error(error));
  }, []);   // [] veut dire: exécuter ce code qu'une seule fois au montage du composant

   // x.map() parcoure le tableau des données x
   // chaque "li" doit avoir une clef unique (ici PK de x) pour que React puisse identifier chaque élément

  return (
    <div>
      <h1>Liste des projets</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            title = {project.title} : status = {project.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;