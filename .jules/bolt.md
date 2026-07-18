## 2024-05-24 - React.memo for Streaming Chat Interfaces
**Learning:** In a streaming chat interface, new chunks of text trigger re-renders of the entire message list if state is held in a parent component (like App). This can cause severe performance degradation (O(n^2) rendering cost) as the chat gets longer because every previous message and its complex Markdown components re-render on every tiny chunk of text received.
**Action:** Always wrap chat message components and expensive inner components (like Markdown renderers) in `React.memo` to prevent re-rendering historical messages while the active message is streaming. Additionally, ensure complex objects passed as props (like markdown components maps) are hoisted outside the render cycle so they maintain referential equality.

## 2024-05-18 - SSE State Update Batching Bottleneck
**Learning:** During chat streaming, Server-Sent Events (SSE) `read()` network ticks often contain multiple data chunks batched within a single buffer loop. Updating the React state per chunk rather than per network read tick causes a massive wave of unnecessary re-renders. This is particularly expensive when full-string markdown parsers (like `react-markdown`) are forced to completely re-parse the ever-growing string multiple times per read tick instead of once per tick.
**Action:** When handling SSE data streams in the frontend, always accumulate chunk content within the `reader.read()` buffer loop first, then perform a single batched state update at the end of the tick.
## 2026-07-10 - Smooth Scroll Animation Thrashing in Streaming Interfaces
**Learning:** Calling `scrollIntoView({ behavior: "smooth" })` continuously during token streaming (e.g., dozens of times per second) causes severe frame drops and visual jank. The browser constantly cancels and restarts the smooth scroll animation, leading to layout thrashing.
**Action:** Always use `behavior: "auto"` (instant scrolling) during active streaming phases, and only use `smooth` scrolling for discrete, one-off events (like a user explicitly sending a message or navigating).
## 2026-07-18 - Layout Thrashing with Smooth Scrolling during Token Streaming
**Learning:** Calling `scrollIntoView({ behavior: "smooth" })` continuously during token streaming causes severe frame drops and layout thrashing, as the browser constantly cancels and restarts the smooth scroll animation.
**Action:** Use `behavior: "auto"` (instant scrolling) during active streaming to prevent layout thrashing and maintain frame rates.
