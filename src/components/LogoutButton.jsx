import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import './LogoutButton.css';

export function LogoutButton() {
  const { logout, } = useAuth();
  const navigate = useNavigate();

  const handleOnClick = () => {
    logout();
    navigate('/');
  };

  return (
    <button className="logout-button" onClick={handleOnClick}>Disconnect</button>
  );
}