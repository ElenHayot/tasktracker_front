import { useState } from "react";
import { useProjectList } from "../hooks/useProjectList";
import { SelectProjectDDL } from "../components/SelectProjectDDL";
import { useDeleteProject } from "../hooks/useDeleteProject";

function DeleteProject() {
  const [projectId, setProjectId] = useState("");
  const [forceTaskDeleting, setForceTaskDeleting] = useState(false);
  const { projects, } = useProjectList();
  const deleteProject = useDeleteProject();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await deleteProject(projectId, forceTaskDeleting);

    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }

  };

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