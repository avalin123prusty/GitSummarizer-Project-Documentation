/**
 * Maps stable backend API error codes to actionable user-friendly messages.
 * Follows FEATURE_DEVELOPMENT.md Feature 8 & API.md Section 7 & UI_UX_DESIGN.md Section 6.
 */

const ERROR_CODE_MAP = {
  INVALID_REPOSITORY_URL: "Enter a valid public GitHub repository URL (e.g., https://github.com/owner/repository).",
  REPOSITORY_NOT_FOUND: "Repository not found or is private. Make sure the repository exists and is public.",
  REPOSITORY_NOT_PUBLIC_OR_ACCESSIBLE: "This repository is not publicly accessible. Only public GitHub repositories are supported in MVP.",
  RATE_LIMITED: "GitHub API or AI provider rate limit reached. Please wait a moment before trying again.",
  GITHUB_UPSTREAM_ERROR: "Unable to reach the GitHub API. Please check your connection or retry shortly.",
  AI_PROVIDER_ERROR: "The AI summary service encountered an issue generating this brief. Please retry in a few moments.",
  SERVICE_UNAVAILABLE: "The service is temporarily unavailable. Please try again shortly.",
  INTERNAL_SERVER_ERROR: "An unexpected server error occurred. Please try again.",
  VALIDATION_ERROR: "Please check your inputs and try again.",
  INVALID_JSON: "Request format was invalid.",
  UNAUTHORIZED: "Your session has expired or authentication is required. Please sign in.",
  INVALID_CREDENTIALS: "The email or password you entered is incorrect.",
  EMAIL_ALREADY_EXISTS: "An account with this email address already exists. Try signing in instead.",
  SUMMARY_NOT_FOUND: "The requested summary could not be found or has been deleted.",
};

export function getErrorMessage(error, defaultMessage = "Something went wrong while generating the summary.") {
  if (!error) return defaultMessage;

  if (typeof error === "string") return error;

  // Handle standard backend error envelope: { error: { code, message }, requestId }
  if (error.code && ERROR_CODE_MAP[error.code]) {
    return ERROR_CODE_MAP[error.code];
  }

  if (error.error && error.error.code && ERROR_CODE_MAP[error.error.code]) {
    return ERROR_CODE_MAP[error.error.code];
  }

  if (error.message) {
    if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
      return "Cannot connect to the backend server. Make sure the server is running on port 5000.";
    }
    return error.message;
  }

  return defaultMessage;
}
