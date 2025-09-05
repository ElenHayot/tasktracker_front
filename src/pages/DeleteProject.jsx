import { useState } from "react";
import { useProjectList } from "../hooks/useProjectList";
import { useNavigate } from "react-router-dom";
import { parseToInt } from "../utils/parseToInt";
import { SelectProjectDDL } from "../components/SelectProjectDDL";
import API_CONFIG from "../config/api";

function DeleteProject() {
  const [projectId, setProjectId] = useState("");
  const [forceTaskDeleting, setForceTaskDeleting] = useState(false);
  const { projects, loadingProjects } = useProjectList();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const projectIdInt = parseToInt(projectId);
      const url = API_CONFIG.baseUrl + `/projects/${projectIdInt}/${forceTaskDeleting}`;

      fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })
        .then(async (res) => {
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

    } catch (err) {
      console.error(err.message);
      alert(err.message);
      return;
    }

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