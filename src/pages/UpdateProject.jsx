// Page permettant de mettre à jour un projet
import { useEffect, useState } from "react";
import { useProjectList } from "../hooks/useProjectList";
import { StatusSelect } from "../components/StatusSelect";
import { SelectProjectDDL } from "../components/SelectProjectDDL";
import { API_URLS } from "../config/api";
import { useUpdateProject } from "../hooks/useUpdateProject";
import { useLocation, useParams } from "react-router-dom";

function UpdateProject() {

  const [initialProject, setInitialProject] = useState(null);
  const [projectId, setProjectId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const { projects, } = useProjectList();

  const { projectId: urlProjectId } = useParams();
  const location = useLocation();
  const passedProjectData = location.state?.projectData;

  // Effet pour initialiser selon la source de données
  useEffect(() => {
    // Si cas 1 : on a récupéré toutes les données du projet
    if (passedProjectData) {
      console.log("Cas projectData reçu");

      setInitialProject(passedProjectData);
      setProjectId(passedProjectData.id);
      setTitle(passedProjectData.title);
      setDescription(passedProjectData.description);
      setComment(passedProjectData.comment);
      setStatus(passedProjectData.status);
      return;
    }

    // Cas 2 : on a récupéré l'ID projet dans le lien URL
    if (urlProjectId) {
      console.log("Cas ID reçu dans l'URL");
      setProjectId(urlProjectId);
      return;
    }

    // Cas 3 : on a rien, accès à la page update direct
    console.log("Cas d'accès direct, aucun paramètre");
  }, [urlProjectId, passedProjectData]);

  // on charge les données du projet sélectionné
  useEffect(() => {
    if (!projectId || passedProjectData) return;  // Si données déjà récupérées on passe notre chemin !

    const loadProject = async () => {
      try {
        const projectIdInt = parseInt(projectId);
        const urlInitialProject = API_URLS.getProjectById(projectIdInt);

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
  }, [projectId, passedProjectData]);

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

  const showProjectSelector = !urlProjectId && ! passedProjectData;
  const showProjectForm = projectId && initialProject;

  return (
    <div>
      <h1>Update a project</h1>
      <form onSubmit={handleSubmit}>
        {showProjectSelector && (<SelectProjectDDL projects={projects} value={projectId} onChange={e => setProjectId(e.target.value)} label="Project to update : " required />)}

        {/* Affichage du nom du projet si on n'a pas la DDL ! */}
        {!showProjectSelector && initialProject && (
          <div style={{marginBottom:'1rem', fontWeight:'bold'}}>Editing {initialProject.title} ({initialProject.id})</div>
        )}
        {showProjectForm && (
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