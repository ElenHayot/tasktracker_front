import { useEffect, useState } from "react";

function StatusSelect({value, onChange}){
    const [status, setStatus] = useState([]);

    // Je définis "status" en récupérant les valeurs du fetch et je les stocke dans mon state
    useEffect(() => {
        fetch("http://localhost:8000/status/")
        .then(res => res.json())
        .then(data => setStatus(data))
        .catch(console.error)
    }, []);

    // Je parcoure status (status.map) et récupère chacune de ses valeurs {key, value}
    // J'affiche un select et j'envoie la valeur sélectionnée (onChange)
    return (
        <select value={value} onChange={e => onChange(e.target.value)}>
            <option value="">-- Chose a status --</option>
            {status.map((s) => (
                <option key={s} value={s}>
                    {s}
                </option>
            ))}
        </select>
    );
}

export default StatusSelect;