"use client"

import React from "react"
import ReactMarkdown, { Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import katex from "katex"
import "katex/dist/katex.min.css"
import rehypeRaw from "rehype-raw"
import { TableRowCard } from "../cards/table-row-card"
import { Accordion } from "./accordion"

// Extend the Components type to include our custom component
interface CustomComponents extends Components {
  "table-row-card": React.ComponentType<{
    node: any
    children: string
  }>
  accordion: React.ComponentType<{
    node: any
    children: string
  }>
}

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
  // Skip rendering the thead completely if there are no children
  if (!props.children || props.children.length === 0) {
    return null
  }

  const isEmpty = React.Children.toArray(props.children).every((child: any) => {
    if (!child.props || !child.props.children) return true

    if (child.props.children) {
      const thChildren = React.Children.toArray(child.props.children)
      if (thChildren.length === 0) return true

      return thChildren.every((thChild: any) => {
        // Check if the th child is empty or contains only whitespace
        if (!thChild) return true
        if (typeof thChild === "string") return thChild.trim() === ""
        if (!thChild.props || !thChild.props.children) return true
        if (typeof thChild.props.children === "string")
          return thChild.props.children.trim() === ""
        return false
      })
    }
    return true
  })

  if (isEmpty) {
    return null
  }

  return <thead>{props.children}</thead>
}

const TableBody = (props: any) => {
  if (!props.children || props.children.length === 0) {
    return null
  }

  return <tbody>{props.children}</tbody>
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
        const processedMath = preprocessMathContent(math.trim())
        katex.render(processedMath, mathRef.current, {
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

  return <div ref={mathRef} className="my-4 flex justify-center" />
}

const KaTeXInline = ({ math }: { math: string }) => {
  const mathRef = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    if (mathRef.current) {
      try {
        // Pre-process the math content to replace "mod" with "\pmod"
        const processedMath = preprocessMathContent(math.trim())
        katex.render(processedMath, mathRef.current, {
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

  return <span ref={mathRef} className="inline-block align-middle katex-math" />
}

// Preprocess math content to improve rendering
const preprocessMathContent = (mathContent: string): string => {
  // Replace pattern "x ; mod ; q" or "x \mod q" with "\pmod{q}"
  const modRegex = /([^\\])(;?\s*mod\s*;?\s*)([^{])/g
  const processedMath = mathContent.replace(
    modRegex,
    (match, before, mod, after) => {
      return `${before}\\pmod{${after}}`
    }
  )

  // Also handle cases like "\mod q" or "\mod{q}"
  const modCommandRegex = /\\mod\s+([^{])/g
  return processedMath.replace(modCommandRegex, (match, after) => {
    return `\\pmod{${after}}`
  })
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

const rehypeProcessBrTags = () => {
  return (tree: any) => {
    const visit = (node: any) => {
      if (
        node.type === "element" &&
        (node.tagName === "td" || node.tagName === "th")
      ) {
        // Look for text nodes that contain \n or <br> and convert them
        if (node.children) {
          for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i]
            if (child.type === "text" && child.value) {
              if (child.value.includes("\n")) {
                const parts = child.value.split("\n")
                const newChildren: any[] = []

                parts.forEach((part: string, index: number) => {
                  newChildren.push({ type: "text", value: part })

                  // Add <br> element except after the last part
                  if (index < parts.length - 1) {
                    newChildren.push({
                      type: "element",
                      tagName: "br",
                      properties: {},
                      children: [],
                    })
                  }
                })

                node.children.splice(i, 1, ...newChildren)
                // Adjust i based on the new length of children we've inserted
                i += newChildren.length - 1
              }
            }
          }
        }
      }

      if (node.children) {
        node.children.forEach(visit)
      }

      return node
    }

    return visit(tree)
  }
}

// Styling for HTML attributes for markdown component
const REACT_MARKDOWN_CONFIG = (darkMode: boolean): CustomComponents => ({
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

    let isMathOnly = false

    if (text.trim().startsWith("$") && text.trim().endsWith("$")) {
      const innerContent = text.trim().slice(1, -1)
      if (!innerContent.includes("$")) {
        isMathOnly = true
      }
    }

    if (text.includes("$")) {
      return createMarkdownElement("p", {
        className: `${darkMode ? "text-white" : "text-tuatara-700"} font-sans text-base font-normal ${isMathOnly ? "math-only" : ""}`,
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
        "list-decimal text-tuatara-700 font-sans text-base font-normal mt-3",
      ...props,
    }),
  table: Table,
  tr: TableRow,
  thead: TableHead,
  tbody: TableBody,
  "table-row-card": ({ node, children }: { node: any; children: string }) => {
    try {
      const content = JSON.parse(children)
      return <TableRowCard items={content} />
    } catch (error) {
      console.error("Error parsing table-row-card content:", error)
      return <div>Error rendering table row card</div>
    }
  },
  accordion: ({ node, children }: { node: any; children: string }) => {
    try {
      const content = JSON.parse(children)
      return (
        <Accordion
          type={content.type || "multiple"}
          size={content.size || "xs"}
          defaultValue={content.defaultValue}
          items={content.items}
          iconOnHover={content.iconOnHover}
          id={content.id}
        />
      )
    } catch (error) {
      console.error("Error parsing accordion content:", error)
      return <div>Error rendering accordion</div>
    }
  },
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

    // Handle line breaks in table cells by replacing <br> with actual line breaks
    const hasBrTags = typeof text === "string" && text.includes("<br>")

    // Check if there's HTML content with style attribute in the cell
    const hasHtmlContent =
      typeof text === "string" && (text.includes("<div style=") || hasBrTags)

    // Check if there's math content
    if (containsMath(text)) {
      return (
        <td className="p-4 text-left" {...rest}>
          <MathText text={text} />
        </td>
      )
    }

    if (hasHtmlContent) {
      const processedText = hasBrTags ? text.replace(/<br>/g, "<br/>") : text
      return (
        <td
          className="p-4 text-left"
          {...rest}
          dangerouslySetInnerHTML={{ __html: processedText }}
        />
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

    // Handle line breaks in table headers by replacing <br> with actual line breaks
    const hasBrTags = typeof text === "string" && text.includes("<br>")

    // Check if there's HTML content with style attribute in the cell
    const hasHtmlContent =
      typeof text === "string" && (text.includes("<div style=") || hasBrTags)

    if (containsMath(text)) {
      return (
        <th className="p-4 text-left font-medium" {...rest}>
          <MathText text={text} />
        </th>
      )
    }

    if (hasHtmlContent) {
      const processedText = hasBrTags ? text.replace(/<br>/g, "<br/>") : text
      return (
        <th
          className="p-4 text-left font-medium"
          {...rest}
          dangerouslySetInnerHTML={{ __html: processedText }}
        />
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

      const rehypePlugins = [rehypeRaw as any, rehypeProcessBrTags as any]

      if (blockParts.length === 1) {
        setContent([
          <ReactMarkdown
            key="markdown"
            skipHtml={false}
            rehypePlugins={rehypePlugins}
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
                rehypePlugins={rehypePlugins}
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
          rehypePlugins={[rehypeRaw as any, rehypeProcessBrTags as any]}
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
