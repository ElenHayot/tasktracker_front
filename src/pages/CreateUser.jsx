import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RolesSelect from "../components/RolesSelect";

function CreateUser() {
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, firstname, email, role }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();   // récupère le JSON d'erreur
          throw new Error(errorData.Detail || "Erreur API");
        }
        return res.json();
      })
      .then((data) => {
        console.log("User créé :", data);
        navigate("/users"); // 👈 redirige vers la liste des users
      })
      .catch((err) => {
          console.error("Erreur : ", err.message);
          alert("Erreur : " + err.message); // afficher sur l'UI si on veut
      });
  };

  return (
    <div>
      <h1>Créer un utilisateur</h1>
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
          <label>Role: </label>
          <RolesSelect value={role} onChange={setRole} />
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}

export default CreateUser;