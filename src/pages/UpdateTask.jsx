import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTaskList } from "../hooks/useTaskList";
import { parseToInt } from "../utils/parseToInt";
import { getModifiedFields } from "../utils/getModifiedFields";
import { useUserList } from "../hooks/useUserList";
import { StatusSelect } from "../components/StatusSelect";
import { SelectUserDDL } from "../components/SelectUserDDL";
import { SelectTaskDDL } from "../components/SelectTaskDDL";

function UpdateTask() {

  const [initialTask, setInitialTask] = useState(null);
  const [taskId, setTaskId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { tasks, loadingTasks } = useTaskList();
  const { users, loadingUsers } = useUserList();

  // On charge les données de la tâche sélectionnée
  useEffect(() => {
    if (!taskId) return;

    const taskIdInt = parseInt(taskId);

    fetch(`http://localhost:8000/tasks/${taskIdInt}`)
      .then(response => response.json())  // transforme la réponse http en objet JavaScript
      .then(data => {
        setInitialTask(data);
        setTitle(data.title);
        setDescription(data.description);
        setComment(data.comment);
        setUserId(data.user_id);
        setStatus(data.status);
      })
      .catch(err => {
        console.error(err.message);
        alert(`Can't load user data for task ID "${taskId}".`);
      });
  }, [taskId]);

  const updates = {
    title: title,
    description: description,
    comment: comment,
    user_id: userId,
    status: status
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskIdInt = parseToInt(taskId);
    const payloadUpdates = initialTask ? getModifiedFields(initialTask, updates) : {};

    fetch(`http://localhost:8000/tasks/${taskIdInt}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadUpdates)
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.Detail || `API error`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(`Task with ID ${taskId} updated.`);
        navigate(`/tasks`);
      })
      .catch(err => {
        console.log(err.message);
        alert(err.message);
      });
  };

  return (
    <div>
      <h1>Update a task</h1>
      <form onSubmit={handleSubmit}>
        <SelectTaskDDL tasks={tasks} value={taskId} onChange={e => setTaskId(e.target.value)} label="Task to update : " required />

        {taskId && (
          <>
            <div>
              <label>Title: </label>
              <input type="text" value={title} onChange={e => setTitle(e => e.target.value)} />
            </div>
            <div>
              <label>Description: </label>
              <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div>
              <label>Comment: </label>
              <input type="text" value={comment} onChange={e => setComment(e.target.value)} />
            </div>
            <SelectUserDDL users={users} value={userId} onChange={e => setUserId(e.target.value)} label="Affected user : " />
            <div>
              <label>Status: </label>
              <StatusSelect value={status} onChange={setStatus} />
            </div>
            <button type="submit">SUBMIT</button>
          </>
        )}
      </form>
    </div>
  );

}

export default UpdateTask;