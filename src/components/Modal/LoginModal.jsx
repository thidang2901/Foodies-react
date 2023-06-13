import React, { useState } from "react"

import Logo from "@/assets/logo/logo-no-background.svg"
import ExternalSignIn from "@/components/Modal/ExternalSignIn"

import HorizontalLine from "@/components/shared/HorizontalLine"
import { actionType, useStateValue } from "@/context"
import Modal from "./Modal"
import SignInForm from "./SignInForm"
import SignUpForm from "./SignUpForm"

const LoginModal = ({ onClose }) => {
  const [_, dispatch] = useStateValue()
  const [isNewMember, setIsNewMember] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = ({ user, success, error }) => {
    if (success) {
      dispatch({
        type: actionType.SET_USER,
        user,
      })
      onClose?.()
    } else {
      setError(error)
    }
  }

  return (
    <Modal close={onClose}>
      <div className="m-4 flex translate-x-4 transform flex-col items-center justify-center gap-5 transition-all duration-100 ease-in">
        <img src={Logo} alt="login-logo" className="my-5 w-56" />

        {error && <p className="text-sm text-red-500">{error}</p>}

        {isNewMember ? (
          <>
            <div className="text-sm text-gray-400 dark:text-primary">
              Already a member?{" "}
              <span
                className="cursor-pointer text-orange-700 hover:text-orange-500 dark:text-orange-500 dark:hover:text-orange-400"
                onClick={() => setIsNewMember(false)}
              >
                Sign in!
              </span>
            </div>
            <SignUpForm onSubmit={handleSubmit} />
          </>
        ) : (
          <>
            <div className="text-sm text-gray-400 dark:text-primary">
              Not a member yet?{" "}
              <span
                className="cursor-pointer text-orange-700 hover:text-orange-500 dark:text-orange-500 dark:hover:text-orange-400"
                onClick={() => setIsNewMember(true)}
              >
                Join us today!
              </span>
            </div>
            <SignInForm onSubmit={handleSubmit} />
          </>
        )}

        <HorizontalLine className="w-1/2" centerText="or" />

        <ExternalSignIn onSubmit={handleSubmit} />
      </div>
    </Modal>
  )
}

export default LoginModal
