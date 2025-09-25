import { useAuth } from "../hooks/useAuth";
import './LogoutButton.css';

export function LogoutButton() {
  const { logout, } = useAuth();
  return (
    <button className="logout-button" onClick={logout}>Disconnect</button>
  );
}