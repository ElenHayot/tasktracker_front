// Composant affichant la liste des projets
import { useTaskById } from "../hooks/useTaskById";
import { TaskItem } from "./TaskItem";
import { TaskSelector } from "./TaskSelector";

export function ShowProjects({ projects }) {
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
        </li>
      ))}
    </ul>
  );
}
 