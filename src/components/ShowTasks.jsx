// Composant affichant la liste des tâches

function ShowTask({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <p>ID : {task.id} {'>>'}</p>Title = {task.title} | Description = {task.description}| ProjectId = {task.project_id} | UserId = {task.user_id} | Status = {task.status}
        </li>
      ))}
    </ul>
  );
}

export default ShowTask;