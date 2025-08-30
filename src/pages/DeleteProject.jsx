import { useState } from "react";
import projectList from "../tools/projectList";
import { useNavigate } from "react-router-dom";
import parseToInt from "../tools/parseToInt";
import { SelectProjectDDL } from "../components/SelectProjectDDL";

function DeleteProject(){
  const [projectId, setProjectId] = useState("");
  const [forceTaskDeleting, setForceTaskDeleting] = useState(false);
  const {projects, loadingProjects} = projectList();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectIdInt = parseToInt(projectId);

    fetch(`http://localhost:8000/projects/${projectIdInt}/${forceTaskDeleting}`,{
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then( async (res) => {
        if (!res.ok) {
          errorData = await res.json();
          throw new Error(errorData.Detail || `API error.`);
        }
        return res.json();
      })
      .then(() => {
        console.log(`Project with ID "${projectId}" deleted`);
        navigate(`/projects`);
      })
      .catch(err => {
        console.log(err.message);
        alert(err.message);
      });
  }

  return (
    <div>
      <h1>Delete a project</h1>
      <form onSubmit={handleSubmit}>
        <SelectProjectDDL projects={projects} value={projectId} onChange={e => setProjectId(e.target.value)} label="Project to delete : " required />
        <div>
          <input type="checkbox" checked={forceTaskDeleting} onChange={e => setForceTaskDeleting(e.target.checked)} />
          Force tasks deleting
        </div>
        <button type="submit">DELETE</button>
      </form>
    </div>
  );
}

export default DeleteProject;