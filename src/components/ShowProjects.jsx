// Composant affichant la liste des projets
import { TaskItem } from "./TaskItem";
import { Link, useNavigate } from "react-router-dom";

export function ShowProjects({ projects }) {
  const navigate = useNavigate();
  // Cas 1 : on passe toute les données du projet à éditer
  const handleEditProjectWithData = (project) => {
    navigate(`/projects/update-project`, {
      state: { projectData: project }
    });
  };

  const handleEditProjectWithId = (projectId) => {
    navigate(`/projects/update-project/${projectId}`);
  };
  

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
          </span>
          <div className="task-section">
            <label className="task-label">Associated tasks</label>
            <div className="task-container selected-tasks">
              {project.task_ids.length == 0 ? (<p>No associated task</p>) : (
                project.task_ids.map(taskId => (
                  <TaskItem key={taskId} taskId={taskId} />
                ))
              )}
            </div>
          </div>
          <Link to={`/projects/details/${project.id}`}>Details</Link>
          <button onClick={() => handleEditProjectWithData(project)}>Edit (with data)</button>
          <button onClick={() => handleEditProjectWithId(project.id)}>Edit (ID only)</button>
        </li>
      ))}
    </ul>
  );
}
 