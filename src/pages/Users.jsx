import userList from "../components/userList";
import ShowUsers from "../components/ShowUsers";

// monte le composant App (appelé dans main.jsx)
function Users() {
  const { users, loading} = userList();

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <ShowUsers users={users} />
    </div>
  );
}

export default Users;