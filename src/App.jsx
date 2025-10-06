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
import { usePermissions } from "./hooks/usePermissions";
import { PERMISSIONS } from "../permissions.config";

function AppContent() {
  const { canAccess } = usePermissions();

  return (
    <div className="app">
      <Router>
        <Navigation />

        {/* Attention, l'ordre des routes compte, prise en compte de l'URL la plus spécifique d'abord à la plus générique à la fin */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginUser />} />
            {canAccess(PERMISSIONS.USERS_READ) && (
              <>
                <Route path="/users/" element={<Users />} />
                <Route path="/users/details/:userId" element={<UserDetail />} />
              </>
            )}
            {canAccess(PERMISSIONS.USERS_CREATE) && (<Route path="/users/create-user" element={<CreateUser />} />)}
            {canAccess(PERMISSIONS.USERS_UPDATE) && (
              <>
                <Route path="/users/update-user/:userId" element={<UpdateUser />} />
                <Route path="/users/update-user" element={<UpdateUser />} />
              </>
            )}
            {canAccess(PERMISSIONS.USERS_DELETE) && (<Route path="/users/delete-user" element={<DeleteUser />} />)}
            {canAccess(PERMISSIONS.PROJECTS_READ) && (
              <>
                <Route path="/projects/" element={<Projects />} />
                <Route path="/projects/details/:projectId" element={<ProjectDetail />} />
              </>
            )}
            {canAccess(PERMISSIONS.PROJECTS_CREATE) && (<Route path="/projects/create-project" element={<CreateProject />} />)}
            {canAccess(PERMISSIONS.PROJECTS_UPDATE) && (
              <>
                <Route path="/projects/update-project/:projectId" element={<UpdateProject />} />
                <Route path="/projects/update-project" element={<UpdateProject />} />
              </>
            )}
            {canAccess(PERMISSIONS.PROJECTS_DELETE) && (<Route path="/projects/delete-project" element={<DeleteProject />} />)}
            {canAccess(PERMISSIONS.TASKS_READ) && (
              <>
                <Route path="/tasks/" element={<Tasks />} />
                <Route path="/tasks/details/:taskId" element={<TaskDetail />} />
              </>
            )}
            {canAccess(PERMISSIONS.TASKS_CREATE) && (<Route path="/tasks/create-task" element={<CreateTask />} />)}
            {canAccess(PERMISSIONS.TASKS_UPDATE) && (
              <>
                <Route path="/tasks/update-task/:taskId" element={<UpdateTask />} />
                <Route path="/tasks/update-task" element={<UpdateTask />} />
              </>
            )}
            {canAccess(PERMISSIONS.TASKS_DELETE) && (<Route path="/tasks/delete-task" element={<DeleteTask />} />)}
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