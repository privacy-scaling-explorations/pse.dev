"use client"

import React from "react"
import ReactMarkdown, { Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import katex from "katex"
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

// Custom math components
const KaTeXBlock = ({ math }: { math: string }) => {
  const mathRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (mathRef.current) {
      try {
        katex.render(math.trim(), mathRef.current, {
          displayMode: true,
          throwOnError: false,
        })
      } catch (error) {
        console.error("KaTeX block render error:", error)
        if (mathRef.current) {
          mathRef.current.textContent = math
        }
      }
    }
  }, [math])

  return <div ref={mathRef} className="my-4" />
}

const KaTeXInline = ({ math }: { math: string }) => {
  const mathRef = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    if (mathRef.current) {
      try {
        katex.render(math.trim(), mathRef.current, {
          displayMode: false,
          throwOnError: false,
        })
      } catch (error) {
        console.error("KaTeX inline render error:", error)
        if (mathRef.current) {
          mathRef.current.textContent = math
        }
      }
    }
  }, [math])

  return <span ref={mathRef} className="inline-block align-middle" />
}

// Define a simple regex to extract math content from our markdown
const extractMathBlocks = (content: string) => {
  const mathBlocks: {
    start: number
    end: number
    content: string
    isBlock: boolean
  }[] = []

  const blockMathRegex = /\$\$([\s\S]*?)\$\$/g
  let match: RegExpExecArray | null

  while ((match = blockMathRegex.exec(content)) !== null) {
    mathBlocks.push({
      start: match.index,
      end: match.index + match[0].length,
      content: match[1],
      isBlock: true,
    })
  }

  const inlineMathRegex = /\$(.*?)\$/g
  let inlineMatch: RegExpExecArray | null
  while ((inlineMatch = inlineMathRegex.exec(content)) !== null) {
    // Make sure this isn't already part of a block math section
    const isInsideBlockMath = mathBlocks.some(
      (block) =>
        inlineMatch!.index > block.start && inlineMatch!.index < block.end
    )

    if (!isInsideBlockMath) {
      mathBlocks.push({
        start: inlineMatch.index,
        end: inlineMatch.index + inlineMatch[0].length,
        content: inlineMatch[1],
        isBlock: false,
      })
    }
  }

  mathBlocks.sort((a, b) => a.start - b.start)

  return mathBlocks
}

