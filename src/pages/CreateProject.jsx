import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusSelect } from "../components/StatusSelect";
import { cleanObject } from "../utils/cleanObjects";

function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const projectData = {
    title: title,
    description: description,
    comment: comment,
    status: status
  };

  const payload = cleanObject(projectData);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/projects/", {
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
        console.log("Project created : ", data);
        navigate("/projects");
      })
      .catch((error) => {
        console.error("Error : ", error.message);
        alert("Error : " + error.message);
      });
  };

  return (
    <div>
      <h1>Create a new project</h1>
      <form onSubmit={(handleSubmit)}>
        <div>
          <label>Title: </label>
          <input type="text" value={title} onChange={((e) => setTitle(e.target.value))} required />
        </div>
        <div>
          <label>Description: </label>
          <input type="text" value={description} onChange={((e) => setDescription(e.target.value))} />
        </div>
        <div>
          <label>Comment: </label>
          <input type="text" value={comment} onChange={((e) => setComment(e.target.value))} />
        </div>
        <div>
          <label>Status: </label>
          <StatusSelect value={status} onChange={setStatus} />
        </div>
        <button type="submit">CREATE</button>
      </form>
    </div>
  );
}

export default CreateProject;