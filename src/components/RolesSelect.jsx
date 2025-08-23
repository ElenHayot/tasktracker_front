import { useEffect, useState } from "react";

function RolesSelect({value, onChange}) {
    const[roles, setRoles] = useState([]);

    // Je définis "roles" en récupérant les valeurs du fetch et je les stocke dans mon state
    useEffect(() => {
        fetch("http://localhost:8000/roles/")
        .then((res) => res.json())
        .then((data) => setRoles(data))
        .catch(console.error);
    }, []); // [] : on n'éxecute qu'une fois ce code au lancement du composant

    // Je parcoure roles (roles.map()) et récupère toutes les valeurs de l'enum {key, value} 
    // J'affiche un select et j'envoie la valeur sélectionnée (onChange)
    return (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="">-- Choose a role --</option>
            {roles.map(role => (
                <option key={role} value={role}>{role}</option>
            ))}
        </select>
    );
}

export default RolesSelect;