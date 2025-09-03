// Composant affichant la liste des tâches

export function ShowTask({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <p>ID : {task.id} {'>>'}</p>
          <span>
            Title = {task.title} | 
            Description = {task.description}| 
            Assigned project ID = {task.project_id} | 
            Assigned user ID = {task.user_id} | 
            Comment = {task.comment} | 
            Status = {task.status} | 
          </span>
        </li>
      ))}
    </ul>
  );
}
