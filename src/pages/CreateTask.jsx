// Page permettant de créer une tâche
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusSelect } from "../components/StatusSelect";
import { useProjectList } from "../hooks/useProjectList";
import { useUserList } from "../hooks/useUserList";
import { SelectProjectDDL } from "../components/SelectProjectDDL";
import { SelectUserDDL } from "../components/SelectUserDDL";
import { useCreateTask } from "../hooks/useCreateTask";

function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [projectId, setProjectId] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const { projects, } = useProjectList();
  const { users, } = useUserList();

  // objet json de type TaskCreate (api) avec les éléments strictement nécessaire pour renvoyer la requête
  const taskData = {
    title,
    description,
    comment,
    project_id: projectId ? parseInt(projectId, 10) : "",  // "10" indique qu'on lit en base décimale
    user_id: userId ? parseInt(userId, 10) : "", // si vide, supprimé ensuite par cleanObject(object)
    status: status ? status : "" // si vide, supprimé ensuite par cleanObject(object)
  };

  const createTask = useCreateTask();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createTask(taskData);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }

  };

  return (
    <div>
      <h1>Create a new task</h1>
      <form onSubmit={(handleSubmit)}>
        <div>
          <label>Title: </label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description: </label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Comment: </label>
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <SelectProjectDDL projects={projects} value={projectId} onChange={(e) => setProjectId(e.target.value)} required />
        <SelectUserDDL users={users} value={userId} onChange={(e) => setUserId(e.target.value)} />
        <div>
          <label>Status: </label>
          <StatusSelect value={status} onChange={setStatus} />
        </div>
        <button type="submit">CREATE</button>
      </form>
    </div>
  );
}

export default CreateTask;