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

  return (
    <Modal close={close}>
      <div className="m-4 gap-4 flex flex-col items-center justify-center">
        <img src={Logo} alt="login-logo" className="w-56 my-5" />

        <div className="w-300 flex flex-col gap-2">
          <label>Username</label>
          <input type="text" className="bg-gray-100 rounded-md px-2 py-1" key="username" />
        </div>

        <div className="w-300 flex flex-col gap-2">
          <label>Password</label>
          <input type="password" className="bg-gray-100 rounded-md px-2 py-1" key="password" />
        </div>

        <div className="mt-3 flex items-center">
          <hr className="flex-grow border-1 w-14" />
          <div className="text-gray-400 px-2">or</div>
          <hr className="flex-grow border-1 w-14" />
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          type="button"
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-gray-100 my-5 px-12 py-2 rounded-lg"
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
