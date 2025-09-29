import { useState } from "react";
import { RolesSelect } from "../components/RolesSelect";
import { TaskSelector } from "../components/TaskSelector";
import { useCreateUser } from "../hooks/useCreateUser";
import { validateEmail, validatePassword, validatePhone, validateRequired } from "../utils/validationFields";
import { useFormValidation } from "../hooks/useFormValidation";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { usePermissions } from "../hooks/usePermissions";

function CreateUser() {
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [taskIds, setTaskIds] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const { canAccess } = usePermissions();

  const userData = {
    name,
    firstname,
    email,
    phone,
    role,
    //task_ids: taskIds ? taskIds.map(Number) : "",
    password
  };

  const validationRules = {
    name: [
      (value) => validateRequired(value, 'Name')
    ],
    firstname: [
      (value) => validateRequired(value, 'Firstname')
    ],
    email: [
      (value) => validateRequired(value, `Email`),
      (value) => validateEmail(value) ? "" : "Email format is invalid"
    ],
    phone: [
      (value) => value ? (validatePhone(value) ? "" : "Phone format is invalid") : ""
    ],
    password: [
      (value) => validateRequired(value, 'Password'),
      (value) => validatePassword(value)
    ]
  };

  const { errors, touched, validateField, validateAllFields, setFieldTouched } = useFormValidation(validationRules);
  const createUser = useCreateUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateAllFields(userData);

    if (isValid) {
      try {
        await createUser(userData);
      } catch (err) {
        console.log(err.message);
        alert(err.message);
      }
    } else {
      console.log(`Erreurs détectées : `);
      Object.keys(errors).forEach(field => {
        if (errors[field]) {
          console.log(`- ${field} : ${errors[field]}`);
        }
      })
      // Affiche le composant ErrorDisplay
      setShowErrorModal(true);
    }

  };

  return (
    <div>
      <h1>Create a new user</h1>
      {!showErrorModal && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name: </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Firstname: </label>
            <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
          </div>
          <div>
            <label>Email: </label>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div>
            <label>Phone : </label>
            <input type="text" value={phone} onChange={((e) => setPhone(e.target.value))} />
          </div>
          {canAccess('roles') && (
            <div>
              <label>Role: </label>
              <RolesSelect value={role} onChange={setRole} />
            </div>
          )}
          {/* // Vraiment utile d'associer des tâches lors de la création d'un user ??
          <div>
            <label>Task ids list : </label>
            <TaskSelector selectedTaskIds={taskIds} onTaskIdsChange={setTaskIds} label="Associated tasks : " />
          </div>*/}
          <button type="submit">CREATE</button>
        </form>)}

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
}

export default CreateUser;