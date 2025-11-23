// Page permettant de créer une tâche
import { useState } from "react";
import { StatusSelect } from "../components/StatusSelect";
import { useProjectList } from "../hooks/useProjectList";
import { useUserList } from "../hooks/useUserList";
import { SelectProjectDDL } from "../components/SelectProjectDDL";
import { SelectUserDDL } from "../components/SelectUserDDL";
import { useCreateTask } from "../hooks/useCreateTask";
import { validateRequired } from "../utils/validationFields";
import { useFormValidation } from "../hooks/useFormValidation";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { mapTaskCreateForBackend } from "../config/backendMapper";

function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [projectId, setProjectId] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const { projects, } = useProjectList();
  const { users, } = useUserList();
  const [showErrorModal, setShowErrorModal] = useState(false);

  // On mappe l'objet pour qu'il corresponde au type du backend avant de l'envoyer
  const taskDataTmp = { title, description, comment, projectId, userId, status };
  const taskData = mapTaskCreateForBackend(taskDataTmp);

  const validationRules = {
    title: [
      (value) => validateRequired(value, 'Title')
    ],
    // Attention ! le fieldName doit être le même que celui de l'objet envoyé à validateAllField (ici project_id au lieu de projectId)
    // Exception si on a un objet TMP (pour gestion de fieldnames en backend), on s'appuie sur les fieldnames de celui-ci
    projectId: [
      (value) => validateRequired(value, 'Project ID')
    ]
  };
  const { errors, touched, validateField, validateAllFields, setFieldTouched } = useFormValidation(validationRules);

  const createTask = useCreateTask();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateAllFields(taskDataTmp);
    if (isValid) {
      try {
        await createTask(taskData);
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    } else {
      console.log(`Detected errors : `);
      Object.keys(errors).forEach(field => {
        if (errors[field]) {
          console.log(`- ${field} : ${errors[field]}`);
        }
      });
      setShowErrorModal(true);
    }

  };

  return (
    <div>
      <h1>Create a new task</h1>
      {!showErrorModal && (
        <form onSubmit={(handleSubmit)}>
          <div>
            <label>Title: </label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label>Description: </label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <label>Comment: </label>
            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
          </div>
          <SelectProjectDDL projects={projects} value={projectId} onChange={(e) => setProjectId(e.target.value)} />
          <SelectUserDDL users={users} value={userId} onChange={(e) => setUserId(e.target.value)} />
          <div>
            <label>Status: </label>
            <StatusSelect value={status} onChange={setStatus} />
          </div>
          <button type="submit">CREATE</button>
        </form>
      )}

      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-red-600 mb-4">Detected errors : </h3>
            <ErrorDisplay errors={errors} touched={touched} />
            <button type="submit" onClick={() => setShowErrorModal(false)}>CLOSE</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateTask;