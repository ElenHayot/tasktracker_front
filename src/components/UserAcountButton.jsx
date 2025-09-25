import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function UserAcountButton() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(
      `/users/details/${user.id}`
    );
  };

  return (
    <button type="submit" onClick={handleClick}>Account</button>
  );

}