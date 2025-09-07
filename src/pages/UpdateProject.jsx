// Page permettant de mettre à jour un projet
import { useEffect, useState } from "react";
import { useProjectList } from "../hooks/useProjectList";
import { StatusSelect } from "../components/StatusSelect";
import { SelectProjectDDL } from "../components/SelectProjectDDL";
import API_CONFIG from "../config/api";
import { useUpdateProject } from "../hooks/useUpdateProject";

function UpdateProject() {

  const [initialProject, setInitialProject] = useState(null);
  const [projectId, setProjectId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const { projects, } = useProjectList();

  // on charge les données du projet sélectionné
  useEffect(() => {
    if (!projectId) return;

    const loadProject = async () => {
      try {
        const projectIdInt = parseInt(projectId);
        const urlInitialProject = API_CONFIG.baseUrl + `/projects/${projectIdInt}`;

        const response = await fetch(urlInitialProject);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} : ${response.statusText}`);
        }

        const data = await response.json();

        setInitialProject(data);
        setTitle(data.title);
        setDescription(data.description);
        setComment(data.comment);
        setStatus(data.status);

      } catch (err) {
        console.error(err.message);
        alert(`Can't load project data for project ID "${projectId}".`);
        return;
      }

    };

    loadProject();
  }, [projectId]);

  const updates = {
    title: title,
    description: description,
    comment: comment,
    status: status
  };

  const updateProject = useUpdateProject();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      await updateProject(projectId, initialProject, updates);
    } catch (error) {
      console.log(error.medssage);
      alert(err.message);
    }
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