// Composant affichant la liste des projets
import { Link, useNavigate } from "react-router-dom";
import './Components.css';
import { usePermissions } from "../hooks/usePermissions";
import { PERMISSIONS } from "../../permissions.config";

export function ShowProjects({ projects }) {
  const navigate = useNavigate();
  const { canAccess } = usePermissions();
  // Cas 1 : on passe toute les données du projet à éditer
  const handleEditProjectWithData = (project) => {
    navigate(`/projects/update-project`, {
      state: { projectData: project }
    });
  };

  return (
    <ul className="relative-pt-12">
      {projects.map((project) => (
        <li key={project.id} className="list-container">
          <p>ID : {project.id} {'>>'}</p>
          <span className="label-container">
            <label className="label">{project.title}</label>
            <label className="status">{project.status}</label>
          </span>
          <div className="relative-pt-12">
            <Link to={`/projects/details/${project.id}`} className="link-container">Details</Link>
            {canAccess(PERMISSIONS.PROJECTS_UPDATE) &&
              <button onClick={() => handleEditProjectWithData(project)} className="cpnt-update-btn">Edit</button>
            }
          </div>
        </li>
      ))}
    </ul>
  );
}
