import { useState } from "react";
import { useUserList } from "../hooks/useUserList";
import { SelectUserDDL } from "../components/SelectUserDDL";
import { useDeleteUser } from "../hooks/useDeleteUser";

function DeleteUser() {
  const [userId, setUserId] = useState("");
  const { users, } = useUserList();
  const deleteUser = useDeleteUser();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await deleteUser(userId);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
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