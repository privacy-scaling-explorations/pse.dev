# Testing Guide

This document provides comprehensive guidance for testing in this Next.js 14 project.

## 🚀 Quick Start

### Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode (recommended for development)
yarn test:watch

# Run tests with UI (visual test runner)
yarn test:ui

# Run tests once (CI mode)
yarn test:run

# Run tests with coverage report
yarn test:coverage

# Validate test setup
yarn test:validation
```

### Writing Your First Test

```typescript
import { render, screen } from '@/tests/test-utils'
import { MyComponent } from '@/components/MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Hello World" />)
    
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })
})
```

## 🏗️ Test Structure

### File Organization

```
tests/
├── setup.ts                 # Global test setup
├── test-utils.tsx           # Custom render functions & utilities
├── mocks/                   # Mock implementations
│   ├── index.ts
│   ├── next-components.ts   # Next.js component mocks
│   ├── external-libraries.ts # Third-party library mocks
│   └── browser-apis.ts      # Browser API mocks
├── examples/                # Example test files
│   ├── Button.test.tsx
│   ├── Input.test.tsx
│   ├── AppLink.test.tsx
│   ├── GlobalProvider.test.tsx
│   ├── api-route.test.ts
│   └── hooks.test.tsx
└── validation.test.ts       # Setup validation tests
```

### Naming Conventions

- **Test files**: `ComponentName.test.tsx` or `functionName.test.ts`
- **Test descriptions**: Use descriptive names that explain the behavior
- **Test IDs**: Use `data-testid` for elements that need specific targeting

## 🧰 Testing Utilities

### Custom Render Function

Always use the custom render function from `@/tests/test-utils`:

```typescript
import { render, screen } from '@/tests/test-utils'

// This automatically wraps your component with all necessary providers:
// - GlobalProvider (with QueryClient)
// - ProjectsProvider  
// - ThemeProvider
```

### Provider-Specific Rendering

For more control over which providers to include:

```typescript
import { renderWithProviders } from '@/tests/test-utils'

renderWithProviders(<Component />, {
  withGlobal: true,     // Include GlobalProvider
  withProjects: false,  // Exclude ProjectsProvider
  withTheme: true,      // Include ThemeProvider
})
```

### Helper Functions

```typescript
import { 
  waitForLoadingToFinish,
  mockMatchMedia,
  mockLocalStorage,
  resetAllMocks 
} from '@/tests/test-utils'

// Wait for async operations
await waitForLoadingToFinish()

// Mock media queries
mockMatchMedia(true) // true = dark mode preference

// Mock localStorage with methods
const storage = mockLocalStorage()
storage.getItem.mockReturnValue('stored-value')

// Reset all mocks between tests
resetAllMocks()
```

## 🎯 Testing Patterns

### Component Testing

#### Basic Component
```typescript
describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

#### Component with Props
```typescript
describe('Card', () => {
  const defaultProps = {
    title: 'Test Title',
    content: 'Test content',
    variant: 'default' as const,
  }

  it('renders with required props', () => {
    render(<Card {...defaultProps} />)
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies variant styles', () => {
    render(<Card {...defaultProps} variant="highlighted" />)
    
    const card = screen.getByRole('article') // or appropriate role
    expect(card).toHaveClass('highlighted-variant-class')
  })
})
```

#### Client Components
```typescript
describe('InteractiveComponent', () => {
  it('updates state on user interaction', () => {
    render(<InteractiveComponent />)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'new value' } })
    
    expect(input).toHaveValue('new value')
  })
})
```

### Provider Testing

```typescript
describe('ThemeProvider', () => {
  it('provides theme context to children', () => {
    const TestComponent = () => {
      const { theme } = useTheme()
      return <div data-testid="theme">{theme}</div>
    }

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme')).toHaveTextContent('light')
  })
})
```

### Hook Testing

```typescript
describe('useCounter', () => {
  it('increments count', () => {
    const { result } = renderHook(() => useCounter())
    
    act(() => {
      result.current.increment()
    })
    
    expect(result.current.count).toBe(1)
  })
})
```

### API Route Testing

```typescript
describe('API Routes', () => {
  it('returns valid response', async () => {
    const request = new NextRequest('http://localhost/api/test?param=value')
    const response = await GET(request)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data).toHaveProperty('result')
  })
})
```

## 🔧 Configuration

### Vitest Config Highlights

- **Environment**: jsdom for DOM testing
- **Setup files**: Automatic mock setup
- **Coverage**: v8 provider with HTML reports
- **Path aliases**: `@/` mapped to project root
- **CSS support**: Enabled for styling tests

### Mocks Included

