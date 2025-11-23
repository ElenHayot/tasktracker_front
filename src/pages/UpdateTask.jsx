// Page permettant de mettre à jour une tâche
import { useEffect, useState } from "react";
import { useTaskList } from "../hooks/useTaskList";
import { useUserList } from "../hooks/useUserList";
import { StatusSelect } from "../components/StatusSelect";
import { SelectUserDDL } from "../components/SelectUserDDL";
import { SelectTaskDDL } from "../components/SelectTaskDDL";
import { API_URLS } from "../config/api";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { useLocation, useParams } from "react-router-dom";
import { mapTaskUpdatesForBackend } from "../config/backendMapper";

function UpdateTask() {

  const [initialTask, setInitialTask] = useState(null);
  const [taskId, setTaskId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const { tasks, } = useTaskList();
  const { users, } = useUserList();

  const { taskId: urlTaskId } = useParams();
  const location = useLocation();
  const passedTaskData = location.state?.taskData;

  // Effet pour initialiser selon la source de données
  useEffect(() => {
    // Cas 1 : on a récupéré toutes les données de la tâche
    if (passedTaskData) {
      console.log("Cas données reçues");
      setInitialTask(passedTaskData);
      setTaskId(passedTaskData.id);
      setTitle(passedTaskData.title);
      setDescription(passedTaskData.description);
      setComment(passedTaskData.comment);
      setUserId(passedTaskData.userId);
      setStatus(passedTaskData.status);
      return;
    }

    // Cas 2 : on a récupéré l'ID dans le lien URL
    if (urlTaskId) {
      console.log("Cas ID récupéré dans l'URL");
      setTaskId(urlTaskId); // initialisation des données dans le prochain useEffect
      return;
    }

    // Cas 3 : on a rien, accès direct sur la page (choix par DDL), on ne fait rien
    console.log("Cas d'accès direct, aucun paramètre");
  }, [urlTaskId, passedTaskData]);

  // On charge les données de la tâche sélectionnée
  useEffect(() => {
    if (!taskId || passedTaskData) return;

    const loadTask = async () => {
      try {
        const taskIdInt = parseInt(taskId);
        const urlInitialTask = API_URLS.getTaskById(taskIdInt);
        const response = await fetch(urlInitialTask);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} : ${response.statusText}`);
        }

        const data = await response.json();
        setInitialTask(data);
        setTitle(data.title);
        setDescription(data.description);
        setComment(data.comment);
        setUserId(data.user_id);
        setStatus(data.status);

      } catch (err) {
        console.error(err.message);
        alert(err.message);
      }
    };

    loadTask();
  }, [taskId, passedTaskData]); 

  // On mappe l'objet pour qu'il corresponde au type du backend avant de l'envoyer
  const updatesTmp = { title, description, comment, userId, status };
  const updates = mapTaskUpdatesForBackend(updatesTmp);

  const updateTask = useUpdateTask();

  const handleSubmit = async (event) => {
    event.preventDefault(); // empêche le rechargement de page

    // Nécessite une propriété name="title" etc... sur les div et moins de contrôle qu'avec un objet 
    //const formData = new FormData(event.target);
    //const updates = Object.fromEntries(formData);

    try {
      await updateTask(taskId, initialTask, updates);
    } catch (error) {
      console.error(error.message);
      alert(err.message);
    }
  };

  const showTaskSelector = !urlTaskId && !passedTaskData;
  const showTaskForm = taskId && initialTask;

  return (
    <div>
      <h1>Update a task</h1>
      <form onSubmit={handleSubmit}>
        {showTaskSelector && (<SelectTaskDDL tasks={tasks} value={taskId} onChange={e => setTaskId(e.target.value)} label="Task to update : " required />)}
        
        {/* Affichage du nom de la tâche si on ne montre pas de DDL */}
        {!showTaskSelector && initialTask && (
          <div style={{marginBottom:'1rem', fontWeight:'bold'}}>Edit {initialTask.title} ({initialTask.id})</div>
        )}

        {showTaskForm && (
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
            <SelectUserDDL users={users} value={userId} onChange={e => setUserId(e.target.value)} label="Affected user : " />
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

export default UpdateTask;