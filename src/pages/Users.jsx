import { useUserList } from "../hooks/useUserList";
import { ShowUsers } from "../components/ShowUsers";
import { useNavigate } from "react-router-dom";
import './Pages.css';
import { usePermissions } from "../hooks/usePermissions";
import { PERMISSIONS } from "../../permissions.config";

// monte le composant App (appelé dans main.jsx)
function Users() {
  const { users, loading } = useUserList();
  const navigate = useNavigate();
  const { canAccess } = usePermissions();

  const handleCreate = () => {
    navigate("/users/create-user");
  }

  if (loading) return <p>Loading...</p>;
  return (
    <div className="relative pt-12">
      {(canAccess(PERMISSIONS.USERS_CREATE)) && <button type="submit" onClick={handleCreate} className="create-btn">New</button>}
      <div>
        <h1>Liste des utilisateurs</h1>
        <ShowUsers users={users} />
      </div>
    </div>
  );
}

export default Users;