import taskList from "./taskList";

export function getTaskById(taskId) {
    const { tasks, loading } = taskList();   // retourne la liste des tâches présentes en bdd

    return tasks.find(task => task.id == taskId);
}