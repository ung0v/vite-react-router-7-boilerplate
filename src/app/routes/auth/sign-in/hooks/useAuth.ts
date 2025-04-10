import { API_ROUTES } from '@/constants'
import { usePost } from '@/lib/reactQuery'
import { UserType } from '@/types/user'

type AuthRequest = {
  userIdTxt: string
  password: string
}

type AuthResponse = UserType

export const useAuth = () => {
  return usePost<AuthRequest, AuthResponse>(API_ROUTES.AUTH.SIGN_IN)
}
