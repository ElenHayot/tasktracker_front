import { useParams } from "react-router-dom";
import { useProjectById } from "../hooks/useProjectById";
import { TaskItem } from "../components/TaskItem";

function ProjectDetail() {
  const { projectId } = useParams();  // Récupère les paramètres de l'url courante
  const { project, loading } = useProjectById(projectId);

  if (loading) {
    return <div>Loading project...</div>;
  }

  if (!project) {
    return <div>Unfound project</div>;
  }

  return (
    <div>
      <h1>{project.title} - {project.id}</h1>
      <div>
        <p>Description : </p>
        <div>{project.description}</div>
        <p>Status : {project.status}</p>
        <p>Comment : </p>
        <div>{project.comment}</div>
        <div className="task-section">
          <label className="task-label">Associated tasks : </label>
          <div className="task-container selected-tasks">
            {project.task_ids.length == 0 ? (<p>No associated task yet</p>) : (
              project.task_ids.map(taskId => (
                <TaskItem key={taskId} taskId={taskId} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;