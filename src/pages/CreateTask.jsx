import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusSelect } from "../components/StatusSelect";
import { useProjectList } from "../hooks/useProjectList";
import { useUserList } from "../hooks/useUserList";
import { cleanObject } from "../utils/cleanObjects";
import { SelectProjectDDL } from "../components/SelectProjectDDL";
import { SelectUserDDL } from "../components/SelectUserDDL";

function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [projectId, setProjectId] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const { projects, loading_projects } = useProjectList();
  const { users, loading_users } = useUserList();
  const navigate = useNavigate(); // pour naviguer à la page "Tasks" après création

  // objet json de type TaskCreate (api) avec les éléments strictement nécessaire pour renvoyer la requête
  const taskData = {
    title,
    description,
    comment,
    project_id: parseInt(projectId, 10),  // "10" indique qu'on lit en base décimale
    user_id: userId ? parseInt(userId, 10) : "", // si vide, supprimé ensuite par cleanObject(object)
    status: status ? status : "" // si vide, supprimé ensuite par cleanObject(object)
  };

  const payload = cleanObject(taskData);  // supprime les clés vides

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/tasks/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.Detail || "API error");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Task created : ", data);
        navigate("/tasks");
      })
      .catch((error) => {
        console.error("Error : ", error.message);
        alert("Error : " + error.message);
      });
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