import { useLocation, useNavigate } from "react-router-dom";

export function LoginButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    navigate("/login", {
      state: { from: location.pathname}
    });
  };

  return (
    <button className="login-button" type="submit" onClick={handleLoginClick}>Login</button>
  );
}