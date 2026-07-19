## 2024-07-07 - Make overflowing horizontal content keyboard accessible
**Learning:** Container elements like `pre` (code blocks) or wrappers for tables often have `overflow-x-auto` to allow horizontal scrolling, but these are not focusable by default, meaning keyboard-only users cannot scroll them.
**Action:** Always add `tabIndex={0}` and clear focus indicators (e.g. `focus-visible:outline-none focus-visible:ring-2`) to scrollable container elements like code blocks and tables to ensure they are fully navigable and scrollable for keyboard users.
## 2024-07-19 - Dynamic Content Accessibility
**Learning:** In dynamically updating streaming chat interfaces, screen readers may not announce new messages or state changes (like loading or errors) automatically, creating a silent and confusing experience for non-sighted users.
**Action:** Always wrap dynamically expanding message lists in an element with `role="log"` and `aria-live="polite"`. Additionally, explicitly use `role="status"` for asynchronous loading indicators (like spinners or "Thinking..." text) and `role="alert"` for error message banners to ensure these critical state changes are reliably announced.
