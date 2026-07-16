## 2024-07-07 - Make overflowing horizontal content keyboard accessible
**Learning:** Container elements like `pre` (code blocks) or wrappers for tables often have `overflow-x-auto` to allow horizontal scrolling, but these are not focusable by default, meaning keyboard-only users cannot scroll them.
**Action:** Always add `tabIndex={0}` and clear focus indicators (e.g. `focus-visible:outline-none focus-visible:ring-2`) to scrollable container elements like code blocks and tables to ensure they are fully navigable and scrollable for keyboard users.

## 2024-05-24 - Screen Reader Accessibility in Streaming Chats
**Learning:** Dynamic streaming chat logs without `role="log"` fail to notify screen readers of new updates, breaking core interaction for visually impaired users. Additionally, asynchronous state changes (loading, error) require explicit `role="status"` and `role="alert"` for real-time announcements.
**Action:** Always wrap dynamically expanding message lists in an element with `role="log"`. Use `role="status"` for loading indicators and `role="alert"` for error messages that appear dynamically.
