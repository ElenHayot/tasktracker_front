// Elément permettant de sélectionner et modifier une liste de tâches
import { useTaskList } from "../hooks/useTaskList";
import './TaskSelector.css';

export function TaskSelector({ selectedTaskIds, onTaskIdsChange, label = "Associated tasks : " }) {
  const { tasks, loading } = useTaskList();

  // Ajouter une tâche à la liste
  const addTask = (taskId) => {
    if (!selectedTaskIds.includes(taskId)) {
      onTaskIdsChange([...selectedTaskIds, taskId]);
    }
  };

  // Supprimer une tâche de la liste
  const removeTask = (taskId) => {
    onTaskIdsChange(selectedTaskIds.filter(id => id != taskId));
  };

  // Obtenir les infos d'une tâche par son ID
  const getTaskById = (taskId) => {
    return tasks.find(task => task.id == taskId);
  }

  // Filtre sur les tâches disponibles (non déjà sélectionnées)
  const unselectedTaskds = tasks.filter(task => !selectedTaskIds.includes(task.id));

  if (loading) {
    return <div>Loading tasks ...</div>;
  }

  return (
    <div className="task-selector">
      {/* Zone des tâches sélectionnées */}
      <div className="task-zone">
        <label className="task-label">{label}</label>
        <div className="task-container selected-task">
          {selectedTaskIds.length == 0 ? (
            <p>No task selected</p>
          ) : (selectedTaskIds.map(taskId => {
            const task = getTaskById(taskId)
            return (
              <div key={taskId} className="task-item">
                <span className="task-text">ID : {taskId} - {task ? task.title : `Unknown task`}</span>
                <button type="button" onClick={() => removeTask(taskId)} className="remove-btn" title="Remove task">x</button>
              </div>
            );
          }))}
        </div>
      </div>

      {/* Zone des tâches disponibles */}
      <div className="task-zone">
        <label className="task-label">Available tasks (double-click to add) : </label>
        <div className="task-container available-tasks">
          {unselectedTaskds.length == 0 ? (
            <p>No available task</p>
          ) : (unselectedTaskds.map(task => {
            const associatedUser = task.user_id ? `, affected user : ${task.user_id}` : "";
            return (
            <div key={task.id} onDoubleClick={() => addTask(task.id)} className="task-item available" title="Double-click to add this task">
              <span className="task-text">
                ID : {task.id} - {task.title || "Unnamed task"} 
                {associatedUser && <span className="task-associated-user">{associatedUser}</span>} 
              </span>
            </div>
          )})
          )}
        </div>
      </div>
    </div>

  );

}