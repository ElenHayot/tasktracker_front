import { useAuth } from "./useAuth";
import { ROLE_PERMISSIONS, createPermissionChecker } from "../../permissions.config";
import { useMemo } from "react";

export function usePermissions() {
  const { user } = useAuth();
  // Récupérer la liste des roles
  // const roles = fetch()

  // ✅ Mise en cache du permissionChecker
  const permissionChecker = useMemo(() => {
    if (!user?.role) return null;

    const userPermissions = ROLE_PERMISSIONS[user.role];
    if (!userPermissions) return null;

    console.log(`Creating permission checker for role: ${user.role}`);
    console.log(`Base permissions:`, userPermissions);

    const checker = createPermissionChecker(userPermissions);
    console.log(`Resolved permissions:`, checker.getAllPermissions());

    return checker;
  }, [user?.role]); // Recalcule seulement si le role change

  const hasRole = (role) => {
    return user?.role == role;
  };

  const canAccess = (resource) => {
    if (!permissionChecker) {
      console.warn(`No permission checker available. User role: ${user?.role}`);
      return false;
    }

    const hasPermission = permissionChecker.canAccess(resource);

    // Debug seulement en développement
    console.log(`Permission check: '${resource}' = ${hasPermission}`);

    return hasPermission;
  };

  return {
    hasRole,
    canAccess,

    isAdmin: user?.role === 'ADMIN',
    isModerator: user?.role === 'MODERATOR',
    isUser: user?.role === 'USER',
    isGuest: user?.role === 'GUEST',

    // Debug info (utile en développement)
    getAllPermissions: () => permissionChecker?.getAllPermissions() || [],
    currentRole: user?.role
  };
}