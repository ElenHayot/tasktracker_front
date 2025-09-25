// Composant pour la navigation qui connait l'URL courante
import { useAuth } from "../hooks/useAuth";
import { useLocation } from "react-router-dom";
import { BurgerMenu } from "./BurgerMenu";
import { LogoutButton } from "./LogoutButton";
import { LoginButton } from "./LoginButton";
import { HomeButton } from "./HomeButton";
import './Navigation.css';
import { UserAcountButton } from "./UserAcountButton";

export function Navigation() {
  const { user, token } = useAuth();
  const location = useLocation();
  const isConnected = user && token;

  // Pages où l'on ne veut pas afficher le LoginButton
  const pagesWithoutLoginButton = ['/', '/login'];
  const shouldShowLoginButton = !pagesWithoutLoginButton.includes(location.pathname);

  return (
    <>
      <div className="fixed-buttons-container-left">
        <BurgerMenu />
        <HomeButton />
      </div>
      {isConnected ? (<div className="fixed-buttons-container-right"><LogoutButton /> <UserAcountButton /></div>) : (shouldShowLoginButton && <LoginButton />)}
    </>
  )

}