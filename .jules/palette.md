## 2024-07-07 - Make overflowing horizontal content keyboard accessible
**Learning:** Container elements like `pre` (code blocks) or wrappers for tables often have `overflow-x-auto` to allow horizontal scrolling, but these are not focusable by default, meaning keyboard-only users cannot scroll them.
**Action:** Always add `tabIndex={0}` and clear focus indicators (e.g. `focus-visible:outline-none focus-visible:ring-2`) to scrollable container elements like code blocks and tables to ensure they are fully navigable and scrollable for keyboard users.

## 2024-07-15 - Enhancing accessibility for dynamic chat states
**Learning:** In streaming chat interfaces, loading indicators and error states appear and disappear dynamically. Without explicit roles and live regions, screen reader users may not be aware of these critical state changes.
**Action:** Always add `role="status"` and `aria-live="polite"` to dynamic loading indicators, and `role="alert"` and `aria-live="assertive"` to dynamic error messages to ensure they are announced appropriately by screen readers. Also, ensure decorative SVG icons are hidden using `aria-hidden="true"`.
