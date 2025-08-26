import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusSelect from "../components/StatusSelect";
import projectList from "../components/ProjectList";
import userList from "../components/userList";
import { cleanObject } from "../tools/cleanObjects";

function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [projectId, setProjectId] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const {projects, loading_projects} = projectList();
  const {users, loading_users} = userList();
  const navigate = useNavigate(); // pour naviguer à la page "Tasks" après création

  // objet json de type TaskCreate (api) avec les éléments strictement nécessaire pour renvoyer la requête
  const taskData = {
    title,
    description,
    comment,
    project_id : parseInt(projectId, 10),  // "10" indique qu'on lit en base décimale
    user_id : userId ? parseInt(userId, 10) : "", // si vide, supprimé ensuite par cleanObject(object)
    status : status ? status : "" // si vide, supprimé ensuite par cleanObject(object)
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
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description: </label>
          <input 
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Comment: </label>
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <div>
          <label>Project ID: </label>
          <select value={projectId} onChange={(e) => setProjectId(e.target.value)} required >
            <option value="">-- Select a project --</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.id}: {project.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>User ID: </label>
          <select value={userId} onChange={(e) => setUserId(e.target.value)} >
            <option value="">-- Select a user --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                 {user.id}: {user.name}, {user.firstname}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Status: </label>
          <StatusSelect value={status} onChange={setStatus} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateTask;