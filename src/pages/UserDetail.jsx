import { useNavigate, useParams } from "react-router-dom";
import { useUserById } from "../hooks/useUserById";
import { TaskItem } from "../components/TaskItem";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { useAuth } from "../hooks/useAuth";
import { usePermissions } from "../hooks/usePermissions";
import { PERMISSIONS } from "../../permissions.config";
import '../components/Components.css';
import './Pages.css';

function UserDetail() {
  const { userId } = useParams();
  const { user: userData, loading } = useUserById(userId);
  const { user: currentUser, } = useAuth();
  const navigate = useNavigate();
  const deleteUser = useDeleteUser();
  const { canAccess } = usePermissions();

  const handleUpdateButtonClick = () => {
    navigate(`/users/update-user/${userId}`, {
      state: { userData: userData }
    });
  };

  const handleDeleteButtonClick = () => {
    deleteUser(userId);
  };

  
  if (loading) {
    return (<div>Loading user data ...</div>);
  }
  if (!userData) {
    return (<div>Unfound user</div>);
  }

  // Optimisation - Définition des variables après les conditions de nullité => évite de vérifier si currentUser ou userData sont nuls (cas lors du premier render)
  const canUpdateUser = currentUser.id == userData.id || canAccess(PERMISSIONS.USERS_UPDATE);
  const canDeleteAccount = currentUser.id == userData.id || canAccess(PERMISSIONS.USERS_DELETE);

  return (
    <div className="space-y-4">
      <div className="relative pt-12">
        {canUpdateUser && (
          <button type="submit" onClick={handleUpdateButtonClick} className="update-btn">Edit</button>
        )}
        {canDeleteAccount && (
          <button type="submit" onClick={handleDeleteButtonClick} className="delete-btn">Delete account</button>
        )}
      </div>
      <div>
        <h1>{userData.name} {userData.firstname} - {userData.id}</h1>
        <div>
          <p>Name : {userData.name}</p>
          <p>FirstName : {userData.firstname}</p>
          <p>Email : {userData.email}</p>
          <p>Phone : {userData.phone}</p>
          <p>Role : {userData.role}</p>
          <div className="task-section">
            <label className="task-label">Associated tasks : </label>
            <div className="task-container selected-tasks">
              {userData.taskIds.length == 0 ? (<p>No associated task yet</p>) : (
                userData.taskIds.map(taskId => (
                  <TaskItem key={taskId} taskId={taskId} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default UserDetail;