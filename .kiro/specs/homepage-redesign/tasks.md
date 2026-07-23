# Implementation Plan: Homepage Redesign

## Overview

Transform the GLMU homepage from a Preact client-side rendered SPA into a static-first build pipeline. The implementation builds the Vite prerender infrastructure first, then creates components bottom-up (leaf components → composite sections → page shell), wires content data, and validates the output meets performance and compliance requirements.

## Tasks

- [ ] 1. Restructure build pipeline and project foundation
  - [ ] 1.1 Update package.json dependencies and Vite config
    - Move `preact` to devDependencies, add `preact-render-to-string` as devDependency
    - Remove `@preact/preset-vite` from dependencies entirely
    - Remove `@jason.today/webmcp` dependency
    - Update `vite.config.ts`: remove `preact()` plugin, add `prerenderPlugin()`, add `removeRuntimeScripts()` plugin, update `rollupOptions` for `enhance.ts` entry point
    - Keep existing `inlineCss()` plugin intact
    - _Requirements: 24.1, 24.5, 20.6_

  - [ ] 1.2 Create component directory structure and TypeScript config
    - Create `src/components/` directory
    - Create `src/data/` directory
    - Update `tsconfig.json` to configure JSX for Preact (`jsxImportSource: "preact"`) for build-time rendering
    - Add path aliases if needed for clean imports
    - _Requirements: 24.5_

  - [ ] 1.3 Update index.html template
    - Update `<title>` to exact text: "Cloud, Data & AI Architecture for Complex Enterprises | GLMU"
    - Update `<meta name="description">` to exact required text
    - Update `<link rel="canonical">` to "https://glmu.cc/"
    - Update Open Graph meta tags (og:title, og:description, og:url, og:type)
    - Update Twitter Card meta tags (twitter:card, twitter:title, twitter:description)
    - Update JSON-LD block with correct Organization structured data (legal name, trading name "GLMU", VAT, address, email, URL)
    - Remove `<div id="root"></div>` — prerender plugin will inject full HTML
    - Remove `<script type="module" src="/src/main.tsx"></script>`
    - Add `<script src="/enhance.js" defer></script>`
    - Add font preload for Plus Jakarta Sans 600 weight
    - Update CSP header to reflect new asset loading strategy
    - _Requirements: 15.1, 15.2, 15.4, 10.3, 13.3, 13.6, 23.1, 24.2, 24.5_

- [ ] 2. Checkpoint - Verify build pipeline compiles
  - Ensure the Vite build runs without errors (even if output is minimal HTML). Ask the user if questions arise.

- [ ] 3. Create content data layer
  - [ ] 3.1 Define TypeScript interfaces for all content types
    - Create `src/data/content.ts` with the full `SiteContent` interface and all nested types
    - Define interfaces: `HeroData`, `TrustStripData`, `ProblemData`, `EngagementData`, `BuyerTargetData`, `CredentialData`, `CaseStudyData`, `TestimonialData`, `DistinctiveElementData`, `AboutData`, `ContactData`, `FooterData`, `SEOData`
    - _Requirements: 1.1–1.7, 2.2, 3.1, 4.2, 5.2, 7.1–7.2, 8.1, 10.1–10.5, 11.1–11.3, 16.1, 17.1–17.2_

  - [ ] 3.2 Populate content data with all required copy
    - Fill hero content: exact headline, sub-headline, tagline, differentiator, proof line, CTA label
    - Fill trust strip: exactly 4 indicators per Req 16.1
    - Fill 5 problem sections with business impact, intervention, deliverables, expected outcome
    - Fill 3 engagement cards with situation, result, deliverables, duration, ideal client, exclusions
    - Fill buyer targeting: roles, funding stage, team size, geography, domain focus
    - Fill 6 credentials with name, status, validUntil, verifyUrl, issuer
    - Fill 2-4 case studies with client description, situation, actions, result metrics
    - Fill testimonials (retain existing quotes)
    - Fill 4 distinctive elements with title and measurable result description
    - Fill about section with exact required text from Req 11.1, 11.2, 11.3
    - Fill footer with VAT, address, email, legal name
    - Ensure NO first-person language, NO prohibited phrases from Req 9.3, NO Google Cloud Partner claims
    - _Requirements: 1.1–1.7, 2.1–2.6, 3.2, 4.1–4.2, 5.1–5.4, 7.1–7.3, 8.1–8.4, 9.1–9.7, 10.1–10.5, 11.1–11.6, 16.1, 17.1–17.8_