const MathText = ({ text }: { text: string }) => {
  const parts: React.ReactNode[] = []
  let lastIndex = 0

  if (/^\$(.*?)\$$/m.test(text.trim())) {
    const mathContent = text.trim().slice(1, -1)
    return <KaTeXInline math={mathContent} />
  }

  try {
    // Regular expression to match dollar signs that aren't escaped with a backslash
    const inlineMathRegex = /(?<![\\])\$((?:[^$\\]|\\$|\\[^$])+?)\$/g
    let match: RegExpExecArray | null

    while ((match = inlineMathRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }

      const mathContent = match[1].trim()
      parts.push(
        <KaTeXInline key={`inline-math-${match.index}`} math={mathContent} />
      )

      lastIndex = match.index + match[0].length
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    if (parts.length === 0 && text.includes("$")) {
      return <>{text}</>
    }

    return <>{parts}</>
  } catch (error) {
    console.error("Error processing inline math:", error)
    return <>{text}</>
  }
}

// Helper to check if text contains unescaped math delimiters
const containsMath = (text: string): boolean => {
  if (!text.includes("$")) return false

  const inlineMathRegex = /(?<![\\])\$((?:[^$\\]|\\$|\\[^$])+?)\$/g
  return inlineMathRegex.test(text)
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
  p: ({ node, children, ...props }) => {
    const text = React.Children.toArray(children)
      .map((child) => {
        if (typeof child === "string") return child
        // @ts-expect-error - children props vary
        if (child?.props?.children) return child.props.children
        return ""
      })
      .join("")

    if (text.includes("$")) {
      return createMarkdownElement("p", {
        className: `${darkMode ? "text-white" : "text-tuatara-700"} font-sans text-base font-normal`,
        children: <MathText text={text} />,
        ...props,
      })
    }

    return createMarkdownElement("p", {
      className: `${darkMode ? "text-white" : "text-tuatara-700"} font-sans text-base font-normal`,
      children,
      ...props,
    })
  },
  // Handle math in list items
  li: ({ node, children, ...props }) => {
    const text = React.Children.toArray(children)
      .map((child) => {
        if (typeof child === "string") return child
        // @ts-expect-error - children props vary
        if (child?.props?.children) return child.props.children
        return ""
      })
      .join("")

    if (containsMath(text)) {
      return (
        <li
          className="text-tuatara-700 font-sans text-base font-normal"
          {...props}
        >
          <MathText text={text} />
        </li>
      )
    }

    return (
      <li
        className="text-tuatara-700 font-sans text-base font-normal"
        {...props}
      >
        {children}
      </li>
    )
  },
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
    const { node, children, ...rest } = props

    // Convert children to text to check for math
    const text = React.Children.toArray(children)
      .map((child) => {
        if (typeof child === "string") return child
        // @ts-expect-error - children props vary
        if (child?.props?.children) return child.props.children
        return ""
      })
      .join("")

    // Check if there's math content
    if (containsMath(text)) {
      return (
        <td className="p-4 text-left" {...rest}>
          <MathText text={text} />
        </td>
      )
    }

    return (
      <td className="p-4 text-left" {...rest}>
        {children}
      </td>
    )
  },
  th: (props) => {
    const { node, children, ...rest } = props
    if (!children || (Array.isArray(children) && children.length === 0)) {
      return null
    }

    // Convert children to text to check for math
    const text = React.Children.toArray(children)
      .map((child) => {
        if (typeof child === "string") return child
        // @ts-expect-error - children props vary
        if (child?.props?.children) return child.props.children
        return ""
      })
      .join("")

    // Check if there's math content
    if (containsMath(text)) {
      return (
        <th className="p-4 text-left font-medium" {...rest}>
          <MathText text={text} />
        </th>
      )
    }

    return (
      <th className="p-4 text-left font-medium" {...rest}>
        {children}
      </th>
    )
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
  const [content, setContent] = React.useState<React.ReactNode[]>([])

  React.useEffect(() => {
    if (!children) {
      setContent([])
      return
    }

    try {
      const blockMathRegex = /\$\$([\s\S]*?)\$\$/g
      const blockParts = children.split(blockMathRegex)

      const mathComponents = {
        ...REACT_MARKDOWN_CONFIG(darkMode),
        ...components,
      }

      if (blockParts.length === 1) {
        setContent([
          <ReactMarkdown
            key="markdown"
            skipHtml={false}
            components={mathComponents}
            remarkPlugins={[remarkGfm, remarkCustomNewlines]}
          >
            {children}
          </ReactMarkdown>,
        ])
        return
      }

      const parts: React.ReactNode[] = []

      blockParts.forEach((part, index) => {
        if (index % 2 === 0) {
          if (part.trim()) {
            parts.push(
              <ReactMarkdown
                key={`text-${index}`}
                skipHtml={false}
                components={mathComponents}
                remarkPlugins={[remarkGfm, remarkCustomNewlines]}
              >
                {part}
              </ReactMarkdown>
            )
          }
        } else {
          parts.push(<KaTeXBlock key={`block-math-${index}`} math={part} />)
        }
      })

      setContent(parts)
    } catch (error) {
      console.error("Error processing markdown with math:", error)
      setContent([
        <ReactMarkdown
          key="fallback"
          skipHtml={false}
          components={{
            ...REACT_MARKDOWN_CONFIG(darkMode),
            ...components,
          }}
          remarkPlugins={[remarkGfm, remarkCustomNewlines]}
        >
          {children}
        </ReactMarkdown>,
      ])
    }
  }, [children, darkMode, components])

  return <>{content}</>
}
