import React from "react"
import ReactMarkdown, { Components } from "react-markdown"
import remarkGfm from "remark-gfm"

const createMarkdownElement = (tag: keyof JSX.IntrinsicElements, props: any) =>
  React.createElement(tag, {
    ...props,
  })

// Styling for HTML attributes for markdown component
const REACT_MARKDOWN_CONFIG: Components = {
  a: ({ node, ...props }) =>
    createMarkdownElement("a", {
      className: "text-orange",
      target: "_blank",
      ...props,
    }),
  h1: ({ node, ...props }) =>
    createMarkdownElement("h1", {
      className: "text-neutral-800 text-4xl md:text-5xl font-bold",
      ...props,
    }),
  h2: ({ node, ...props }) =>
    createMarkdownElement("h2", {
      className: "text-neutral-800 text-4xl",
      ...props,
    }),
  h3: ({ node, ...props }) =>
    createMarkdownElement("h3", {
      className: "text-neutral-800 text-3xl",
      ...props,
    }),
  h4: ({ node, ...props }) =>
    createMarkdownElement("h4", {
      className: "text-neutral-800 text-xl",
      ...props,
    }),
  h5: ({ node, ...props }) =>
    createMarkdownElement("h5", {
      className: "text-neutral-800 text-lg font-bold",
      ...props,
    }),
  h6: ({ node, ...props }) =>
    createMarkdownElement("h6", {
      className: "text-neutral-800 text-md font-bold",
      ...props,
    }),
}

interface MarkdownProps {
  children: string
}

export const Markdown = ({ children }: MarkdownProps) => {
  return (
    <ReactMarkdown
      skipHtml={false}
      components={REACT_MARKDOWN_CONFIG}
      remarkPlugins={[remarkGfm]}
    >
      {children}
    </ReactMarkdown>
  )
}
