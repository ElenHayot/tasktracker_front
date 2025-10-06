// Configuration centralisée des URLs

const API_CONFIG = {
    baseUrl: import.meta.env?.VITE_BACKEND_URL ||
            import.meta.env?.VITE_API_URL ||
            window.REACT_APP_API_URL || 
            "https://localhost:8000",
    endpoints: {
        users: "/users",
        tasks: "/tasks",
        projects: "/projects",
        login: "/auth/login-json",
        me: "/auth/me",
        roles: "/roles",
        status: "/status",
    },
    version: `/api/v1`, // valeur par défaut
    _initialized: false, // Flag pour éviter les multiples initialisations
    adminTasktrackerEmail: "admin@tasktracker.com", // Email de l'admin par défaut, qui a tous les droits
};

// Fonction pour récupérer la version depuis le backend
export async function fetchApiVersion() {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}/api/version`);
        if (!response.ok) {
            throw new Error (`HTTP ${response.status} : ${response.statusText}`);
        }
        const data = await response.json();
        return data.version;
    } catch (error) {
        console.warn(`Could not fetch API version, using default: `, API_CONFIG.version);
        return API_CONFIG.version.replace('/api/','');  // retourne juste "v1"
    }
}

// Fonction pour initialiser/mettre à jour la version
export async function initializeApiConfig() {
    if (API_CONFIG._initialized) {
        return API_CONFIG.version;
    }

    try {
        const version = await fetchApiVersion();
        API_CONFIG.version = `/api/${version}`;
        API_CONFIG._initialized = true;
        console.log(`API version initialized: `, API_CONFIG.version);
    } catch (error) {
        console.warn(`Failed to initialize API version: `, error);
        // On garde dans ce cas la version par défaut
        API_CONFIG._initialized = true;
    }

    return API_CONFIG.version;
}

// Fonction pour forcer la mise à jour de la version (utile pour les tests ou changements manuels)
export function updateApiVersion(newVersion) {
    API_CONFIG.version = `/api/${newVersion}`;
    console.log(`API version manually updated to: `, API_CONFIG.version);
}

// Fonction pour construire les URLs
export function buildApiUrl(endpoint, id = null, queryParams = {}) {
    let url = `${API_CONFIG.baseUrl}${API_CONFIG.version}${API_CONFIG.endpoints[endpoint]}`;

    if (id) {
        url += `/${id}`;
    }

    const params = new URLSearchParams(queryParams);
    if (params.toString()) {
        url += `?${params.toString()}`;
    }

    // Si on demande un endpoint racine (ex: `/users/`)
    if (!id && !params.toString()) {
        url += `/`;
    }

    return url;
}

// Export des URLs courantes
export const API_URLS = {
    getUsers: (params = {}) => buildApiUrl("users", null, params),
    getUserById: (id) => buildApiUrl("users", id),
    createUser: () => buildApiUrl("users"),
    updateUser: (id) => buildApiUrl("users", id),
    deleteUser: (id) => buildApiUrl("users", id),

    getTasks: (params = {}) => buildApiUrl("tasks", null, params),
    getTaskById: (id) => buildApiUrl("tasks", id),
    createTask: () => buildApiUrl("tasks"),
    updateTask: (id) => buildApiUrl("tasks", id),
    deleteTask: (id) => buildApiUrl("tasks", id),

    getProjects: (params = {}) => buildApiUrl("projects", null, params),
    getProjectById: (id) => buildApiUrl("projects", id),
    createProject: () => buildApiUrl("projects"),
    updateProject: (id) => buildApiUrl("projects", id),
    deleteProject: (id, forceTaskDeleting = false) => buildApiUrl("projects", id, { force_task_deleting: forceTaskDeleting }),

    // GET /projects/123/tasks
    getProjectTasks: (projectId) => buildApiUrl("projects", `${projectId}/tasks/`),
    getUserTasks: (userId) => buildApiUrl("users", `${userId}/tasks/`),

    // Authentification
    getLogin: () => buildApiUrl("login"),
    getMe: () => buildApiUrl("me"),
    getRoles: () => buildApiUrl("roles"),
    getStatus: () => buildApiUrl("status"),


};

// Get pour accéder à la config (utile pour déboguer)
export function getApiConfig() {
    return { ...API_CONFIG };
}

// Fonction utilitaire pour vérifier si l'API est initialisée
export function isInitialized() {
    return API_CONFIG._initialized;
}

export default API_CONFIG;