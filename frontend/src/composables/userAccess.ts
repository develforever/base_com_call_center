import { computed } from 'vue'
import { useUserStore } from '@/stores/useUserStore'

export enum Permission {
  VIEW = 'VIEW',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
  CREATE = 'CREATE',
}

export function useCanUserAccess() {
  const { isLoggedIn, loggedUser } = useUserStore()

  /**
   *
   * @param {Permission|Permission[]} requiredPermissions
   * @returns {ComputedRef<boolean>}
   */
  const canAccess = (requiredPermissions: Permission | Permission[]) => {
    return computed(() => {
      if (!isLoggedIn) return false

      if (loggedUser?.role === 'ADMIN') return true

      const permissions = Array.isArray(requiredPermissions)
        ? requiredPermissions
        : [requiredPermissions]

      return permissions.some((perm) => loggedUser?.permissions.includes(perm))
    })
  }

  return {
    canAccess,
  }
}
