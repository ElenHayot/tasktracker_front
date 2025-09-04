import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Users from "./pages/Users";
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";
import CreateUser from "./pages/CreateUser";
import CreateProject from "./pages/CreateProject";
import CreateTask from "./pages/CreateTask";
import DeleteUser from "./pages/DeleteUser";
import DeleteTask from "./pages/DeleteTask";
import DeleteProject from "./pages/DeleteProject";
import UpdateUser from "./pages/UpdateUsers";
import UpdateTask from "./pages/UpdateTask";
import UpdateProject from "./pages/UpdateProject";
import TaskDetail from "./pages/TaskDetail";
import UserDetail from "./pages/UserDetail";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/users">Users</Link> |{" "}
        <Link to="/tasks">Tasks</Link> |{" "}
        <Link to="/projects">Projects</Link> |{" "}
        <Link to="/users/create">Create user</Link> |{" "}
        <Link to="/projects/create">Create project</Link> |{" "}
        <Link to="/tasks/create">Create task</Link> |{" "}
        <Link to="/users/delete">Delete user</Link> |{" "}
        <Link to="/tasks/delete">Delete task</Link> |{" "}
        <Link to="/projects/delete">Delete Project</Link> |{" "}
        <Link to="/users/update">Update user</Link> |{" "}
        <Link to="/tasks/update">Update task</Link> |{" "}
        <Link to="/projects/update">Update project</Link> |{" "}
        <Link to="/tasks/details/:taskId">Task details</Link> |{" "}
        <Link to="/users/details/:userId">User details</Link> |{" "}
      </nav>

      <Routes>
        <Route path="/" element={<h1>Bienvenue 👋</h1>} />
        <Route path="/users" element={<Users />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/projects/create" element={<CreateProject />} />
        <Route path="/tasks/create" element={<CreateTask />} />
        <Route path="/users/delete" element={<DeleteUser />} />
        <Route path="/tasks/delete" element={<DeleteTask />} />
        <Route path="/projects/delete" element={<DeleteProject />} />
        <Route path="/users/update" element={<UpdateUser />} />
        <Route path="/tasks/update" element={<UpdateTask />} />
        <Route path="/projects/update" element={<UpdateProject />} />
        <Route path="/tasks/details/:taskId" element={<TaskDetail />} />
        <Route path="/users/details/:userId" element={<UserDetail />} />
      </Routes>
    </Router>
  );
}

export default App;