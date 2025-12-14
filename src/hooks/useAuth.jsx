// Hook permettant de récupérer les données de l'utilisateur connecté
import { createContext, useContext, useEffect, useState } from "react";
import { API_URLS } from "../config/api";
import { mapRoles } from "../config/backendMapper";

// On crée "conteneur" vide qui contiendra nos données d'authentification
const AuthContext = createContext();

// Gestionnaire de données
export const AuthProvider = ({ children }) => {
  // Etats React pour stocker nos données
  const [user, setUser] = useState(null);     // Infos de l'utilisateur (null = pas connecté)
  const [loading, setLoading] = useState(false);       // true pendant qu'on vérifie que le user est connecté, false après
  const [token, setToken] = useState(localStorage.getItem('token'));  // Le token JWT stocké dans le navigateur (localStorage)

  // Fonction de connexion
  const login = async (email, password, path = '/') => {
    setLoading(true);
    try {
      const urlLogin = API_URLS.getLogin();
      console.log(`useAuth, urlLogin = ${urlLogin}`);
      const response = await fetch(urlLogin, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {

        await catchTokenAndUser(response);
        return { success: true };

      } else {
        const error = await response.json();
        return { success: false, message: error.detail || "Login error" };
      }

    } catch (error) {
      return { success: false, message: "Network error" };
    } finally {
      setLoading(false);
    }
  };

  const catchTokenAndUser = async (response) => {
    const data = await response.json();
    setToken(data.access_token || data.accessToken);
    localStorage.setItem("token", data.access_token || data.accessToken);

    // Case user info sent in response - else call fetchUserInfo
    if (data.user) {
      setUser(data.user);
    }
    else {
      await fetchUserInfo(data.access_token || data.accessToken);
    }
  };

  // Fonction qui récupère les infos utilisateurs
  const fetchUserInfo = async (authToken) => {
    // Si pas de token == si user pas connecté
    if (!authToken) {
      setLoading(false);
      return;
    }

    try {
      const urlMe = API_URLS.getMe();
      // On demande à l'API les infos du user connecté
      const response = await fetch(urlMe, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData, role = mapRoles(userData.role));
      }  else if (response.status == '401') {

        try {
          const urlRefresh = API_URLS.getRefresh();
          const response = await fetch(urlRefresh, {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type": "application/json"}
          });

          if (response.ok) {
            await catchTokenAndUser(response);
          } else { 
            // Refresh token invalide, on déconnecte le user
            logout(); 
          }

        } catch (error) {
          return { success: false, message: "Network error" };
        }
      } else {
        // Token invalide, on déconnecte le user
        logout();
      }
    } catch (error) {
      console.error(`Erreur lors de la récupération des infos de l'utilisateur: `, error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  }

  // useEffect pour déclencher quand le composant se monte ou que 'token' change (connexion/déconnexion)
  useEffect(() => {
    if (token && !user) {
      fetchUserInfo(token);
    } else if (!token && !user) {
      console.log(`useAuth - useEffect : !token & !user`);
      setUser({ id: null, role: 'Guest', name: 'Doe', firstname: 'John' });
    }
  }, [token, user]);

  // On fournit les données à tous les composants
  // On remplit notre boîte magique AuthContext
  // children = tous les composants enfants qui pourront accéder à ces données
  const value = {
    user,
    token,
    login,
    logout,
    loading
  };
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

// Cette fonction permettra aux composants d'accéder aux données contenues dans AuthContext
export const useAuth = () => useContext(AuthContext);