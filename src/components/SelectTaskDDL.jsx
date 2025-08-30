// Elément affichant la liste des IDs des tâches

export function SelectTaskDDL({ tasks, value, onChange, label = "Task : ", placeHolder = "-- Select a task --" }) {
  return (
    <div>
      <label>{label}</label>
      <select value={value} onChange={onChange} required>
        <option value="">{placeHolder}</option>
        {tasks.map(task => (
          <option key={task.id} value={task.id}>
            ID : {task.id} - {task.title}
          </option>
        ))}
      </select>
    </div>
  );
}