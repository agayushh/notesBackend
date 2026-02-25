export const errorMessages = {
  API: {
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    INVALID_EMAIL: "Invalid email",
    NOT_FOUND: "Not Found",
    RATE_LIMIT_EXCEEDED: "Rate limit exceeded. Please try again later.",
    SOMETHING_WENT_WRONG: "Something went wrong",
    TOO_MANY_REQUESTS: "Too many requests",
  },
  AUTH: {
    AUTHENTICATION_FAILED: "Authentication failed",
    EMAIL_REQUIRED: "Email required",
    FAILED_TO_CREATE_USER: "Failed to create user",
    FAILED_TO_SEND_OTP: "Failed to send OTP email",
    INVALID_EMAIL: "Invalid Email",
    INVALID_OR_EXPIRED_TOKEN: "Invalid or expired token",
    INVALID_OTP: "Invalid OTP",
    INVALID_PASSWORD: "Invalid Password",
    NAME_REQUIRED: "name required",
    PASSWORD_MIN_LENGTH: "Password must be at least 8 characters",
    PASSWORD_REQUIRED: "password required",
    TOKEN_AND_OTP_REQUIRED: "Token and OTP are required",
    USER_ALREADY_EXISTS: "User with this email already exists",
    USER_EXISTS: "User already exists",
  },
  DATABASE: {
    URL_NOT_SET:
      "DATABASE_URL environment variable is not set. Please check your .env file.",
  },
};
