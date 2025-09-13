// Hook permettant de récupérer les données de l'utilisateur connecté
import { createContext, useContext, useEffect, useState } from "react";

// On crée "conteneur" vide qui contiendra nos données d'authentification
const AuthContext = createContext();

// Gestionnaire de données
export const AuthProvider = ({ children }) => {
  // Etats React pour stocker nos données
  const [user, setUser] = useState(null);     // Infos de l'utilisareur (null = pas connecté)
  const [loading, setLoading] = useState(true);       // true pendant qu'on vérifie que le user est connecté, false après
  const [token, setToken] = useState(localStorage.getItem('token'));  // Le token JWT stocké dans le navigateur (localStorage)

  // Fonction qui récupère les infos utilisateurs
  const fetchUserInfo = async () => {
    // Si pas de token == si user pas connecté
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // On demande à l'API les infos du user connecté
      const response = await fetch(`http://localhost:8000/me`, {
        header: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Token invalide, on le supprime
        localStorage.removeItem('token');
        setToken(null);
      }
    } catch (error) {
      console.error(`Erreur lors de la récupération des infos de l'utilisateur: `, error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect pour déclencher quand le composant se monte ou que 'token' change (connexion/déconnexion)
  useEffect(() => {
    fetchUserInfo();
  }, [token]);

  // On fournit les données à tous les composants
  // On remplit notre boîte magique AuthContext
  // children = tous les composants enfants qui pourront accéder à ces données
  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, loading }}>{children}</AuthContext.Provider>
  );
};

// Cette fonction permettra aux composants d'accéder aux données contenues dans AuthContext
export const useAuth = () => useContext(AuthContext);