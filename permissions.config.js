/* read = lecture resource, write = tout changement de resource possible (CUD), create = création de resource, update = mise à jour, delete = suppression */
/* users, projects, tasks = accès chemin de base : read, write, create, update, delete impossible si pas cet accès de base*/
export const PERMISSIONS = {

    USERS: 'users',
    USERS_READ: 'users_read',
    USERS_WRITE: 'users_write',
    USERS_CREATE: 'users_create',
    USERS_UPDATE: 'users_update',
    USERS_DELETE: 'users_delete',

    PROJECTS: 'projects',
    PROJECTS_READ: 'projects_read',
    PROJECTS_WRITE: 'projects_write',
    PROJECTS_CREATE: 'projects_create',
    PROJECTS_UPDATE: 'projects_update',
    PROJECTS_DELETE: 'projects_delete',

    TASKS: 'tasks',
    TASKS_READ: 'tasks_read',
    TASKS_WRITE: 'tasks_write',
    TASKS_CREATE: 'tasks_create',
    TASKS_UPDATE: 'tasks_update',
    TASKS_DELETE: 'tasks_delete',

    ROLES: 'roles',

};

// ✨ Définition de la hiérarchie des permissions
export const PERMISSION_HIERARCHY = {
    // Base permissions incluent automatiquement l'accès de base
    [PERMISSIONS.USERS_READ]: [PERMISSIONS.USERS],
    [PERMISSIONS.USERS_CREATE]: [PERMISSIONS.USERS, PERMISSIONS.USERS_READ],
    [PERMISSIONS.USERS_UPDATE]: [PERMISSIONS.USERS, PERMISSIONS.USERS_READ],
    [PERMISSIONS.USERS_DELETE]: [PERMISSIONS.USERS, PERMISSIONS.USERS_READ],
    // WRITE comprend toutes les opérations CRUD
    [PERMISSIONS.USERS_WRITE]: [
        PERMISSIONS.USERS,
        PERMISSIONS.USERS_READ,
        PERMISSIONS.USERS_CREATE,
        PERMISSIONS.USERS_UPDATE,
        PERMISSIONS.USERS_DELETE
    ],

    [PERMISSIONS.PROJECTS_READ]: [PERMISSIONS.PROJECTS],
    [PERMISSIONS.PROJECTS_CREATE]: [PERMISSIONS.PROJECTS, PERMISSIONS.PROJECTS_READ],
    [PERMISSIONS.PROJECTS_UPDATE]: [PERMISSIONS.PROJECTS, PERMISSIONS.PROJECTS_READ],
    [PERMISSIONS.PROJECTS_DELETE]: [PERMISSIONS.PROJECTS, PERMISSIONS.PROJECTS_READ],
    // WRITE comprend toutes les opérations cRUD
    [PERMISSIONS.PROJECTS_WRITE]: [
        PERMISSIONS.PROJECTS,
        PERMISSIONS.PROJECTS_READ,
        PERMISSIONS.PROJECTS_CREATE,
        PERMISSIONS.PROJECTS_UPDATE,
        PERMISSIONS.PROJECTS_DELETE
    ],

    [PERMISSIONS.TASKS_READ]: [PERMISSIONS.TASKS],
    [PERMISSIONS.TASKS_CREATE]: [PERMISSIONS.TASKS, PERMISSIONS.TASKS_READ],
    [PERMISSIONS.TASKS_UPDATE]: [PERMISSIONS.TASKS, PERMISSIONS.TASKS_READ],
    [PERMISSIONS.TASKS_DELETE]: [PERMISSIONS.TASKS, PERMISSIONS.TASKS_READ],
    [PERMISSIONS.TASKS_WRITE]: [
        PERMISSIONS.TASKS,
        PERMISSIONS.TASKS_READ,
        PERMISSIONS.TASKS_CREATE,
        PERMISSIONS.TASKS_UPDATE,
        PERMISSIONS.TASKS_DELETE
    ],

};

// 🎯 Fonction magique pour résoudre les permissions
export const resolvePermissions = (userPermissions) => {
    const resolvedPermissions = new Set(userPermissions);

    // Pour chaque permission de l'utilisateur
    userPermissions.forEach(permission => {
        // Si elle a des permissions enfants dans la hierarchie
        const impliedPermissions = PERMISSION_HIERARCHY[permission];
        if (impliedPermissions) {
            impliedPermissions.forEach(impliedPerm => {
                resolvedPermissions.add(impliedPerm);
            });
        }
    })

    return Array.from(resolvedPermissions);
};

// 🔥 Fonction canAccess améliorée
export function createPermissionChecker(userPermissions) {
    const resolvedPermissions = resolvePermissions(userPermissions);

    return {
        canAccess: (requiredPermission) => {
            return resolvedPermissions.includes(requiredPermission);
        },

        getAllPermissions: () => resolvedPermissions,

        // Bonus : vérifier plusieurs permissions
        canAccessAny: (permissions) => {
            return permissions.some(perm => resolvedPermissions.includes(perm));
        },

        canAccessAll: (permissions) => {
            return permissions.every(perm => resolvedPermissions.includes(perm));
        }
    };
};

// 📝 Rôles simplifiés
export const ROLE_PERMISSIONS = {

    Administrator: [
        PERMISSIONS.USERS_WRITE,
        PERMISSIONS.PROJECTS_WRITE,
        PERMISSIONS.TASKS_WRITE,
        PERMISSIONS.ROLES
    ],
    Moderator: [
        PERMISSIONS.USERS_READ, PERMISSIONS.USERS_CREATE, PERMISSIONS.USERS_UPDATE,
        PERMISSIONS.PROJECTS_WRITE,
        PERMISSIONS.TASKS_WRITE
    ],
    User: [
        PERMISSIONS.USERS_READ,
        PERMISSIONS.PROJECTS_READ, PERMISSIONS.PROJECTS_UPDATE,
        PERMISSIONS.TASKS_WRITE
    ],
    Guest: [
        PERMISSIONS.USERS_CREATE,
        PERMISSIONS.ROLES
    ],

};