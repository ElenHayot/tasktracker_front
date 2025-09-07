// Page permettant de mettre à jour une tâche
import { useEffect, useState } from "react";
import { useTaskList } from "../hooks/useTaskList";
import { useUserList } from "../hooks/useUserList";
import { StatusSelect } from "../components/StatusSelect";
import { SelectUserDDL } from "../components/SelectUserDDL";
import { SelectTaskDDL } from "../components/SelectTaskDDL";
import API_CONFIG from "../config/api";
import { useUpdateTask } from "../hooks/useUpdateTask";

function UpdateTask() {

  const [initialTask, setInitialTask] = useState(null);
  const [taskId, setTaskId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const { tasks, } = useTaskList();
  const { users, } = useUserList();

  // On charge les données de la tâche sélectionnée
  useEffect(() => {
    if (!taskId) return;

    try {
      const taskIdInt = parseInt(taskId);
      const urlInitialTask = API_CONFIG.baseUrl + `/tasks/${taskIdInt}`;

      fetch(urlInitialTask)
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

    } catch (err) {
      console.error(err.message);
      alert(err.message);
      return;
    }

  }, [taskId]); 

  const updates = {
    title,  // Equivalent à title: title
    description,
    comment,
    user_id: userId,  // noms différents back/front
    status
  };

  const updateTask = useUpdateTask();

  const handleSubmit = async (event) => {
    event.preventDefault(); // empêche le rechargement de page

    // Nécessite une propriété name="title" etc... sur les div et moins de contrôle qu'avec un objet 
    //const formData = new FormData(event.target);
    //const updates = Object.fromEntries(formData);

    try {
      await updateTask(taskId, initialTask, updates);
    } catch (error) {
      console.error(error.message);
      alert(err.message);
    }
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
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
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