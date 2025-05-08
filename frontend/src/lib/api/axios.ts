import axios from "axios";

function getApiUrl() {
  // Vérifier l'environnement d'exécution
  if (typeof window !== "undefined") {
    // Dans le navigateur, vérifier si une variable globale est définie
    // @ts-ignore
    if (window.__ENV && window.__ENV.API_URL) {
      // @ts-ignore
      return window.__ENV.API_URL;
    }

    // Vérifier l'URL du backend basée sur l'URL actuelle
    const hostname = window.location.hostname;
    if (hostname !== "localhost") {
      // En production, supposer que le backend est sur le même domaine mais un service différent
      const backendService = hostname.replace(
        "library-frontend",
        "library-backend"
      );
      return `https://${backendService}/api`;
    }
  }

  // Fallback
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
}

const apiClient = axios.create({ baseURL: getApiUrl() });
export default apiClient;
