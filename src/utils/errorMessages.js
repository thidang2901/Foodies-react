const FORM_ERRORS = {
  EMAIL: {
    REQUIRED: "Email is required!",
    INVALID: "Invalid email!",
  },
  PASSWORD: {
    REQUIRED: "Password is required!",
    INVALID_LENGTH: "Password should be at least 6 characters!",
  },
}

const AUTH_FIREBASE_ERRORS = {
  USER_NOT_FOUND: "Member is not registered!",
  INVALID_EMAIL: "Invalid email!",
  UNEXPECTED: "Unexpected error!",
}

const GENERAL_ERRORS = {}

export { AUTH_FIREBASE_ERRORS, FORM_ERRORS, GENERAL_ERRORS }
