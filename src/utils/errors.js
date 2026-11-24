/**
 * Turns a failed axios call into a message for the user.
 *  - the server answered      -> its own {"error": "..."} message, else `fallback`
 *  - no answer (timeout/down) -> the server is probably waking up (Render free tier sleeps)
 */
export function errorMessage(err, fallback) {
  if (err?.response) return err.response.data?.error || fallback;
  return "Can't reach the server - it may be waking up. Please wait a few seconds and try again.";
}
