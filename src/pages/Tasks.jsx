import { useEffect, useState } from "react";

// monte le composant App (appelé dans main.jsx)
function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/tasks")  // ton backend FastAPI
      .then(response => response.json())  // transforme la réponse http en objet JavaScript
      .then(data => setTasks(data))       // stocke le résultat dans "tasks"
      .catch(error => console.error(error));
  }, []);   // [] veut dire: exécuter ce code qu'une seule fois au montage du composant

   // x.map() parcoure le tableau des données x
   // chaque "li" doit avoir une clef unique (ici PK de x) pour que React puisse identifier chaque élément

  return (
    <div>
      <h1>Liste des tâches</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            title = {task.title} : status = {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;