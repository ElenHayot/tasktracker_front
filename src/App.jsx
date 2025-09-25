import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
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
import ProjectDetail from "./pages/ProjectDetail";
import './App.css';
import { AuthProvider } from "./hooks/useAuth";
import LoginUser from "./pages/LoginUser";
import HomePage from "./pages/HomePage";
import { Navigation } from "./components/Navigation";

function AppContent() {

  return (
    <div className="App">
      <Router>
        <Navigation />

        {/* Attention, l'ordre des routes compte, prise en compte de l'URL la plus spécifique d'abord à la plus générique à la fin */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/users/" element={<Users />} />
            <Route path="/users/details/:userId" element={<UserDetail />} />
            <Route path="/users/create-user" element={<CreateUser />} />
            <Route path="/users/update-user/:userId" element={<UpdateUser />} />
            <Route path="/users/update-user" element={<UpdateUser />} />
            <Route path="/users/delete-user" element={<DeleteUser />} />
            <Route path="/projects/" element={<Projects />} />
            <Route path="/projects/details/:projectId" element={<ProjectDetail />} />
            <Route path="/projects/create-project" element={<CreateProject />} />
            <Route path="/projects/update-project/:projectId" element={<UpdateProject />} />
            <Route path="/projects/update-project" element={<UpdateProject />} />
            <Route path="/projects/delete-project" element={<DeleteProject />} />
            <Route path="/tasks/" element={<Tasks />} />
            <Route path="/tasks/details/:taskId" element={<TaskDetail />} />
            <Route path="/tasks/create-task" element={<CreateTask />} />
            <Route path="/tasks/update-task/:taskId" element={<UpdateTask />} />
            <Route path="/tasks/update-task" element={<UpdateTask />} />
            <Route path="/tasks/delete-task" element={<DeleteTask />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

function AuthApp() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default AuthApp;