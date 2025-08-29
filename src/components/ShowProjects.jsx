// Composant affichant la liste des projets
import showOneListInLine from "../tools/showOneListInLine";

function ShowProjects({ projects }) {
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>
          <p>ID : {project.id} {'>>'}</p>
          <span>
            Title = {project.title} | 
            Description = {project.description} | 
            Comment = {project.comment} | 
            Status = {project.status} | 
            TaskIds = {showOneListInLine(project.task_ids)}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default ShowProjects;  