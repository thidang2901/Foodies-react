import { FORM_ERRORS } from "@/utils/errorMessages"
import * as z from "zod"

const UserSchema = z.object({
  email: z.string(FORM_ERRORS.EMAIL.REQUIRED).email(FORM_ERRORS.EMAIL.INVALID),
  password: z.string(FORM_ERRORS.PASSWORD.REQUIRED).min(6, FORM_ERRORS.PASSWORD.INVALID_LENGTH),
  role: z.enum(["admin", "user"]),
})

const LoginUserSchema = UserSchema.pick({ email: true, password: true })

export { LoginUserSchema, UserSchema }
