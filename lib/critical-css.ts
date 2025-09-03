export const criticalCSS = `
/* Critical CSS - Base styles that prevent layout shifts */
:root {
  --background: #FFFFFF;
  --foreground: #0F172A;
  --primary: #E1523A;
  --text-primary: #242528;
  --text-secondary: #166F8E;
}

.dark {
  --background: #000000;
  --foreground: #FFFFFF;
  --text-primary: #FFFFFF;
  --text-secondary: #FFFFFF;
  --primary: #E1523A;
}

* {
  box-sizing: border-box;
  border: 0 solid #e5e7eb;
}

html {
  font-family: var(--font-sans, system-ui, -apple-system, sans-serif);
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  text-rendering: geometricPrecision;
}

body {
  margin: 0;
  font-family: inherit;
  line-height: inherit;
  background-color: var(--background);
  color: var(--foreground);
  font-feature-settings: 'rlig' 1, 'calt' 1;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display, inherit);
  font-weight: 700;
  margin: 0;
}

/* Critical layout styles */
.min-h-screen { min-height: 100vh; }
.flex { display: flex; }
.flex-1 { flex: 1 1 0%; }
.relative { position: relative; }
.hidden { display: none; }
.block { display: block; }

/* Critical responsive utilities */
@media (min-width: 1024px) {
  .lg\\:hidden { display: none; }
  .lg\\:block { display: block; }
  .lg\\:h-\\[600px\\] { height: 600px; }
}

/* Critical hero section styles */
.h-\\[500px\\] { height: 500px; }
.w-full { width: 100%; }
.overflow-hidden { overflow: hidden; }
.bg-cover { background-size: cover; }
.bg-no-repeat { background-repeat: no-repeat; }
.bg-center { background-position: center; }

/* Critical text utilities */
.text-center { text-align: center; }
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
.font-medium { font-weight: 500; }
.uppercase { text-transform: uppercase; }

@media (min-width: 1024px) {
  .lg\\:text-5xl { font-size: 3rem; line-height: 1; }
}

/* Critical spacing */
.gap-10 { gap: 2.5rem; }
.gap-4 { gap: 1rem; }
.py-10 { padding-top: 2.5rem; padding-bottom: 2.5rem; }

@media (min-width: 1024px) {
  .lg\\:py-\\[130px\\] { padding-top: 130px; padding-bottom: 130px; }
  .lg\\:gap-8 { gap: 2rem; }
}
`
