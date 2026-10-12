## 2024-05-19 - ARIA roles on Semantic Landmarks
**Learning:** Adding dynamic ARIA roles (like `role="log"`) directly to native HTML landmark elements (like `<main>`) overrides their semantic meaning, removing the landmark from the screen reader's rotor menu and breaking page navigation.
**Action:** Always wrap dynamic lists in a separate `<div role="log" aria-live="polite">` inside the landmark element rather than overriding the landmark itself.
