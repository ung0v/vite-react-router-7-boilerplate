import { z } from 'zod'

import { ERROR_MESSAGE } from '@/constants'

export const signInFormSchema = z.object({
  username: z.string().min(1, ERROR_MESSAGE.REQUIRED_FIELD),
  password: z.string().min(1, ERROR_MESSAGE.REQUIRED_FIELD),
})

export type SignInFormSchemaType = z.infer<typeof signInFormSchema>

export const DEFAULT_VALUES_SIGN_IN_FORM: SignInFormSchemaType = {
  username: '',
  password: '',
}
