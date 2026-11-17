/**
 * Canonical GitHub URL validation and normalization helper.
 * Follows FEATURE_DEVELOPMENT.md Feature 1 & APP_FLOW.md.
 */

export function validateGitHubUrl(rawInput) {
  if (!rawInput || typeof rawInput !== "string") {
    return {
      isValid: false,
      error: "Please enter a GitHub repository URL or owner/repository.",
      normalizedUrl: null,
      commitRef: null,
      owner: null,
      repo: null,
    };
  }

  let input = rawInput.trim();
  if (!input) {
    return {
      isValid: false,
      error: "Please enter a GitHub repository URL or owner/repository.",
      normalizedUrl: null,
      commitRef: null,
      owner: null,
      repo: null,
    };
  }

  // Handle shorthand owner/repo input (e.g., "facebook/react" or "vitejs/vite")
  if (!input.startsWith("http://") && !input.startsWith("https://")) {
    if (input.startsWith("github.com/")) {
      input = `https://${input}`;
    } else {
      const shorthandMatch = input.match(/^([a-zA-Z0-9_-]+)\/([a-zA-Z0-9._-]+)(?:\/commit\/([0-9a-fA-F]{7,40}))?$/);
      if (shorthandMatch) {
        input = `https://github.com/${input}`;
      } else {
        input = `https://${input}`;
      }
    }
  }

  let parsed;
  try {
    parsed = new URL(input);
  } catch {
    return {
      isValid: false,
      error: "Invalid URL format. Example: https://github.com/owner/repository",
      normalizedUrl: null,
      commitRef: null,
      owner: null,
      repo: null,
    };
  }

  if (parsed.protocol !== "https:") {
    return {
      isValid: false,
      error: "Repository URL must use HTTPS (https://github.com/owner/repository).",
      normalizedUrl: null,
      commitRef: null,
      owner: null,
      repo: null,
    };
  }

  if (parsed.hostname.toLowerCase() !== "github.com") {
    return {
      isValid: false,
      error: "Only public github.com repositories are supported.",
      normalizedUrl: null,
      commitRef: null,
      owner: null,
      repo: null,
    };
  }

  const segments = parsed.pathname.split("/").filter(Boolean);
  if (segments.length < 2) {
    return {
      isValid: false,
      error: "URL must include both owner and repository (e.g. github.com/owner/repo).",
      normalizedUrl: null,
      commitRef: null,
      owner: null,
      repo: null,
    };
  }

  const owner = segments[0];
  let repo = segments[1];
  if (repo.toLowerCase().endsWith(".git")) {
    repo = repo.slice(0, -4);
  }

  let commitRef = null;
  if (segments.length >= 4 && segments[2].toLowerCase() === "commit") {
    commitRef = segments[3];
  }

  const canonicalUrl = `https://github.com/${owner}/${repo}`;

  return {
    isValid: true,
    error: null,
    normalizedUrl: canonicalUrl,
    commitRef,
    owner,
    repo,
    fullName: `${owner}/${repo}`,
  };
}
