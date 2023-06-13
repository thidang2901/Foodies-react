import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"
import { useState } from "react"

import { app } from "@/configs/firebase.config"
import { AUTH_FIREBASE_ERRORS } from "@/utils/errorMessages"

const useFirebaseAuth = () => {
  const auth = getAuth(app)
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSignIn = async ({ email, password }, callback) => {
    const data = { user: null, error: null, success: false }
    try {
      setIsLoading(true)
      const resp = await signInWithEmailAndPassword(auth, email, password)
      data.user = resp.user
      data.success = true
    } catch (error) {
      data.error = getErrorMessage(error)
    } finally {
      setIsLoading(false)
      callback(data)
    }
  }

  const handleEmailSignUp = async ({ email, password }, callback) => {
    const data = { user: null, error: null, success: false }
    try {
      setIsLoading(true)
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      data.user = user
      data.success = true
    } catch (error) {
      data.error = getErrorMessage(error)
    } finally {
      setIsLoading(false)
      callback(data)
    }
  }

  const ggProvider = new GoogleAuthProvider()
  const handleGoogleSignIn = async (callback) => {
    const data = { user: null, error: null, success: false }
    try {
      setIsLoading(true)
      const resp = await signInWithPopup(auth, ggProvider)
      data.user = resp.user.providerData[0]
      data.success = true
    } catch (error) {
      data.error = getErrorMessage(error)
    } finally {
      setIsLoading(false)
      callback(data)
    }
  }

  const getErrorMessage = (err) => {
    if (err?.name !== "FirebaseError") {
      return "Something went wrong!"
    }

    switch (err.code) {
      case "auth/user-not-found": {
        return AUTH_FIREBASE_ERRORS.USER_NOT_FOUND
      }
      case "auth/invalid-email": {
        return AUTH_FIREBASE_ERRORS.INVALID_EMAIL
      }
      default: {
        return AUTH_FIREBASE_ERRORS.UNEXPECTED
      }
    }
  }

  return {
    isLoading,
    handleEmailSignIn,
    handleEmailSignUp,
    handleGoogleSignIn,
  }
}

export default useFirebaseAuth
