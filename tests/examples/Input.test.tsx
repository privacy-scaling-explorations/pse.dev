import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "../test-utils"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

describe("Input Component", () => {
  it("renders basic input", () => {
    render(<Input placeholder="Enter text" />)

    const input = screen.getByPlaceholderText("Enter text")
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass("w-full", "rounded-md")
  })

  it("handles value changes", () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)

    const input = screen.getByRole("textbox")
    fireEvent.change(input, { target: { value: "test value" } })

    expect(handleChange).toHaveBeenCalled()
  })

  it("renders with different sizes", () => {
    const { rerender } = render(<Input size="sm" />)

    let input = screen.getByRole("textbox")
    expect(input).toHaveClass("text-xs")

    rerender(<Input size="lg" />)
    input = screen.getByRole("textbox")
    expect(input).toHaveClass("text-lg")
  })

  it("renders with icon", () => {
    render(<Input icon={Search} iconPosition="left" placeholder="Search..." />)

    const container = screen.getByRole("textbox").closest("div")
    expect(container?.querySelector("svg")).toBeInTheDocument()
  })

  it("handles icon click", () => {
    const handleIconClick = vi.fn()
    render(
      <Input
        icon={Search}
        onIconClick={handleIconClick}
        placeholder="Search..."
      />
    )

    const icon = screen
      .getByRole("textbox")
      .closest("div")
      ?.querySelector("svg")
    expect(icon).toBeInTheDocument()

    if (icon?.parentElement) {
      fireEvent.click(icon.parentElement)
      expect(handleIconClick).toHaveBeenCalledTimes(1)
    }
  })

  it("applies dark mode classes correctly", () => {
    render(<Input className="dark" />)

    const input = screen.getByRole("textbox")
    expect(input).toHaveClass("dark:bg-transparent")
  })

  it("is accessible", () => {
    render(<Input aria-label="Search input" placeholder="Type to search" />)

    const input = screen.getByLabelText("Search input")
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute("placeholder", "Type to search")
  })

  it("forwards ref correctly", () => {
    const ref = vi.fn()
    render(<Input ref={ref} />)

    expect(ref).toHaveBeenCalled()
  })

  it("handles disabled state", () => {
    render(<Input disabled />)

    const input = screen.getByRole("textbox")
    expect(input).toBeDisabled()
  })
})
