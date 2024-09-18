import React from "react"
import ReactMarkdown, { Components } from "react-markdown"
import remarkGfm from "remark-gfm"

export const createMarkdownElement = (
  tag: keyof JSX.IntrinsicElements,
  props: any
) =>
  React.createElement(tag, {
    ...props,
  })

const Table = (props: any) => {
  return (
    <div className="rounded-lg border border-tuatara-300">
      <table data-component="table">{props.children}</table>
    </div>
  )
}

// Styling for HTML attributes for markdown component
const REACT_MARKDOWN_CONFIG: Components = {
  a: ({ node, ...props }) =>
    createMarkdownElement("a", {
      className: "text-anakiwa-500 hover:text-orange duration-200",
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
  p: ({ node, ...props }) =>
    createMarkdownElement("p", {
      className: "text-tuatara-700 font-sans text-lg font-normal",
      ...props,
    }),
  ul: ({ node, ...props }) =>
    createMarkdownElement("ul", {
      className:
        "ml-6 list-disc text-tuatara-700 font-sans text-lg font-normal",
      ...props,
    }),
  ol: ({ node, ...props }) =>
    createMarkdownElement("ol", {
      className:
        "ml-6 list-disc text-tuatara-700 font-sans text-lg font-normal",
      ...props,
    }),
  table: Table,
}

interface MarkdownProps {
  children: string
  components?: Components // components overrides the default components
}

export const Markdown = ({ children, components }: MarkdownProps) => {
  return (
    <ReactMarkdown
      skipHtml={false}
      components={{
        ...REACT_MARKDOWN_CONFIG,
        ...components,
      }}
      remarkPlugins={[remarkGfm]}
    >
      {children}
    </ReactMarkdown>
  )
}
