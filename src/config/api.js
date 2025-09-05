// Configuration centralisée des URLs

const API_CONFIG = {
    baseUrl: import.meta.env?.VITE_API_URL ||
            window.REACT_APP_API_URL || 
            "http://localhost:8000",
    endpoints: {
        users: "/users",
        tasks: "/tasks",
        projects: "/projects"
    },
    version: "/api/v1" // à gérer lors du versionning
};

// Fonction pour construire les URLs
export function buildApiUrl(endpoint, id = null, queryParams = {}) {
    let url = `${API_CONFIG.baseUrl}${API_CONFIG.version || ""}${API_CONFIG.endpoints[endpoint]}`;

    if (id) {
        url += `/${id}`;
    }

    const params = new URLSearchParams(queryParams);
    if (params.toString()) {
        url += `?${params.toString()}`;
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
    deleteProject: (id) => buildApiUrl("projects", id),

    // GET /projects/123/tasks
    getProjectTasks: (projectId) => buildApiUrl("projects", `${projectId}/tasks`),
    getUserTasks: (userId) => buildApiUrl("users", `${userId}/tasks`),

};

export default API_CONFIG;