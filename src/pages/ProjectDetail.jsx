import { useNavigate, useParams } from "react-router-dom";
import { useProjectById } from "../hooks/useProjectById";
import { TaskItem } from "../components/TaskItem";
import { useDeleteProject } from "../hooks/useDeleteProject";
import { usePermissions } from "../hooks/usePermissions";
import { PERMISSIONS } from "../../permissions.config";
import '../components/Components.css';
import './Pages.css';

function ProjectDetail() {
  const { projectId } = useParams();  // Récupère les paramètres de l'url courante
  const { project, loading } = useProjectById(projectId);
  const { canAccess } = usePermissions();
  const navigate = useNavigate();
  const deleteProject = useDeleteProject();

  const handleUpdateButtonClick = () => {
    navigate(`/projects/update-project/${projectId}`, {
      state: {projectData: project}
    });
  };

  const handleDeleteButtonClick = () => {
    deleteProject(projectId);
  };

  if (loading) {
    return <div>Loading project...</div>;
  }

  if (!project) {
    return <div>Unfound project</div>;
  }

  return (
    <div className="space-y-4">
      <div className="relative pt-12">
        {canAccess(PERMISSIONS.PROJECTS_UPDATE) && (
          <button type="submit" onClick={handleUpdateButtonClick} className="update-btn">Edit</button>
        )}
        {canAccess(PERMISSIONS.PROJECTS_DELETE) && (
          <button type="submit" onClick={handleDeleteButtonClick} className="delete-btn">Delete account</button>
        )}
      </div>
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
    </div>
  );
}

export default ProjectDetail;