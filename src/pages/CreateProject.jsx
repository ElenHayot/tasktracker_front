// Page permettant de créer un projet
import { useState } from "react";
import { StatusSelect } from "../components/StatusSelect";
import { useCreateProject } from "../hooks/useCreateProject";

function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");

  const projectData = {
    title: title,
    description: description,
    comment: comment,
    status: status
  };

  const createProject = useCreateProject();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createProject(projectData);
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
    
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