// Page permettant de créer un projet
import { useState } from "react";
import { StatusSelect } from "../components/StatusSelect";
import { useCreateProject } from "../hooks/useCreateProject";
import { validateRequired } from "../utils/validationFields";
import { useFormValidation } from "../hooks/useFormValidation";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { usePermissions } from "../hooks/usePermissions";
import { useNavigate } from "react-router-dom";

function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const { canAccess } = usePermissions();
  const navigate = useNavigate();

  const projectData = {
    title: title,
    description: description,
    comment: comment,
    status: status
  };

  const validationRules = {
    title: [
      (value) => validateRequired(value, 'Title')
    ],
  };

  const { errors, touched, validateField, validateAllFields, setFieldTouched } = useFormValidation(validationRules);
  const createProject = useCreateProject();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateAllFields(projectData);

    if (isValid) {

      try {
        await createProject(projectData);
      } catch (err) {
        console.log(err.message);
        alert(err.message);
      }
    } else {
      console.log(`Detected errors : `);
      Object.keys(errors).forEach(field => {
        if (errors[field]) {
          console.log(`- ${field} : ${errors[field]}`);
        }
      })
      setShowErrorModal(true);
    }

  };

  if(canAccess('projects_create')) {
  return (
    <div>
      <h1>Create a new project</h1>
      {!showErrorModal && (
        <form onSubmit={(handleSubmit)}>
          <div>
            <label>Title: </label>
            <input type="text" value={title} onChange={((e) => setTitle(e.target.value))} />
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
      )}

      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-red-600 mb-4">Detected errors : </h3>
            <ErrorDisplay errors={errors} touched={touched} />
            <button onClick={() => setShowErrorModal(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">CLOSE</button>
          </div>
        </div>
      )}
    </div>
  );
} else {
  return (
    <div>
      <h1>You can not access this page ! </h1>
      <p>- Missing permissions -</p>
      <button type="submit" onClick={() => navigate('/projects')}>Back to projects list</button>
    </div>
  )
  }
}

export default CreateProject;