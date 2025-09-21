import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/

// Désactiver la vérification SSL pour node-fetch, autrement, impossible de try fetch en HTTPS
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// Fonction pour détecter si le backend HTTPS est disponible (autrement on choiti HTTP)
const detectBackendProtocol = async () => {
  try {
    // Test rapide pour voir si le backend HTTPS répond
    console.log('Test HTTPS');
    const httpsResponse = await fetch(`https://localhost:8000/ssl-status`, {
      method: "GET",
      signal: AbortSignal.timeout(1000) // Timeout de 1 seconde
    });

    if (httpsResponse.ok) {
      console.log('🔒 Backend HTTPS détecté');
      return `https://localhost:8000`;
    } else { 
      console.log(`Failed to fetch HTTPS : ${httpsResponse.statusText}`); 
    }

  } catch (e) {
    console.log(`Connexion HTTPS échouée: ${e.message}`);
  }

  try {
    console.log('Test HTTP');
    // Test HTTP en fallback
    const httpResponse = await fetch(`http://localhost:8000/ssl-status`, {
      method: "GET",
      signal: AbortSignal.timeout(1000)
    });
    console.log('httpResponse');
    if (httpResponse.ok) {
      console.log('🌐 Backend HTTP détecté');
      return `http://localhost:8000`;
    } else { 
      console.log(`Failed to fetch HTTP : ${httpResponse.statusText}`); 
    }
  } catch (e) {
    console.log(`Connexion HTTP échouée: ${e.message}`);
  }

  // Fallback par défaut
  console.log('⚠️  Aucun backend détecté, utilisation HTTP par défaut');
  return `http://localhost:8000`;
}

export default defineConfig(async ({ command, mode }) => {
  const certPath = path.resolve(__dirname, '../app/certs/certificate.crt');
  const keyPath = path.resolve(__dirname, '../app/certs/private.key');

  // Vérifier si les certificats existent
  const hasSSLCerts = fs.existsSync(certPath) && fs.existsSync(keyPath);

  // Détecter le protocole du backend seulement si on est en mode dev
  let backendTarget = `https://localhost:8000`;  // Valeur par défaut
  let useFrontendHTTPS = true;

  // Si 'npm run dev' ---> command = "serve" et mode = "development"
  // Si 'npm run build' ---> command = "build" et mode = "production"
  // Si 'vite --mode staging' ---> command="serve" et mode="staging"
  if (command == "serve") {
    backendTarget = await detectBackendProtocol();
    useFrontendHTTPS = backendTarget == `https://localhost:8000` && hasSSLCerts ? true : false;
  }
  console.log(`backendTarget = ${backendTarget} and useFrontendHTTPS = ${useFrontendHTTPS}`);

  return {
    plugins: [react()],
    server: {
      // HTTPS pour le frontend seulement si on a les certificats
      https: useFrontendHTTPS ? {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath)
      } : false,
      host: 'localhost',  // ou 127.0.0.1 pour forcer ipv4
      port: 5173,
      proxy: {
        '/api': {
          target: backendTarget, // Backend HTTPS ou HTTP
          changeOrigin: true,
          secure: false,  // Ignore les certificats auto-signés
          rewrite: (path) => path.replace(/^\/api/, '/api')
        }
      }
    }
  }

})
