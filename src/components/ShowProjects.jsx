// Composant affichant la liste des projets
import ShowOneListInLine from "./ShowOneListInLine";

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
            TaskIds = {ShowOneListInLine(project.task_ids)}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default ShowProjects;  