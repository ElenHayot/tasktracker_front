import { useEffect, useState } from "react";
import { parseToInt } from "../utils/parseToInt";

export function useTaskById(taskId) {
  const [ task, setTask ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const taskIdInt = parseToInt(taskId);

  useEffect(() => {
    fetch(`http://localhost:8000/tasks/${taskIdInt}`)
    .then(response => response.json())
    .then(data => setTask(data))
    .catch(err => console.log(err.message))
    .finally(setLoading(false));
  }, [taskIdInt]);

  return { task };

}