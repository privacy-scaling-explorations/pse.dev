"use client"

import React from "react"
import ReactMarkdown, { Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"

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
    <div className="w-full overflow-x-auto border rounded-lg border-tuatara-300">
      <table className="min-w-full" data-component="table">
        {props.children}
      </table>
    </div>
  )
}

const TableRow = (props: any) => {
  return <tr data-component="table-row">{props.children}</tr>
}

const TableHead = (props: any) => {
  const isEmpty = React.Children.toArray(props.children).every((child: any) => {
    if (!child.props || !child.props.children) return true

    if (child.props.children) {
      const thChildren = React.Children.toArray(child.props.children)
      return thChildren.every(
        (thChild: any) =>
          !thChild.props ||
          !thChild.props.children ||
          thChild.props.children.length === 0
      )
    }
    return true
  })

  if (isEmpty) {
    return null
  }

  return <thead>{props.children}</thead>
}

// Custom plugin to handle /n as newline
const remarkCustomNewlines = () => {
  return (tree: any) => {
    const visit = (node: any) => {
      if (node.type === "text" && typeof node.value === "string") {
        if (node.value.includes("/n")) {
          const parts = node.value.split("/n")
          const newChildren: any[] = []

          parts.forEach((part: string, index: number) => {
            newChildren.push({ type: "text", value: part })

            if (index < parts.length - 1) {
              newChildren.push({ type: "break" })
            }
          })

          return newChildren
        }
      }

      if (node.children) {
        const newChildren: any[] = []
        for (const child of node.children) {
          const result = visit(child)
          if (Array.isArray(result)) {
            newChildren.push(...result)
          } else if (result) {
            newChildren.push(result)
          } else {
            newChildren.push(child)
          }
        }
        node.children = newChildren
      }

      return node
    }

    return visit(tree)
  }
}

// Styling for HTML attributes for markdown component
const REACT_MARKDOWN_CONFIG = (darkMode: boolean): Components => ({
  a: ({ ...props }) =>
    createMarkdownElement("a", {
      className: `${darkMode ? "text-anakiwa-300" : "text-anakiwa-500"} hover:text-orange duration-200`,
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
      className: `${darkMode ? "text-white" : "text-tuatara-700 "} font-sans text-base font-normal`,
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
  tr: TableRow,
  thead: TableHead,
  td: (props) => {
    const { node, ...rest } = props
    return <td className="p-4 text-left" {...rest} />
  },
  th: (props) => {
    const { node, ...rest } = props
    if (
      !props.children ||
      (Array.isArray(props.children) && props.children.length === 0)
    ) {
      return null
    }
    return <th className="p-4 text-left font-medium" {...rest} />
  },
  pre: ({ ...props }) =>
    createMarkdownElement("pre", {
      className: "bg-tuatara-950 p-4 rounded-lg text-white",
      ...props,
    }),
  img: ({ ...props }) =>
    createMarkdownElement("img", {
      className: "w-auto w-auto mx-auto rounded-lg object-cover",
      ...props,
    }),
})

interface MarkdownProps {
  children: string
  components?: Components // components overrides the default components
  darkMode?: boolean
}

export const Markdown = ({
  children,
  components,
  darkMode = false,
}: MarkdownProps) => {
  return (
    <ReactMarkdown
      skipHtml={false}
      components={{
        ...REACT_MARKDOWN_CONFIG(darkMode),
        ...components,
      }}
      remarkPlugins={[remarkGfm, remarkMath, remarkCustomNewlines]}
      rehypePlugins={[rehypeKatex as any]}
    >
      {children}
    </ReactMarkdown>
  )
}
