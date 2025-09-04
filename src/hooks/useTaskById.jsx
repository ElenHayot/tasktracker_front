import { useEffect, useState } from "react";
import { parseToInt } from "../utils/parseToInt";

export function useTaskById(taskId) {

  const [ task, setTask ] = useState(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {

    if(!taskId) {
      console.log("taskId is null or undefined");
      setLoading(false);
      return;
    }

    try{
      const taskIdInt = parseToInt(taskId);

      fetch(`http://localhost:8000/tasks/${taskIdInt}`)
      .then(response => response.json())
      .then(data => setTask(data))
      .catch(err => console.log(err.message))
      .finally(() => setLoading(false));

    } catch (error) {
      console.error("Error parsing taskId : ", error.message);
      setTask(null);
      setLoading(false);
    }
    
  }, [taskId]);

  return { task, loading };

}