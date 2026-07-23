## 2026-07-23 - [Add ARIA roles for dynamic streaming chat interfaces]
**Learning:** [In dynamic streaming chat interfaces, screen readers don't announce new content automatically. Dynamically expanding message lists need role="log" and aria-live="polite" to ensure screen readers automatically announce new updates. Loading states need role="status" and error messages need role="alert"]
**Action:** [Wrap dynamically expanding message lists in an element with role="log" and aria-live="polite". Use role="status" for async loading indicators and role="alert" for error messages]
