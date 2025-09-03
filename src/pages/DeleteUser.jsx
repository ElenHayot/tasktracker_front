import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserList } from "../hooks/useUserList";
import { parseToInt } from "../utils/parseToInt";
import { SelectUserDDL } from "../components/SelectUserDDL";

function DeleteUser() {
  const [userId, setUserId] = useState("");
  const { users, loadingUsers } = useUserList();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userIdInt = parseToInt(userId);

    fetch(`http://localhost:8000/users/${userIdInt}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }  // pas besoin de body lors du delete, paramètre dans l'URL
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
        <SelectUserDDL users={users} value={userId} onChange={e => setUserId(e.target.value)} label="User to delete : " required />
        <button type="submit">DELETE</button>
      </form>
    </div>
  );
}

export default DeleteUser;