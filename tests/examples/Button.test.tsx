import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "../test-utils"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

describe("Button Component", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>)

    const button = screen.getByRole("button", { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass("h-10") // default size
  })

  it("renders with different variants", () => {
    const { rerender } = render(<Button variant="orange">Orange Button</Button>)

    let button = screen.getByRole("button")
    expect(button).toHaveClass("bg-orangeDark")

    rerender(<Button variant="outline">Outline Button</Button>)
    button = screen.getByRole("button")
    expect(button).toHaveClass("border", "border-input")
  })

  it("renders with different sizes", () => {
    const { rerender } = render(<Button size="sm">Small</Button>)

    let button = screen.getByRole("button")
    expect(button).toHaveClass("h-9")

    rerender(<Button size="lg">Large</Button>)
    button = screen.getByRole("button")
    expect(button).toHaveClass("h-11")
  })

  it("renders with icon", () => {
    render(<Button icon={Download}>Download</Button>)

    const button = screen.getByRole("button")
    expect(button).toBeInTheDocument()
    // Icon should be rendered as an SVG
    expect(button.querySelector("svg")).toBeInTheDocument()
  })

  it("handles click events", () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    const button = screen.getByRole("button")
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>)

    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
    expect(button).toHaveClass("disabled:opacity-50")
  })

  it("shows disabled state", () => {
    const { rerender } = render(<Button disabled={false}>Not Disabled</Button>)

    let button = screen.getByRole("button")
    expect(button).not.toBeDisabled()

    rerender(<Button disabled={true}>Disabled</Button>)
    button = screen.getByRole("button")
    expect(button).toBeDisabled()
  })

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom</Button>)

    const button = screen.getByRole("button")
    expect(button).toHaveClass("custom-class")
  })

  it("forwards ref correctly", () => {
    const ref = vi.fn()
    render(<Button ref={ref}>With Ref</Button>)

    expect(ref).toHaveBeenCalled()
  })
})