- [ ] 4. Implement leaf components
  - [ ] 4.1 Implement CredentialBadge component
    - Create `src/components/CredentialBadge.tsx`
    - Render certification name, status indicator (active/expired), validity date, verify link
    - Expired badges: reduced visual prominence + "Expired" text label
    - Links: `target="_blank" rel="noopener noreferrer"`
    - Use Tailwind 4 utility classes, mobile-first
    - _Requirements: 3.1, 3.4, 3.5_

  - [ ] 4.2 Implement EngagementCard component
    - Create `src/components/EngagementCard.tsx`
    - Render fields in order: situation → result → deliverables → duration → ideal client → exclusions
    - Lead with situation and result, NOT technology lists
    - Mobile-first responsive layout
    - _Requirements: 2.2, 2.6_

  - [ ] 4.3 Implement CaseStudyCard component
    - Create `src/components/CaseStudyCard.tsx`
    - Render: anonymized client description → situation → actions → result metrics
    - Multiple metrics displayed as separate visually distinct elements
    - _Requirements: 5.2, 5.5_

  - [ ] 4.4 Implement CredentialBadge, TrustStrip, and DistinctiveElements components
    - Create `src/components/TrustStrip.tsx`: horizontal bar with 4 indicators, max 2 lines, wraps on <768px
    - Create `src/components/DistinctiveElements.tsx`: 4 individually distinguishable items, each with measurable result
    - _Requirements: 16.1–16.4, 8.1–8.4_

- [ ] 5. Implement section-level components
  - [ ] 5.1 Implement Header component
    - Create `src/components/Header.tsx`
    - Sticky nav with GLMU text logo + CTA button "Request an Architecture Review"
    - CTA links to `#contact`
    - Mobile: hamburger icon (toggle handled by enhance.ts)
    - No JS required for basic display
    - _Requirements: 4.5, 9.1_

  - [ ] 5.2 Implement HeroSection component
    - Create `src/components/HeroSection.tsx`
    - Render elements in DOM order: h1 headline → sub-headline → tagline → differentiator → proof line → CTA button
    - h1 element for primary headline
    - CTA button links to `#contact`
    - Ensure content fits without scroll on 1280×800 viewport
    - No first-person language
    - _Requirements: 1.1–1.7, 4.1, 4.4, 9.4_

  - [ ] 5.3 Implement ProblemSection component
    - Create `src/components/ProblemSection.tsx`
    - Render 4 visually distinct subsections: business impact → intervention → deliverables → expected outcome
    - Used 5 times with different content data
    - _Requirements: 17.1–17.8_

  - [ ] 5.4 Implement BuyerTargeting component
    - Create `src/components/BuyerTargeting.tsx`
    - Display target roles, company profile (funding stage, team size, geography, domain focus)
    - Visible without JS interaction, single block
    - No telco/enterprise/training references
    - _Requirements: 7.1–7.5_

  - [ ] 5.5 Implement AboutSection component
    - Create `src/components/AboutSection.tsx`
    - "About GLMU" heading with exact organizational description text
    - Engagement description paragraph
    - "Delivery model" subsection with exact required text
    - LinkedIn organizational profile link
    - No personal bios, headshots, first-person language, "Meet the founder"
    - _Requirements: 11.1–11.6_

  - [ ] 5.6 Implement ContactForm component
    - Create `src/components/ContactForm.tsx`
    - Static HTML form: name, company, email, engagement dropdown (3 options), challenge textarea
    - HTML5 validation attributes: `required`, `type="email"`, `maxlength`
    - Placeholder text per Req 4.2
    - Labels use organizational language
    - Form action as fallback, JS enhancement via enhance.ts
    - _Requirements: 4.2, 4.3, 4.6, 4.9, 24.7_

  - [ ] 5.7 Implement Footer component
    - Create `src/components/Footer.tsx`
    - Display VAT number "IT06158220654", registered address, glmu.cc email, legal name
    - Data consistent with JSON-LD block
    - _Requirements: 10.1, 10.2, 10.4, 10.5_

  - [ ] 5.8 Implement Noscript component
    - Create `src/components/Noscript.tsx`
    - Include text content for: hero headline + sub-headline, competencies with domain names, all credential names + identifiers, at least one testimonial with attribution, contact email, footer legal data
    - Content must match JS-rendered version (same headings, credential names, legal data)
    - _Requirements: 13.1, 13.2, 13.5_

- [ ] 6. Checkpoint - Verify components render independently
  - Ensure all components compile and can be imported without errors. Ask the user if questions arise.