#### Next.js Components
- ✅ `next/image` → Simple `<img>` tag
- ✅ `next/link` → Simple `<a>` tag  
- ✅ `next/script` → Simple `<script>` tag
- ✅ `next/font/google` → Font objects with variables
- ✅ `next/navigation` → Router hooks and functions

#### Browser APIs
- ✅ `localStorage` / `sessionStorage`
- ✅ `window.matchMedia`
- ✅ `window.scrollTo`
- ✅ `requestAnimationFrame`
- ✅ `ResizeObserver`
- ✅ `IntersectionObserver`

#### External Libraries
- ✅ `framer-motion` → Simple div wrappers
- ✅ `react-slick` → Simple div with test ID
- ✅ `algoliasearch` → Mock search client
- ✅ `fuse.js` → Mock fuzzy search
- ✅ `prismjs` → Mock syntax highlighter
- ✅ `gsap` → Mock animation library

## 🎨 Best Practices

### Test Structure
```typescript
describe('Component/Feature Name', () => {
  // Setup
  beforeEach(() => {
    // Reset mocks, clear localStorage, etc.
  })

  // Group related tests
  describe('when user is authenticated', () => {
    // Tests for authenticated state
  })

  describe('when user is not authenticated', () => {
    // Tests for unauthenticated state  
  })

  // Edge cases
  describe('error handling', () => {
    // Error scenarios
  })
})
```

### Test Descriptions
- ✅ "renders loading state while fetching data"
- ✅ "shows error message when API call fails"
- ✅ "filters projects when tag is selected"
- ❌ "it works"
- ❌ "test component"

### Assertions
```typescript
// Prefer semantic queries
screen.getByRole('button', { name: /submit/i })
screen.getByLabelText(/email address/i)
screen.getByText(/welcome back/i)

// Use specific matchers
expect(element).toBeInTheDocument()
expect(element).toHaveClass('active')
expect(element).toHaveAttribute('aria-expanded', 'true')

// Test behavior, not implementation
fireEvent.click(button) // Good
wrapper.instance().handleClick() // Bad - testing implementation
```

### Async Testing
```typescript
// Use waitFor for async updates
await waitFor(() => {
  expect(screen.getByText('Data loaded')).toBeInTheDocument()
})

// Use findBy queries (built-in waiting)
const element = await screen.findByText('Async content')

// Wrap state updates in act()
await act(async () => {
  result.current.fetchData()
})
```

## 🐛 Troubleshooting

### Common Issues

#### "TextEncoder is not defined"
This is handled by the jsdom environment. If you see this error, ensure your test file is being run with the correct environment.

#### "window is not defined"
Make sure you're using our test setup which configures jsdom. Check that your test imports from `@/tests/test-utils`.

#### "Cannot find module '@/components/...'"
Path aliases are configured in `vitest.config.ts`. Ensure the path exists and the import is correct.

#### React Query Errors
Use our custom render function which includes QueryClient setup, or wrap your component manually:

```typescript
const queryClient = createTestQueryClient()
render(
  <QueryClientProvider client={queryClient}>
    <YourComponent />
  </QueryClientProvider>
)
```

#### Mock Not Working
Ensure mocks are imported at the top of your test file and that you're calling `resetAllMocks()` in `beforeEach` if needed.

### Debug Tips

```typescript
// Debug render output
render(<Component />)
screen.debug() // Prints DOM to console

// Debug specific element
screen.debug(screen.getByRole('button'))

// Find elements during development
screen.logTestingPlaygroundURL() // Opens Testing Playground
```

## 📊 Coverage

Generate coverage reports:

```bash
yarn test:coverage
```

Coverage files are generated in the `coverage/` directory:
- `coverage/index.html` - Visual coverage report
- `coverage/lcov.info` - LCOV format for CI tools

### Coverage Thresholds

Configure in `vitest.config.ts`:

```typescript
coverage: {
  thresholds: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
```

## 🔄 CI Integration

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'yarn'
      
      - run: yarn install --frozen-lockfile
      - run: yarn test:run
      - run: yarn test:coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

### Pre-commit Testing

Tests automatically run on staged files via lint-staged:

```json
{
  "lint-staged": {
    "**/*.{js,ts,tsx}": [
      "eslint --fix",
      "prettier --write", 
      "vitest run --passWithNoTests"
    ]
  }
}
```

## 📚 Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [Testing Playground](https://testing-playground.com/)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## 🎯 Ready to Test!

Your testing environment is fully configured and ready. Start by running the validation test:

```bash
yarn test:validation
```

Then explore the example tests in `tests/examples/` to understand the patterns, and start writing tests for your components!

Happy testing! 🧪✨