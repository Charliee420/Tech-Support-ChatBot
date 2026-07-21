## 2026-07-06 - Prevented Error Message Leakage and DoS
**Vulnerability:** The backend leaked internal error messages (e.g., API key errors or stack traces) to the client upon failure. Additionally, the `/api/chat` endpoint was vulnerable to DoS attacks due to an unbounded message array and lack of message length limits.
**Learning:** Returning `err.message` directly in `catch` blocks can expose sensitive internal details, such as API configurations or underlying system paths. Allowing an arbitrary number of large messages can lead to severe API token exhaustion and server crashes.
**Prevention:** Always sanitize error messages before returning them to the client; return generic errors and log details internally. Validate inputs for both array length and string length (e.g., limit message count to 100 and individual message length to 4000 characters) before processing them in external API calls.

## 2026-07-10 - Prevented Overly Permissive CORS Configuration
**Vulnerability:** The backend application previously used `app.use(cors())`, allowing any domain to send cross-origin requests by generating the `Access-Control-Allow-Origin: *` response header.
**Learning:** Default configurations of libraries like `cors` can lead to unintended exposure of sensitive API endpoints to unauthorized domains. In development mode, the Vite server proxies requests, so CORS doesn't even need to be fully open to the world, only to the dev origin (`http://localhost:5173`). In production, if both frontend and backend are on the same domain, cross-origin requests should be rejected.
**Prevention:** Always restrict `cors` middleware explicitly. In this project, `corsOptions` ensures `origin` is set to false in production (blocking cross-origin requests) and limited strictly to standard dev hosts during development.
## 2024-05-24 - Unrestricted CORS Vulnerability
**Vulnerability:** The backend allowed unrestricted cross-origin requests (`cors()` with no options), which can be exploited for CSRF or data exfiltration if the API is exposed on an internal network or relies on cookie-based authentication, though in this case it was just an overly permissive policy.
**Learning:** `app.use(cors())` sets `Access-Control-Allow-Origin: *`, allowing any website to interact with the API.
**Prevention:** Always restrict CORS to the specific domains that need access. In development, restrict to the frontend dev server (`http://localhost:5173`). In production, if serving frontend from same origin, disable CORS (`origin: false`) or set to the specific production URL.
## 2024-05-18 - Prevent DoS via in-memory rate limit for LLM endpoints
**Vulnerability:** Missing rate limiting on the `/api/chat` endpoint, exposing the application to DoS attacks and costly LLM API overruns.
**Learning:** Using LLM endpoints without rate limits presents a unique financial and functional risk. In cases where external modules (like `express-rate-limit`) shouldn't be added to maintain minimal dependencies, a simple `Map`-based in-memory rate limiter with a `setInterval` cleanup function effectively manages requests without leaking memory.
**Prevention:** Always implement rate limiting on any endpoint making external API calls (especially LLMs or billing endpoints), and ensure the limits apply per-IP with secure, generic error messages (e.g., 429 status code) without exposing internal request counts.
## 2026-07-21 - Added HTTP Security Headers Middleware
**Vulnerability:** The Express backend lacked basic HTTP security headers, making it potentially vulnerable to common client-side attacks like clickjacking and MIME-sniffing.
**Learning:** Adding comprehensive security headers (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Strict-Transport-Security`) using native `res.setHeader` in custom middleware is a clean way to implement defense-in-depth without adding external dependencies like `helmet`, which is beneficial in projects with strict dependency management rules.
**Prevention:** Always implement basic security headers early in the backend setup process using middleware to provide a baseline level of protection against a variety of web vulnerabilities.
