import { useState } from "react";
import { useTaskList } from "../hooks/useTaskList";
import { SelectTaskDDL } from "../components/SelectTaskDDL";
import { useDeleteTask } from "../hooks/useDeleteTask";

function DeleteTask() {
  const [taskId, setTaskId] = useState("");
  const { tasks, } = useTaskList();
  const deleteTask = useDeleteTask();

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {
      await deleteTask(taskId);
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }

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