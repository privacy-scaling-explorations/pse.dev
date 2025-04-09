import React from "react"
import ReactMarkdown, { Components } from "react-markdown"
import remarkGfm from "remark-gfm"

const generateSectionId = (text: string) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-")
}

export const createMarkdownElement = (
  tag: keyof JSX.IntrinsicElements,
  props: any
) =>
  React.createElement(tag, {
    ...props,
    ref: (node: HTMLElement | null) => {
      if (node && node.textContent) {
        node.setAttribute(
          "data-section-id",
          generateSectionId(node.textContent)
        )
      }
    },
  })

const Table = (props: any) => {
  return (
    <div className="border rounded-lg border-tuatara-300">
      <table data-component="table">{props.children}</table>
    </div>
  )
}

// Styling for HTML attributes for markdown component
const REACT_MARKDOWN_CONFIG: Components = {
  a: ({ ...props }) =>
    createMarkdownElement("a", {
      className: "text-anakiwa-500 hover:text-orange duration-200",
      target: "_blank",
      ...props,
    }),
  h1: ({ ...props }) =>
    createMarkdownElement("h1", {
      className: "text-neutral-800 text-4xl md:text-5xl font-bold",
      ...props,
    }),
  h2: ({ ...props }) =>
    createMarkdownElement("h2", {
      className: "text-neutral-800 text-4xl",
      ...props,
    }),
  h3: ({ ...props }) =>
    createMarkdownElement("h3", {
      className: "text-neutral-800 text-3xl",
      ...props,
    }),
  h4: ({ ...props }) =>
    createMarkdownElement("h4", {
      className: "text-neutral-800 text-xl",
      ...props,
    }),
  h5: ({ ...props }) =>
    createMarkdownElement("h5", {
      className: "text-neutral-800 text-lg font-bold",
      ...props,
    }),
  h6: ({ ...props }) =>
    createMarkdownElement("h6", {
      className: "text-neutral-800 text-md font-bold",
      ...props,
    }),
  p: ({ ...props }) =>
    createMarkdownElement("p", {
      className: "text-tuatara-700 font-sans text-base font-normal",
      ...props,
    }),
  ul: ({ ordered, ...props }) =>
    createMarkdownElement(ordered ? "ol" : "ul", {
      className:
        "ml-6 list-disc text-tuatara-700 font-sans text-base font-normal",
      ...props,
    }),
  ol: ({ ordered, ...props }) =>
    createMarkdownElement(ordered ? "ol" : "ul", {
      className:
        "ml-6 list-disc text-tuatara-700 font-sans text-base font-normal",
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
