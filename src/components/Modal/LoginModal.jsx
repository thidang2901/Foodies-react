import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { motion } from "framer-motion"
import React from "react"
import { BsGoogle } from "react-icons/bs"

import { app } from "@/configs/firebase.config"
import { actionType, useStateValue } from "@/context"
import Modal from "./Modal"

import Logo from "@/assets/logo/logo-no-background.svg"

const LoginModal = ({ trigger, close }) => {
  const [{ user }, dispatch] = useStateValue()

  const firebaseAuth = getAuth(app)
  const provider = new GoogleAuthProvider()

  const googleLogin = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider)

      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      })

      close()
    } else {
      trigger()
    }
  }

  const normalLogin = () => {
    console.log("normal login")
  }

  return (
    <Modal close={close}>
      <div className="m-4 flex flex-col items-center justify-center gap-4">
        <img src={Logo} alt="login-logo" className="my-5 w-56" />

        <div className="flex w-300 flex-col gap-2">
          <label className="dark:text-primary">Username</label>
          <input
            type="text"
            className="rounded-md bg-gray-100 px-2 py-1"
            key="username"
          />
        </div>

        <div className="flex w-300 flex-col gap-2">
          <label className="dark:text-primary">Password</label>
          <input
            type="password"
            className="rounded-md bg-gray-100  px-2 py-1"
            key="password"
          />
        </div>

        <div className="flex w-300 items-center justify-between">
          <a href="#forgot-password" className="text-sm text-gray-400">
            Forgot password?
          </a>

          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            className="my-2 rounded-lg bg-orange-500 px-6 py-2 hover:shadow-lg sm:px-10"
            onClick={normalLogin}
          >
            <span className="text-base text-white">Log in</span>
          </motion.button>
        </div>

        <div className="mt-3 flex items-center">
          <hr className="border-1 w-14 flex-grow" />
          <div className="px-2 text-gray-400 dark:text-primary">or</div>
          <hr className="border-1 w-14 flex-grow" />
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          type="button"
          className="my-5 flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 px-12 py-2 hover:shadow-lg md:w-auto"
          onClick={googleLogin}
        >
          <BsGoogle />
          <span className="text-base text-textColor">Login with Google</span>
        </motion.button>
      </div>
    </Modal>
  )
}

export default LoginModal
