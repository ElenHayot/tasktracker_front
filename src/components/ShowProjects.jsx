// Composant affichant la liste des projets

function ShowProjects({ projects }){
    return(
        <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <p>ID : {project.id} {'>>'}</p>Title = {project.title} | Description = {project.description} | Comment = {project.comment} | Status = {project.status} | TaskIds = {project.task_ids}
          </li>
        ))}
      </ul>
    );
}

export default ShowProjects;