import { render, screen } from "../test-utils"
import { AppLink } from "@/components/app-link"
import { describe, it, expect, vi } from "vitest"

// Mock the AppLink component since we don't have the actual implementation
// This is an example of how to test Next.js Link components
describe("AppLink Component", () => {
  it("renders internal link correctly", () => {
    render(<AppLink href="/projects">View Projects</AppLink>)

    const link = screen.getByRole("link", { name: /view projects/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/projects")
  })

  it("renders external link with target=\"_blank\"", () => {
    render(
      <AppLink href="https://example.com" external>
        External Link
      </AppLink>
    )

    const link = screen.getByRole("link", { name: /external link/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "https://example.com")
    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noreferrer noopener nofollow")
  })

  it("applies custom className", () => {
    render(
      <AppLink href="/test" className="custom-link-class">
        Custom Link
      </AppLink>
    )

    const link = screen.getByRole("link")
    expect(link).toHaveClass("custom-link-class")
  })

  it("renders with children correctly", () => {
    render(
      <AppLink href="/test">
        <span>Nested Content</span>
      </AppLink>
    )

    const span = screen.getByText("Nested Content")
    expect(span).toBeInTheDocument()

    // The component wraps children in a div, so we need to check the link element
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/test")
  })

  it("handles click events", () => {
    const handleClick = vi.fn()
    render(
      <AppLink href="/test" onClick={handleClick}>
        Clickable Link
      </AppLink>
    )

    const link = screen.getByRole("link")
    link.click()

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
