## 2024-05-18 - Dynamic Content Accessibility
**Learning:** In streaming React interfaces, dynamic containers must explicitly announce their updates to assistive technologies, as the frequent DOM changes bypass normal focus flows.
**Action:** Always wrap message streams in `role="log"` with `aria-live="polite"`, and use `role="status"`/`role="alert"` for loading/error indicators.
