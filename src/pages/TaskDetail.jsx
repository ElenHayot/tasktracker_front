// Page affichant le détail d'une tâche

import { useEffect, useState } from "react";
import { useTaskById } from "../hooks/useTaskById";

export function TaskDetail(taskId) {

  useEffect(() => {
    if (!taskId) return;
    const task = taskId ? useTaskById(taskId) : null;

  }, [taskId]);

  return (
    <div>
      <h1>{task.title} - {task.id}</h1>
      <div>
        <p>Description : </p>
        <div>{task.description}</div>
        <p>Associated project : {task.project_id}</p>
        <p>Associated user : {task.user_id}</p>
        <p>Status : {task.status}</p>
        <p>Comment : </p>
        <div>{task.comment}</div>
      </div>
    </div>
  );
}