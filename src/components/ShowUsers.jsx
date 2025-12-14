// Composant affichant la liste des utilisateurs
import { Link, useNavigate } from "react-router-dom";
import './Components.css';
import { usePermissions } from "../hooks/usePermissions";
import { PERMISSIONS } from "../../permissions.config";

export function ShowUsers({ users }) {
  const navigate = useNavigate();
  const { canAccess } = usePermissions();

  const handleEditUserWithData = (user) => {
    navigate(`/users/update-user`, {
      state: { userData: user }  // on passe toutes les données
    });
  };

  return (
    <ul className="space-y-12">
      {users.map((user) => (
        <li key={user.id} className="list-container">
          <p className="label">ID : {user.id} {'>>'}</p>
          <span className="label-container">
            <label className="label">{user.firstname} {user.name} </label>
            <span>
              <label className="label">Email : </label>
              <label className="email">{user.email}</label>
            </span>
            <span>
              <label className="user-role">{user.role}</label>
            </span>
          </span>
          <div className="relative-pt-12">
            <Link to={`/users/details/${user.id}`} className="link-container">Details</Link>
            {canAccess(PERMISSIONS.USERS_UPDATE) &&
              /* Bouton en passant les données complètes (plus efficace) */
              < button onClick={() => handleEditUserWithData(user)} className="cpnt-update-btn">Edit</button>
            }
          </div>
        </li>
      ))
      }
    </ul >
  );
}