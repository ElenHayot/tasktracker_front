// Composant affichant une tâche inclue dans une liste
import { useTaskById } from "../hooks/useTaskById";

export function TaskItem({ taskId }) {
    const { task, loading } = useTaskById(taskId);
    if (loading) return (<div className="task-item">Loading task {taskId}...</div>);
    
    return (
        <div className="task-item">
            ID : {taskId} - {task ? task.title : "Unknown task"}
        </div>
    );

}