import { useParams } from "react-router-dom";
import { useUserById } from "../hooks/useUserById";
import { TaskSelector } from "../components/TaskSelector";
import { useTaskById } from "../hooks/useTaskById";
import { TaskItem } from "../components/TaskItem";

function UserDetail() {
  const { userId } = useParams();
  console.log(`userId = ${userId}`);
  const { user, loading } = useUserById(userId);

  if (loading) {
    return(<div>Loading user data ...</div>);
  }
  if (!user) {
    return(<div>Unfound user</div>);
  }

  return (
    <div>
      <h1>{user.name} {user.firstname} - {user.id}</h1>
      <div>
        <p>Name : {user.name}</p>
        <p>FirstName : {user.firstname}</p>
        <p>Email : {user.email}</p>
        <p>Phone : {user.phone}</p>
        <p>Role : {user.role}</p>
        <div className="task-section">
          <label className="task-label">Associated tasks : </label>
          <div className="task-container selected-tasks">
            {user.task_ids.length == 0 ? (<p>No associated task yet</p>) : (
              user.task_ids.map(taskId => (
              <TaskItem key={taskId} taskId={taskId} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );

}

export default UserDetail;