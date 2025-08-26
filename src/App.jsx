import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Users from "./pages/Users";
import Tasks from "./pages/Tasks";
import Projects from "./pages/Projects";
import CreateUser from "./pages/CreateUser";
import CreateProject from "./pages/CreateProject";
import CreateTask from "./pages/CreateTask";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/users">Users</Link> |{" "}
        <Link to="/tasks">Tasks</Link> |{" "}
        <Link to="/projects">Projects</Link> |{" "}
        <Link to="/users/create">Create user</Link> |{" "}
        <Link to="/projects/create">Create project</Link> |{" "}
        <Link to="/tasks/create">Create task</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Bienvenue 👋</h1>} />
        <Route path="/users" element={<Users />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/projects/create" element={<CreateProject />} />
        <Route path="/tasks/create" element={<CreateTask />} />
      </Routes>
    </Router>
  );
}

export default App;