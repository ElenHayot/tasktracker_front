import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import parseToInt from "../tools/parseToInt";
import userList from "../tools/userList";
import { getModifiedFields } from "../tools/getModifiedFields";
import RolesSelect from "../components/RolesSelect";
import { SelectUserDDL } from "../components/SelectUserDDL";
import { TaskSelector } from "../components/TaskSelector";

function UpdateUser() {

  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [taskIds, setTaskIds] = useState([]);
  const navigate = useNavigate();
  const { users, loadingUsers } = userList();
  const [initialUser, setInitialUser] = useState(null);

  // On charge les donées de l’utilisateur sélectionné
  useEffect(() => {
    if (!userId) return;

    const userIdInt = parseToInt(userId);

    fetch(`http://localhost:8000/users/${userIdInt}`)
      .then(response => response.json())  // transforme la réponse http en objet JavaScript
      .then(data => {
        setInitialUser(data);  // on garde une copie pour comparer
        // Pré-remplir les champs
        setEmail(data.email);
        setPhone(data.phone);
        setRole(data.role);
        setTaskIds(data.task_ids);
      })
      .catch(err => {
        console.error(err.message);
        alert(`Can't load user data for user ID "${userId}".`);
      });
  }, [userId]); // on recharge à chaque changement de userId

  const updates = {
    email: email,
    phone: phone,
    role: role,
    task_ids: taskIds
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userIdInt = parseToInt(userId);
    const payloadUpdates = initialUser ? getModifiedFields(initialUser, updates) : {};

    fetch(`http://localhost:8000/users/${userIdInt}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadUpdates)
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.Detail || `API error`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(`User with ID "${userId}" updated`);
        navigate(`/users`);
      })
      .catch(err => {
        console.log(err.message);
        alert(err.message);
      });
  }

  return (
    <div>
      <h1>Update a user</h1>
      <form onSubmit={handleSubmit}>
        <SelectUserDDL users={users} value={userId} onChange={e => setUserId(e.target.value)} label="User to update : " required />

        {userId && (  // En JS, a && b veut dire : si a=false alors a, si a=true alors b
          <>
            <div>
              <label>Email: </label>
              <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label>Phone: </label>
              <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div>
              <label>Role: </label>
              <RolesSelect value={role} onChange={setRole} />
            </div>
            <TaskSelector selectedTaskIds={taskIds} onTaskIdsChange={setTaskIds} label="Associated tasks : " />
            <button type="submit">SUBMIT</button>
          </>
        )}
      </form>
    </div>
  );

}

export default UpdateUser;