import { useEffect, useState } from "react";
import { parseToInt } from "../utils/parseToInt";
import { useUserList } from "../hooks/useUserList";
import { RolesSelect } from "../components/RolesSelect";
import { SelectUserDDL } from "../components/SelectUserDDL";
import { TaskSelector } from "../components/TaskSelector";
import { API_URLS } from "../config/api";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useLocation, useParams } from "react-router-dom";
import { usePermissions } from "../hooks/usePermissions";

function UpdateUser() {

  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [taskIds, setTaskIds] = useState([]);
  const { users, } = useUserList();
  const [initialUser, setInitialUser] = useState(null);
  const { canAccess } = usePermissions();

  // Récupération des paramètres de navigation
  const { userId: urlUserId } = useParams(); // ID depuis l'URL
  const location = useLocation();
  const passedUserData = location.state?.userData;  // Données passées depuis Users

  // Effet pour initialiser selon la source des données 
  useEffect(() => {
    // Cas 1: Données complètes passées depuis la page Users
    if (passedUserData) {
      console.log("Mode : données passées depuis Users");
      setInitialUser(passedUserData);
      setUserId(passedUserData.id.toString());
      setEmail(passedUserData.email);
      setPhone(passedUserData.phone);
      setRole(passedUserData.role);
      setTaskIds(passedUserData.task_ids);
      return;
    }

    // Cas 2: ID passé dans l'URL (lien direct)
    if (urlUserId) {
      console.log("Mode : ID depuis l'URL");
      setUserId(urlUserId);
      return;
    }

    // Cas 3: Mode DDL - rien à faire ici
    console.log("Mode : DDL (accès direct)");
  }, [urlUserId, passedUserData]);

  // On charge les données de l’utilisateur sélectionné si données non chargées
  useEffect(() => {
    if (!userId || passedUserData) return;  // si données déjà reçues on ne fait rien bien sûr

    const loadUser = async () => {
      try {

        const userIdInt = parseToInt(userId);
        const urlInitialUser = API_URLS.getUserById(userIdInt);

        const response = await fetch(urlInitialUser);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} : ${response.statusText}`);
        }

        const data = await response.json();
        setInitialUser(data);  // on garde une copie pour comparer
        // Pré-remplir les champs
        setEmail(data.email);
        setPhone(data.phone);
        setRole(data.role);
        setTaskIds(data.task_ids);

      } catch (err) {
        console.error(err.message);
        alert(err.message);
      }
    };
    loadUser();

  }, [userId, passedUserData]); // on recharge à chaque changement de userId

  const updates = {
    email: email,
    phone: phone,
    role: role,
    task_ids: taskIds
  };

  const updateUser = useUpdateUser();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateUser(userId, initialUser, updates);
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }

  }

  // Gestion de l'affichage selon le mode
  const showUserSelector = !urlUserId && !passedUserData;
  const showUserForm = userId && initialUser;

  return (
    <div>
      <h1>Update a user</h1>
      <form onSubmit={handleSubmit}>
        {/* DDL uniquement si on vient en direct donc par de 'urlUserId' ni 'passedUserData' */}
        {showUserSelector && (<SelectUserDDL users={users} value={userId} onChange={e => setUserId(e.target.value)} label="User to update : " required />)}

        {/* Affichage du nom du user si on ne montre pas la DDL */}
        {!showUserSelector && initialUser && (
          <div style={{ marginBottom: '1rem', fontWeight: 'bold'}}>Editing : {initialUser.firstname} {initialUser.name} ({initialUser.id})</div>
        )}

        {showUserForm && (  // En JS, a && b veut dire : si a=false alors a, si a=true alors b
          <>
            <div>
              <label>Email: </label>
              <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label>Phone: </label>
              <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            {canAccess('roles') &&
              <div>
                <label>Role: </label>
                <RolesSelect value={role} onChange={setRole} />
              </div>
            }
            <TaskSelector selectedTaskIds={taskIds} onTaskIdsChange={setTaskIds} label="Associated tasks : " />
            <button type="submit">SUBMIT</button>
          </>
        )}
      </form>
    </div>
  );

}

export default UpdateUser;