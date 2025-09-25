import { useState } from "react"
import { useAuth } from "../hooks/useAuth";
import './LoginForm.css';
import { useLocation, useNavigate } from "react-router-dom";

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/';


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const result = await login(email, password);

    if (!result.success) {
      setError(result.message);
    }

    // Reset password field pour sécurité
    setPassword("");
    navigate(redirectTo);
  };

  const handleKeyPress = (event) => {
    if (event.key == "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">Login to your account</h2>
          <p className="login-subtitle">Log to access the application</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-inputs">
            <div className="input-group">
              <label htmlFor="email" className="sr-only">Email</label>
              <input className="form-input input-top" 
              id="email" name="email" type="email" 
              value={email} onChange={(e) => setEmail(e.target.value)} 
              placeholder="Mail address" disabled={loading} 
              onKeyUp={handleKeyPress} required />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="sr-only">Password</label>
              <input className="form-input input-bottom"
              id="password" name="password" type="password"
              value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Password" disabled={loading}
              onKeyUp={handleKeyPress} required />
            </div> 
          </div>

          {error && (
            <div className="error-message">{error}</div>
          )}

          <div className="submit-container">
            <button className="submit-button" type="submit" disabled={loading}>
              {loading ? (
                <span className="loading-content">
                  <div className="spinner"></div>
                  Connexion...
                </span>
              ) : ("Log-in")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}