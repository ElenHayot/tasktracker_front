import { useAuth } from "./useAuth";

export function usePermissions() {
  const { user } = useAuth();
  const hasRole = (role) => {
    return user?.role == role;
  };

  const canAccess = (resource) => {
    if (!user) return false;

    /* read = lecture resource, write = création de resource, update = mise à jour, delete = suppression */
    /* users, projects, tasks = accès chemin de base : read, write, update, delete impossible si pas d'accès de base*/
    const permissions = {
      'Administrator': [
        'users', 'users-read', 'users-write', 'users-update', 'users-delete',
        'projects', 'projects-read', 'projects-write', 'projects-update', 'projects-delete',
        'tasks', 'tasks-read', 'tasks-write', 'tasks-update', 'tasks-delete',
        'roles'
      ],
      'User': [
        'users', 'users-read',
        'projects', 'projects-read', 
        'tasks', 'tasks-read', 'tasks-write', 'tasks-update', 'tasks-delete'
      ],
      'Guest': ['users', 'users-read']
    };

    return permissions[user.role]?.includes(resource) || false;
  }

  return {
    hasRole,
    canAccess,
    isAdmin: user?.role === 'Administrator',
    isModerator: user?.role === 'Moderator',
    isUser: user?.role === 'User',
    isGuest: user?.role === 'Guest'
  };
}