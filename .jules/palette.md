## 2024-07-25 - ARIA roles in dynamic components
**Learning:** For dynamic components that frequently update (like a streaming chat), `aria-live="polite"` needs to be added to a container role, typically `role="log"`, so screen readers can gracefully announce the new stream tokens.
**Action:** Always verify proper `aria-live` regions when implementing or enhancing streaming UI components.
