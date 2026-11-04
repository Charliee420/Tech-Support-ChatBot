## 2026-07-06 - Prevented Error Message Leakage and DoS
**Vulnerability:** The backend leaked internal error messages (e.g., API key errors or stack traces) to the client upon failure. Additionally, the `/api/chat` endpoint was vulnerable to DoS attacks due to an unbounded message array and lack of message length limits.
**Learning:** Returning `err.message` directly in `catch` blocks can expose sensitive internal details, such as API configurations or underlying system paths. Allowing an arbitrary number of large messages can lead to severe API token exhaustion and server crashes.
**Prevention:** Always sanitize error messages before returning them to the client; return generic errors and log details internally. Validate inputs for both array length and string length (e.g., limit message count to 100 and individual message length to 4000 characters) before processing them in external API calls.

## 2026-07-11 - Overly Permissive CORS Default
**Vulnerability:** Express CORS middleware `app.use(cors())` without options defaults to allowing all origins (`*`).
**Learning:** Completely removing the CORS dependency causes cross-origin requests from the browser to fail entirely when frontend and backend run on different ports/domains, leading to critical app regressions.
**Prevention:** Always configure CORS with an explicit, restrictive `origin` allowlist, such as reading from an environment variable and providing a local dev server fallback.
