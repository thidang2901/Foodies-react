import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { Link } from "react-router-dom"

import { Spinner } from "@/components/shared"
import { InputField } from "@/form-controls"
import { useFirebaseAuth } from "@/hooks"
import { LoginUserSchema } from "@/schemas/user"
import { LOGIN_EMAIL, LOGIN_PASSWORD } from "@/utils/constants"

const SignInForm = ({ onSubmit }) => {
  const [showPassword, toggleShowPassword] = useState(false)
  const { isLoading, handleEmailSignIn } = useFirebaseAuth()

  const form = useForm({
    defaultValues: {
      email: LOGIN_EMAIL,
      password: LOGIN_PASSWORD,
    },
    resolver: zodResolver(LoginUserSchema),
  })

  const handleSubmit = (data) => {
    if (onSubmit) {
      handleEmailSignIn(data, onSubmit)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-6">
      <InputField form={form} name="email" label="Email" />
      <InputField
        form={form}
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        autoComplete="false"
        suffixIcon={showPassword ? <BsEye className="text-orange-400" /> : <BsEyeSlash />}
        onClickSuffixIcon={() => toggleShowPassword((prev) => !prev)}
      />

      <div className="my-2 flex w-300 items-center justify-between md:flex-col-reverse md:gap-4">
        <Link
          to="/forgot-password"
          className="text-sm text-gray-400 hover:text-gray-500 dark:text-primary hover:dark:text-gray-300"
        >
          Forgot password?
        </Link>

        <motion.button
          whileTap={{ scale: 0.9 }}
          type="submit"
          disabled={isLoading}
          className="w-150 rounded-lg bg-orange-500 py-2 hover:bg-orange-400 hover:shadow-md sm:px-10 md:w-3/4"
        >
          <span className="flex w-full items-center justify-center gap-2 text-base text-white">
            {isLoading && <Spinner />} Sign in
          </span>
        </motion.button>
      </div>
    </form>
  )
}

export default SignInForm
