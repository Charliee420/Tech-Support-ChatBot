## 2024-07-07 - Make overflowing horizontal content keyboard accessible
**Learning:** Container elements like `pre` (code blocks) or wrappers for tables often have `overflow-x-auto` to allow horizontal scrolling, but these are not focusable by default, meaning keyboard-only users cannot scroll them.
**Action:** Always add `tabIndex={0}` and clear focus indicators (e.g. `focus-visible:outline-none focus-visible:ring-2`) to scrollable container elements like code blocks and tables to ensure they are fully navigable and scrollable for keyboard users.
