## 2024-05-24 - React.memo for Streaming Chat Interfaces
**Learning:** In a streaming chat interface, new chunks of text trigger re-renders of the entire message list if state is held in a parent component (like App). This can cause severe performance degradation (O(n^2) rendering cost) as the chat gets longer because every previous message and its complex Markdown components re-render on every tiny chunk of text received.
**Action:** Always wrap chat message components and expensive inner components (like Markdown renderers) in `React.memo` to prevent re-rendering historical messages while the active message is streaming. Additionally, ensure complex objects passed as props (like markdown components maps) are hoisted outside the render cycle so they maintain referential equality.

## 2026-07-10 - Smooth Scroll Animation Thrashing in Streaming Interfaces
**Learning:** Calling `scrollIntoView({ behavior: "smooth" })` continuously during token streaming (e.g., dozens of times per second) causes severe frame drops and visual jank. The browser constantly cancels and restarts the smooth scroll animation, leading to layout thrashing.
**Action:** Always use `behavior: "auto"` (instant scrolling) during active streaming phases, and only use `smooth` scrolling for discrete, one-off events (like a user explicitly sending a message or navigating).

## 2026-07-14 - Optimize SSE Chunk State Updates
**Learning:** In a React application processing an SSE stream, updating state (e.g., `setMessages`) for every single parsed data line within a chunk can cause an excessive number of state updates. This may lead to unnecessary array cloning and component re-rendering overhead, potentially causing UI stuttering, especially for larger chunks.
**Action:** When parsing a stream where multiple discrete pieces of data might arrive in a single `read()` call, accumulate the relevant data (like string content) in a local variable during the loop over the lines. Call the state setter only once per chunk with the combined data to minimize rendering cycles and improve performance.
