import { useState, memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function CopyButton({ code }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard not available
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 px-2 py-1 text-[11px] rounded-md bg-zinc-700/50 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 transition-colors"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

const remarkPlugins = [remarkGfm];

const components = {
  code({ className, children, ...props }) {
    const isInline = !className;
    const codeStr = String(children).replace(/\n$/, "");

    if (isInline) {
      return (
        <code
          className="px-1.5 py-0.5 rounded-md bg-zinc-700/60 text-[13px] text-cyan-300 font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <div className="relative group my-3">
        <div className="flex items-center justify-between px-4 py-1.5 rounded-t-lg bg-zinc-800 border-b border-zinc-700">
          <span className="text-[11px] text-zinc-500 font-mono">
            {className?.replace("language-", "") || "code"}
          </span>
        </div>
        <pre className="overflow-x-auto rounded-b-lg bg-zinc-900 p-4 text-sm leading-relaxed">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
        <CopyButton code={codeStr} />
      </div>
    );
  },
  pre({ children }) {
    return <>{children}</>;
  },
  p({ children }) {
    return <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>;
  },
  ul({ children }) {
    return <ul className="mb-3 space-y-1 list-disc pl-5">{children}</ul>;
  },
  ol({ children }) {
    return <ol className="mb-3 space-y-1 list-decimal pl-5">{children}</ol>;
  },
  li({ children }) {
    return <li className="leading-relaxed">{children}</li>;
  },
  h1({ children }) {
    return <h1 className="text-lg font-semibold mb-2 mt-4 tracking-tight">{children}</h1>;
  },
  h2({ children }) {
    return <h2 className="text-base font-semibold mb-2 mt-4 tracking-tight">{children}</h2>;
  },
  h3({ children }) {
    return <h3 className="text-sm font-semibold mb-1 mt-3">{children}</h3>;
  },
  strong({ children }) {
    return <strong className="font-semibold text-zinc-100">{children}</strong>;
  },
  blockquote({ children }) {
    return (
      <blockquote className="border-l-2 border-cyan-600/40 pl-4 italic text-zinc-400 mb-3">
        {children}
      </blockquote>
    );
  },
  a({ href, children }) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
      >
        {children}
      </a>
    );
  },
  hr() {
    return <hr className="my-4 border-zinc-800" />;
  },
  table({ children }) {
    return (
      <div className="overflow-x-auto mb-3">
        <table className="w-full text-sm border-collapse">{children}</table>
      </div>
    );
  },
  th({ children }) {
    return (
      <th className="border border-zinc-700 px-3 py-2 bg-zinc-800/50 text-left font-medium text-zinc-300">
        {children}
      </th>
    );
  },
  td({ children }) {
    return (
      <td className="border border-zinc-700 px-3 py-2 text-zinc-400">{children}</td>
    );
  },
};

// ⚡ Bolt: memoize MarkdownRenderer to prevent unnecessary re-renders when parent streams new text.
const MarkdownRenderer = memo(function MarkdownRenderer({ content }) {
  return (
    <div className="prose-custom">
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});

export default MarkdownRenderer;
