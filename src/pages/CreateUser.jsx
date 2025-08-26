import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RolesSelect from "../components/RolesSelect";
import { cleanObject } from "../tools/cleanObjects";

function CreateUser() {
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [taskIds, setTaskIds] = useState("");
  const navigate = useNavigate();

  const userData = {
    name: name,
    firstname: firstname,
    email: email,
    phone: phone,
    role: role,
    task_ids: taskIds ? taskIds.map(Number) : ""
  };

  const payload = cleanObject(userData);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();   // récupère le JSON d'erreur
          throw new Error(errorData.Detail || "API error");
        }
        return res.json();
      })
      .then((data) => {
        console.log("User created : ", data);
        navigate("/users"); // 👈 redirige vers la liste des users
      })
      .catch((err) => {
        console.error("Error : ", err.message);
        alert("Error : " + err.message); // afficher sur l'UI si on veut
      });
  };

  return (
    <div>
      <h1>Create a new user</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Firstname: </label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone : </label>
          <input
            type="text"
            value={phone}
            onChange={((e) => setPhone(e.target.value))}
          />
        </div>
        <div>
          <label>Role: </label>
          <RolesSelect value={role} onChange={setRole} />
        </div>
        <div>
          <label>Task ids list : </label>
          <input
            type="text"
            value={taskIds}
            onChange={(e) => setTaskIds(e.target.value.split(","))}
            placeholder="Ex: 1,2,3"
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateUser;