import { useState } from "react";
import taskList from "../tools/taskList";
import parseToInt from "../tools/parseToInt";
import { useNavigate } from "react-router-dom";
import { SelectTaskDDL } from "../components/SelectTaskDDL";

function DeleteTask(){
  const [taskId, setTaskId] = useState("");
  const {tasks, loadingTasks} = taskList();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskIdInt = parseToInt(taskId);

    fetch(`http://localhost:8000/tasks/${taskIdInt}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    })
      .then(async (res) => {
        if (!res.ok) { 
          const errorData = await res.json();
          throw new Error(errorData.Detail || `API error.`);
        }
        return res.json();
      })
      .then(() => { // on ne récupère pas de data lors d'un delete donc ()
        console.log(`Task with ID "${taskId}" deleted`);
        navigate(`/tasks`);
      })
      .catch(err => {
        console.log(err.message);
        alert(err.message);
      });
  };

  return (
    <div>
      <h1>Delete a task</h1>
      <form onSubmit={handleSubmit}>
        <SelectTaskDDL tasks={tasks} value={taskId} onChange={(e) => setTaskId(e.target.value)} label="Task to delete : " required />
        <button type="submit">DELETE</button>
      </form>
    </div>
  );
}

export default DeleteTask;