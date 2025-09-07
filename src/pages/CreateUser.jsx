import { useState } from "react";
import { RolesSelect } from "../components/RolesSelect";
import { TaskSelector } from "../components/TaskSelector";
import { useCreateUser } from "../hooks/useCreateUser";

function CreateUser() {
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [taskIds, setTaskIds] = useState("");

  const userData = {
    name: name,
    firstname: firstname,
    email: email,
    phone: phone,
    role: role,
    task_ids: taskIds ? taskIds.map(Number) : ""
  };

  const createUser = useCreateUser();

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {
      await createUser(userData);
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }

  };

  return (
    <div>
      <h1>Create a new user</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Firstname: </label>
          <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
        </div>
        <div>
          <label>Email: </label>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Phone : </label>
          <input type="text" value={phone} onChange={((e) => setPhone(e.target.value))} />
        </div>
        <div>
          <label>Role: </label>
          <RolesSelect value={role} onChange={setRole} />
        </div>
        <div>
          <label>Task ids list : </label>
          <TaskSelector selectedTaskIds={taskIds} onTaskIdsChange={setTaskIds} label="Associated tasks : " />
        </div>
        <button type="submit">CREATE</button>
      </form>
    </div>
  );
}

export default CreateUser;