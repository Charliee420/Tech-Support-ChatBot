## 2026-07-17 - Express static caching for Vite
**Learning:** When serving a Vite built frontend (`dist/`) via Express, Vite handles cache-busting via content hashes for JS/CSS but doesn't handle the HTTP `Cache-Control` headers on the server side. Express `express.static` defaults to not sending aggressive cache headers.
**Action:** When optimizing static asset delivery, configure `express.static` with `setHeaders` to send `Cache-Control: public, max-age=31536000, immutable` for all non-HTML assets, and `no-cache` for `.html` files.
