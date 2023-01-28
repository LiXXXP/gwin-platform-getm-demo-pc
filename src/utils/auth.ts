import Cookies from 'js-cookie'

const TokenKey = 'gwin-token'
const RoleKey = 'gwin-roles'

export function getToken(): string | undefined {
  return Cookies.get(TokenKey)
}

export function setToken(token: string): string | undefined {
  return Cookies.set(TokenKey, token)
}

export function removeToken(): void {
  return Cookies.remove(TokenKey)
}

export function getRoles(): string | undefined {
  return Cookies.get(RoleKey)
}

export function setRoles(role: string): string | undefined {
  return Cookies.set(RoleKey, role)
}
