import { useAuth } from "../hooks/useAuth"

// Composant principal de l'application
export const DashBoard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-content">
          <div className="nav-left">
            <h1 className="app-title">My application</h1>
          </div>
          <div className="nav-right">
            <span className="user-greeting">Hello, {user?.firstname} {user?.name}</span>
            <button className="logout-button" onClick={logout}>Disconnect</button>
          </div>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="main-content">
          <div className="welcome-card">
            <div className="welcome-content">
              <h2 className="welcome-title">Welcome to your workspace !</h2>
              <p className="welcome-text">You're connected as <strong>{user?.role}</strong></p>
              <p className="user-info">ID: {user?.id} | Email: {user?.email}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}