- [ ] 7. Assemble page shell and implement enhance.ts
  - [ ] 7.1 Implement App.tsx page shell
    - Rewrite `src/App.tsx` as root component composing all sections
    - Import all components and content data
    - DOM order per Req 14: Header → Hero → TrustStrip → ProblemSections (×5) → EngagementCards (×3) → BuyerTargeting → DistinctiveElements → Credentials → AboutSection → CaseStudies + Testimonials → ContactSection → Footer
    - Include Noscript component
    - Wrap main content in semantic `<main>` element
    - _Requirements: 14.1–14.5_

  - [ ] 7.2 Implement enhance.ts progressive enhancement script
    - Create `src/enhance.ts`
    - Contact form: fetch-based submission to web3forms API, success/error messages, field preservation on error, inline email validation
    - Mobile nav: hamburger toggle for responsive menu
    - Register scroll listeners with `{ passive: true }`
    - Batch DOM reads before writes (no forced layout)
    - Target ≤10KB gzipped total
    - _Requirements: 4.7, 4.8, 4.9, 20.3, 20.5, 22.1–22.4_

  - [ ] 7.3 Implement Vite prerender plugin
    - Create the `prerenderPlugin()` in `vite.config.ts` that imports App, calls `renderToString(App({}))`, and replaces placeholder in index.html with full static content
    - Create `removeRuntimeScripts()` plugin to strip the module script tag
    - Ensure build output is complete static HTML with inlined CSS and deferred enhance.js
    - _Requirements: 19.1–19.5, 20.1, 20.4, 20.6, 24.5_

- [ ] 8. Implement CSS and responsive design
  - [ ] 8.1 Update src/index.css with Tailwind 4 configuration
    - Import Tailwind base, components, utilities
    - Define custom theme: fonts (Plus Jakarta Sans, Space Grotesk, JetBrains Mono), colors, spacing
    - Add font-face fallback with size-adjusted metrics for CLS prevention
    - Mobile-first base styles (no media query = mobile)
    - Progressive enhancement via `min-width` breakpoints (sm: 640px, md: 768px, lg: 1024px)
    - Ensure explicit dimensions on SVG images
    - _Requirements: 18.5, 21.1–21.5, 23.2–23.4, 24.4_

- [ ] 9. Checkpoint - Full build and output validation
  - Run `npm run build` and verify: dist/index.html contains all static content, no `<div id="root">`, no Preact runtime scripts, CSS is inlined, enhance.js is present and deferred. Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Content compliance and accessibility validation
  - [ ] 10.1 Write build output integration tests
    - Create test file using Vitest
    - Parse `dist/index.html` with cheerio/jsdom
    - Assert: all required text content present, correct section DOM order, no runtime script tags, CSS inlined in `<style>`, meta tags correct, JSON-LD valid and parseable, noscript content matches rendered content
    - Assert: no prohibited phrases (Req 9.3), no first-person pronouns, no "Google Cloud Partner" claims
    - Assert: heading hierarchy (h1 → h2 → h3, no skips)
    - _Requirements: 13.1–13.6, 14.1–14.5, 15.1–15.4, 19.1–19.5, 20.4, 20.6, 9.3–9.6_

  - [ ] 10.2 Write component snapshot tests
    - Test each component renders deterministically with known props
    - Use Vitest + `renderToString` from preact-render-to-string
    - Catch unintended output regressions
    - _Requirements: 1.1–1.7, 2.2, 3.1, 5.2, 17.2_

  - [ ] 10.3 Write contact form enhancement tests
    - Test form renders as static HTML without JS
    - Test validation rejects empty fields, invalid email
    - Test success/error state display
    - Test field values preserved on error
    - _Requirements: 4.7, 4.8, 4.9_

- [ ] 11. Final checkpoint - Ensure all tests pass
  - Run full build and test suite. Verify dist output meets all structural requirements. Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- The design has no Correctness Properties section — property-based tests are not applicable for this static HTML/CSS feature
- Unit/snapshot tests validate specific component outputs and content compliance
- Performance validation (Lighthouse scores) should be run manually after deployment or via CI

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["1.3", "3.1"] },
    { "id": 2, "tasks": ["3.2"] },
    { "id": 3, "tasks": ["4.1", "4.2", "4.3", "4.4"] },
    { "id": 4, "tasks": ["5.1", "5.2", "5.3", "5.4", "5.5", "5.6", "5.7", "5.8"] },
    { "id": 5, "tasks": ["7.1", "7.2"] },
    { "id": 6, "tasks": ["7.3", "8.1"] },
    { "id": 7, "tasks": ["10.1", "10.2", "10.3"] }
  ]
}
```
