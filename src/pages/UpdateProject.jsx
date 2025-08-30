import { useEffect, useState } from "react";
import projectList from "../tools/projectList";
import { useNavigate } from "react-router-dom";
import parseToInt from "../tools/parseToInt";
import { getModifiedFields } from "../tools/getModifiedFields";
import StatusSelect from "../components/StatusSelect";
import { SelectProjectDDL } from "../components/SelectProjectDDL";

function UpdateProject() {

  const [initialProject, setInitialProject] = useState(null);
  const [projectId, setProjectId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const { projects, loadingProjects } = projectList();
  const navigate = useNavigate();

  // on charge les données du projet sélectionné
  useEffect(() => {
    if (!projectId) return;

    const projectIdInt = parseInt(projectId);

    fetch(`http://localhost:8000/projects/${projectIdInt}`)
      .then(response => response.json())  // transforme la réponse http en objet JavaScript
      .then(data => {
        setInitialProject(data);
        setTitle(data.title);
        setDescription(data.description);
        setComment(data.comment);
        setStatus(data.status);
      })
      .catch(err => {
        console.error(err.message);
        alert(`Can't load project data for project ID "${projectId}".`);
      });
  }, [projectId]);

  const updates = {
    title: title,
    description: description,
    comment: comment,
    status: status
  };

  const handleSubmit = e => {
    e.preventDefault();

    const projectIdInt = parseToInt(projectId);
    const payloadUpdates = initialProject ? getModifiedFields(initialProject, updates) : {};

    fetch(`http://localhost:8000/projects/${projectIdInt}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadUpdates)
    })
      .then(async res => {
        if (!res.ok) {
          errorData = await res.json();
          throw new Error(errorData.Detail || `API error`);
        }
        return res.json();
      })
      .then(data => {
        console.log(`Project with ID ${projectId} updated`);
        navigate(`/projects`);
      })
      .catch(err => {
        console.log(err.message);
        alert(err.message);
      });
  };

  return (
    <div>
      <h1>Update a project</h1>
      <form onSubmit={handleSubmit}>
        <SelectProjectDDL projects={projects} value={projectId} onChange={e => setProjectId(e.target.value)} label="Project to update : " required />

        {projectId && (
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

export default UpdateProject;