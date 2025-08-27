import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userList from "../tools/userList";
import parseToInt from "../tools/parseToInt";

function DeleteUser() {
  const [userId, setUserId] = useState("");
  const {users, loadingUsers} = userList();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userIdInt = parseToInt(userId);

    fetch(`http://localhost:8000/users/${userIdInt}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json"}  // pas besoin de body lors du delete, paramètre dans l'URL
      })
      .then(async res => {
        if (!res.ok) { 
          const errorData = await res.json();
          throw new Error(errorData.Detail || "API error");
        }
        return res.json();
      })
      .then(() => {   // on récupère None donc pas de data sur un delete
        console.log("User deleted");
        navigate("/users");
      })
      .catch((err) => {
        console.log(err.message);
        alert(err.message);
      });
  };

  return (
    <div>
      <h1>Delete a user</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Choose a user to delete</label>
          <select value={userId} onChange={e => setUserId(e.target.value)} required >
            <option value="">-- Select a user --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                ID : {user.id} - {user.name}, {user.firstname}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}

export default DeleteUser;