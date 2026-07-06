import { memo } from "react";
import MarkdownRenderer from "./MarkdownRenderer.jsx";

// ⚡ Bolt: wrap ChatMessage in React.memo to prevent re-rendering historical messages during chat streaming
const ChatMessage = memo(function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} message-enter`}>
      <div className="flex gap-3 max-w-[85%]">
        {!isUser && (
          <div className="size-7 rounded-full bg-cyan-500/15 flex items-center justify-center shrink-0 mt-1">
            <svg className="size-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
          </div>
        )}
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? "bg-cyan-600/20 text-cyan-50 rounded-tr-sm"
              : "bg-zinc-800/50 text-zinc-200 rounded-tl-sm border border-zinc-800"
          }`}
        >
          {message.content ? (
            isUser ? (
              <p className="whitespace-pre-wrap">{message.content}</p>
            ) : (
              <MarkdownRenderer content={message.content} />
            )
          ) : (
            <span className="text-zinc-500 italic">Empty response</span>
          )}
        </div>
      </div>
    </div>
  );
});

export default ChatMessage;
