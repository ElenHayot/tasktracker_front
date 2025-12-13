import { useAuth } from "../hooks/useAuth";
import { LoginButton } from "../components/LoginButton";
import { DashBoard } from "../components/DashBoard";

// Composant racine avec gestion de l'authentification
const HomePage = () => {
  const { user, token } = useAuth();

  // Si pas de token ou pas d'utilisateur, on affiche la page d'authentification
  if (!token || !user) {
    return (
      <div>
        <h1>Bienvenue !</h1>
        <p>Veuillez vous connecter pour continuer</p>
        <LoginButton />
      </div>
    );
  }

  // Sinon on affiche le dashboard
  return <DashBoard />;
}

export default HomePage;