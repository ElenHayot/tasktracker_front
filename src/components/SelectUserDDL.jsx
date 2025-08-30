// Elément affichant la liste des IDs des users

export function SelectUserDDL({users, value, onChange, label="User : ", placeHolder="-- Select a user --"}) {

  return (
    <div>
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        <option value="">{placeHolder}</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            ID : {user.id} - {user.name}, {user.firstname}
          </option>
        ))}
      </select>
    </div>
  );

}
