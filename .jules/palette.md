## 2026-07-17 - Dynamic ARIA Live Regions for Streaming Chat
**Learning:** In React applications with real-time text streaming (like SSE chatbots), native smooth scrolling causes layout jank, but more importantly for accessibility, standard element additions are not reliably announced to screen readers.
**Action:** Always wrap dynamically expanding message lists in an element with `role="log"` and `aria-live="polite"` to ensure screen readers automatically announce new updates as they are appended.
