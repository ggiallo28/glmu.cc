# Requirements Document

## Introduction

Redesign the GLMU homepage (glmu.cc) to address positioning weaknesses identified in a professional evaluation while complying with Google Cloud Partner Advantage verification requirements. The redesign sharpens the value proposition from a broad multi-technology listing to a focused cloud architecture consultancy for European scale-ups, reframes offerings as outcome-driven engagements, strengthens social proof with verifiable metrics, and reduces friction in the primary call-to-action. All copy and structural decisions must use organizational language referencing "GLMU" as the service delivery entity, avoiding personal or sole-practitioner framing, to maximize acceptance probability during Google's manual legal identity verification process.

## Glossary

- **Homepage**: The single-page React/Preact application served at glmu.cc that contains hero, practice areas, buyer targeting, credentials, case studies, delivery model, and contact sections.
- **Hero_Section**: The above-the-fold area of the Homepage containing the primary headline, sub-headline, differentiator statement, proof line, and call-to-action button.
- **Engagement_Card**: A UI component that presents a single consulting offering with situation, outcome, deliverable, duration, and ideal client profile.
- **Proof_Line**: A concise credibility statement displayed above the fold summarizing engagement count, certifications scope, and geographic coverage.
- **CTA_Button**: The primary call-to-action button that directs visitors to the contact form.
- **Contact_Form**: The form component that collects visitor name, company, email, engagement type, and a brief description of the challenge.
- **Credential_Badge**: A UI element displaying a certification name, status indicator, validity information, and a link to the official verification page.
- **Case_Study_Card**: A UI component presenting an anonymized engagement with situation, actions taken, measurable results, and client profile.
- **Visitor**: A CTO, VP Engineering, Head of Platform, or Head of Data at a European scale-up evaluating cloud architecture consulting services.
- **GLMU**: The trading name of the consultancy (legal name: Gianluigi Mucciolo), positioned as a specialist cloud architecture and engineering consultancy.
- **Practice_Area_Card**: A UI component presenting a Google Cloud professional services capability with scope description and key technologies.
- **Trust_Strip**: A compact horizontal indicator displaying enterprise procurement signals and delivery accountability markers.
- **Problem_Section**: A content section structured around an executive-level business problem, containing business impact, intervention description, deliverables, and expected outcome.
- **Noscript_Block**: An HTML noscript element containing the full textual content of the Homepage for crawler accessibility without JavaScript execution.
- **JSON_LD_Block**: A structured data script element in index.html providing machine-readable organization information for search engine crawlers.
- **Footer_Section**: The bottom section of the Homepage containing legal entity information, VAT number, registered office address, and contact details.

## Requirements

### Requirement 1: Focused Hero Messaging

**User Story:** As a Visitor, I want to immediately understand what GLMU solves and for whom, so that I can determine relevance within seconds of landing.

#### Acceptance Criteria

1. THE Hero_Section SHALL display the primary headline "Cloud architecture for decisions that are expensive to reverse" as an h1 element.
2. THE Hero_Section SHALL display the sub-headline "GLMU supports European scale-ups redesigning cloud, data and AI platforms before rising costs, operational complexity and architectural lock-in restrict their growth." as the first text element immediately following the h1 headline in DOM order.
3. THE Hero_Section SHALL display the differentiator statement "Engagements are delivered with senior-level ownership—from the first architecture decision to production-ready handoff. No account layers, junior substitutions, or unexplained black boxes." fully visible without scrolling on a 1280×800 viewport at default zoom.
4. THE Hero_Section SHALL display the Proof_Line "50+ AWS professional-services engagements · AWS, Google Cloud and Kubernetes expertise · Based in Italy, working across Europe" fully visible without scrolling on a 1280×800 viewport at default zoom.
5. THE Hero_Section SHALL display the secondary tagline "Untangling technical trade-offs before cost and entropy take over" at a smaller font size than the h1 headline and positioned after the sub-headline, visually subordinate to both the headline and sub-headline.
6. THE Hero_Section SHALL NOT contain first-person language, personal names as subject of sentences, or phrases suggesting a sole practitioner as enumerated in Requirement 9 criterion 3.
7. THE Hero_Section SHALL present its text elements in the following top-to-bottom order: primary headline, sub-headline, secondary tagline, differentiator statement, Proof_Line, and CTA_Button.

### Requirement 2: Outcome-Driven Engagement Presentation

**User Story:** As a Visitor, I want to see what concrete outcomes each engagement produces, so that I can match my situation to a relevant offering without decoding technical jargon.

#### Acceptance Criteria

1. THE Homepage SHALL present exactly three Engagement_Card components in the engagements section.
2. WHEN an Engagement_Card is displayed, THE Engagement_Card SHALL contain the following fields in this order: initial situation description, result achieved, list of deliverables (between 2 and 5 items), typical duration (expressed as a week range), ideal client profile, and explicit exclusions.
3. THE first Engagement_Card SHALL describe a cloud platform architecture engagement with the outcome framed as bringing a platform from shared tenants to isolated, auditable architecture.
4. THE second Engagement_Card SHALL describe an AI and data platform engagement with the outcome framed as moving AI workloads from prototype to production-grade with cost controls.
5. THE third Engagement_Card SHALL describe an enablement engagement with the outcome framed as achieving team autonomy in cloud and platform operations after the engagement ends.
6. THE Engagement_Card components SHALL NOT present offerings as technology lists or activity descriptions; each card SHALL lead with the client situation and result rather than tools or methods.

### Requirement 3: Verifiable Credentials with Status

**User Story:** As a Visitor, I want to verify claimed certifications independently, so that I can trust the expertise being presented.

#### Acceptance Criteria

1. WHEN a Credential_Badge is displayed, THE Credential_Badge SHALL show the certification name, a status indicator (active or expired), the validity date formatted as month and year (e.g., "Valid until Dec 2025"), and a hyperlink to the official verification page that opens in a new browser tab.
2. THE Homepage SHALL display Credential_Badge components for all claimed certifications: Professional Cloud Architect (GCP), Generative AI Leader (GCP), Authorized Instructor (AWS), Professional Solutions Architect (AWS), Certified Kubernetes Administrator (CNCF), and Certified Kubernetes Application Developer (CNCF).
3. THE Homepage SHALL display a hyperlink to the GLMU AWS Marketplace seller profile in the credentials section, visible without requiring user interaction to reveal it.
4. IF a certification has an expired status, THEN THE Credential_Badge SHALL visually distinguish the expired state from an active state by displaying a text label indicating "Expired" and reducing the visual prominence of the badge relative to active certifications.
5. WHEN a visitor activates a verification hyperlink on a Credential_Badge, THE Credential_Badge hyperlink SHALL navigate to the issuing authority's public credential verification page for that specific certification.

### Requirement 4: Reduced-Friction Call-to-Action

**User Story:** As a Visitor, I want to request an architecture review without navigating a formal corporate inquiry process, so that I can start a conversation with minimal effort.

#### Acceptance Criteria

1. THE CTA_Button SHALL use the label "Request an Architecture Review" instead of language referencing corporate briefs or compliance boundaries.
2. THE Contact_Form SHALL collect: contact name (required, maximum 100 characters), company name (required, maximum 100 characters), email address (required), engagement interest (required, dropdown with exactly three options: "Cloud Platform Architecture", "AI & Data Platform", and "Enablement & Team Autonomy"), and a free-text field labeled "Describe your challenge" (required, maximum 1000 characters) with placeholder text "e.g. We're migrating to multi-tenant but unsure about isolation strategy..."
3. THE Contact_Form SHALL NOT require the visitor to specify compliance boundaries or training requirements.
4. THE Hero_Section SHALL contain one CTA_Button that scrolls the viewport to the Contact_Form section.
5. THE navigation header SHALL contain one CTA_Button labeled "Request an Architecture Review" that scrolls the viewport to the Contact_Form section.
6. THE Contact_Form SHALL use organizational language referencing "GLMU" and SHALL NOT contain first-person phrasing or personal names as subjects.
7. WHEN the Contact_Form is submitted with all required fields populated and a valid email address, THE Contact_Form SHALL display a confirmation message indicating that the request has been received.
8. IF the Contact_Form submission fails due to a network error or server error, THEN THE Contact_Form SHALL display an error message indicating the submission was unsuccessful, preserve all entered field values, and allow the visitor to retry submission.
9. IF the visitor submits the Contact_Form with an invalid email address format, THEN THE Contact_Form SHALL display an inline validation error indicating the email format is incorrect and SHALL NOT submit the form data.

### Requirement 5: Strengthened Social Proof

**User Story:** As a Visitor, I want to see evidence of past results with measurable outcomes, so that I can assess the track record before engaging.

#### Acceptance Criteria

1. THE Homepage SHALL display at least two and no more than four Case_Study_Card components in a dedicated social proof section with a visible section heading.
2. WHEN a Case_Study_Card is displayed, THE Case_Study_Card SHALL contain: an anonymized client description specifying the client's industry and employee-count range, the initial situation as a problem statement, the actions taken as a summary of the engagement approach, and at least one quantified result metric expressed as a numeric value with a unit of measurement (percentage improvement, time reduction, cost savings, or throughput gain).
3. THE Homepage SHALL retain existing testimonial quotes and position them after the last Case_Study_Card component within the same social proof section.
4. THE Proof_Line in the Hero_Section SHALL reference "50+ AWS professional-services engagements" as the primary volume metric.
5. IF a Case_Study_Card contains more than one quantified result metric, THEN THE Case_Study_Card SHALL display each metric as a separate, visually distinct element.

### Requirement 6: Clear Expertise Hierarchy

**User Story:** As a Visitor, I want to understand the primary expertise area at a glance, so that I know this is a cloud and data architecture specialist rather than a generalist.

#### Acceptance Criteria

1. THE Homepage SHALL present cloud and data architecture as the primary competency, visually distinguished from supporting competencies by at least two of the following: larger typographic size, higher page position, or greater allocated display area.
2. THE Homepage SHALL present DevOps, FinOps, security, observability, and training as supporting competencies grouped together in a separate visual container positioned after and below the primary competency.
3. THE Homepage SHALL NOT present all competency domains with equal visual weight; the primary competency element SHALL have a larger font size or heading level than any supporting competency element.
4. THE competencies section SHALL display the phrase "Cloud + Data + AI as a single system" or an equivalent heading that explicitly groups cloud, data, and AI as interconnected rather than listing them as independent technology domains.
5. IF a supporting competency is displayed, THEN THE Homepage SHALL present it at a lower heading level or smaller type size than the primary competency heading.

### Requirement 7: Explicit Buyer Targeting

**User Story:** As a Visitor, I want to see that this consultancy works with companies like mine, so that I feel confident requesting a conversation.

#### Acceptance Criteria

1. THE Homepage SHALL display the target buyer roles "CTO", "VP Engineering", "Head of Platform", and "Head of Data" as visible text within a single buyer-targeting content block.
2. THE Homepage SHALL display the target company profile within the same buyer-targeting content block, stating: funding stage (Series B through D), team size (50 to 500 people), geography (European), and domain focus (cloud, data, or AI platforms moving to production).
3. THE Homepage SHALL NOT reference telcos, large enterprises, or corporate training buyers as client segments in any section.
4. THE buyer-targeting content block SHALL be positioned within the identity section (above the engagements section) and SHALL be visible without user interaction such as clicking, expanding, or scrolling within a container.
5. WHEN the buyer-targeting content block is rendered, THE Homepage SHALL display both buyer roles and company profile attributes without requiring JavaScript interaction to reveal them.

### Requirement 8: Distinctive Elements Communication

**User Story:** As a Visitor, I want to understand what makes this consultancy different from agencies and large firms, so that I can justify the premium positioning.

#### Acceptance Criteria

1. THE Homepage SHALL display the four distinctive elements as individually distinguishable content items: decisions not just implementation, cloud plus data plus AI as a single system, senior-level ownership with continuity across the engagement, and team autonomy after the engagement.
2. THE Homepage SHALL present the four distinctive elements as a dedicated section or integrated into the hero and identity sections.
3. THE distinctive elements SHALL each describe a measurable result or state change the client achieves rather than naming a methodology, framework, or theoretical concept without a stated client result.
4. THE distinctive elements SHALL NOT use phrases suggesting a sole practitioner including "one senior engineer from start to delivery", "independent consultancy", "personal service", or "directly delivered by" followed by a personal name.

### Requirement 9: Google Cloud Partner-Compliant Branding

**User Story:** As a Visitor, I want to perceive GLMU as an established organizational entity, so that the consultancy appears credible for enterprise engagements and partner program verification.

#### Acceptance Criteria

1. THE Homepage SHALL use "GLMU" as the grammatical subject in every sentence that describes a service, capability, engagement, or deliverable throughout all sections.
2. THE Homepage SHALL use organizational phrasing including "GLMU provides", "GLMU supports", "engagements are delivered", "delivery capabilities", and "specialist expertise" when describing services.
3. THE Homepage SHALL NOT contain the following language anywhere in visible content (including rendered text, alt attributes, and aria-label values, but excluding legally required entity disclosures in the Footer_Section and JSON_LD_Block): "freelance", "independent consultant", "sole practitioner", "one-person consultancy", "founder-led", "direct access to the engineer", "our team", "our consultants", "Meet the founder", "one engineer from start to finish", "independent consultancy", "personal service", or "directly delivered by" followed by a personal name.
4. THE Homepage SHALL NOT use first-person pronouns ("I", "my") or first-person biographical narratives in any section.
5. THE Homepage SHALL NOT display a photograph of a single identifiable person as the largest or sole image within any section, nor at a rendered size exceeding 25% of the viewport width or height.
6. THE Homepage SHALL NOT claim "Google Cloud Partner" status, display Google Partner badges, use "Google-certified company", or display Google logos as endorsement until partner acceptance is confirmed.
7. IF a personal name appears on the Homepage outside the Footer_Section or JSON_LD_Block, THEN THE Homepage SHALL present it only within a credential verification context (such as a certification registry link) and SHALL NOT use it as the subject of a service delivery statement.

### Requirement 10: Legal Entity Information

**User Story:** As a Visitor, I want to see verified legal entity information, so that I can confirm GLMU is a legitimate registered business.

#### Acceptance Criteria

1. THE Footer_Section SHALL display the VAT number "IT06158220654" in visible HTML text.
2. THE Footer_Section SHALL display the registered office address "Contrada Fontana Salerno 6, 84049 Castel San Lorenzo (SA), Italy" in visible HTML text.
3. THE Homepage SHALL contain a JSON_LD_Block in the index.html head or body providing structured Organization data including: legal name "Gianluigi Mucciolo", trading name "GLMU", VAT number "IT06158220654", registered office address, email address using the glmu.cc domain, and website URL.
4. THE legal entity data displayed in the Footer_Section (VAT number, address, and contact email) SHALL be consistent with the corresponding values in the JSON_LD_Block.
5. THE Footer_Section SHALL display a domain-based contact email address (using the glmu.cc domain).

### Requirement 11: Impersonal Professional Background Section

**User Story:** As a Visitor, I want to understand GLMU's expertise and delivery approach, so that I can assess organizational capability without relying on individual reputation.

#### Acceptance Criteria

1. THE Homepage SHALL contain an "About GLMU" section with the following organizational description: "GLMU is a specialist cloud architecture and engineering consultancy supporting organisations across cloud platforms, enterprise AI, data systems, security, governance, and technical enablement."
2. THE "About GLMU" section SHALL contain the following engagement description: "Engagements are structured around each organisation's requirements, combining strategic architecture, hands-on implementation, and knowledge transfer."
3. THE Homepage SHALL contain a "Delivery model" subsection with the following content: "GLMU provides senior-level ownership across discovery, architecture, implementation, and enablement. Delivery is organised according to the scope and specialist capabilities required by each engagement, with clear accountability, direct communication, and continuity from initial assessment through production readiness."
4. THE "About GLMU" section SHALL NOT contain personal biographies, first-person language ("I", "my"), "Meet the founder" headings, personal narrative text, headshot photographs, or references to a single named individual as the subject of service delivery statements.
5. THE "About GLMU" section SHALL reference verifiable credentials by listing certification names with "GLMU" or "GLMU's practice" as the subject (not a personal name), and SHALL include a hyperlink to the LinkedIn company or professional profile labeled as an organizational verification link rather than a personal biography link.
6. WHEN credentials are displayed in the "About GLMU" section, THE section SHALL present them as organizational capabilities (e.g., "GLMU holds" or "Certifications held within GLMU") and SHALL NOT use personal possessive phrasing (e.g., "his certifications", "my credentials") or accompany them with employment history, education background, or career narrative.

### Requirement 12: Google Cloud Services Visibility

**User Story:** As a Visitor, I want to see specific Google Cloud professional services capabilities, so that I can assess GLMU's relevance for Google Cloud engagements.

#### Acceptance Criteria

1. THE Homepage SHALL display exactly six Practice_Area_Card components covering the following domains in this order: Cloud Infrastructure, Data Platforms, AI and ML, Infrastructure Automation, Security and Governance, and Migration and Cost Optimization.
2. WHEN a Practice_Area_Card is displayed, THE Practice_Area_Card SHALL contain a scope description and a list of key technologies relevant to the domain, and SHALL be visible without requiring user interaction (expanded by default).
3. WHEN multiple cloud platforms are referenced in the same context, THE Homepage SHALL list them in the following order: Google Cloud, Amazon Web Services, Kubernetes.
4. THE Homepage SHALL NOT claim Google Cloud Partner status, display Google Cloud Partner badges, use phrases containing "Google Cloud Partner", or display Google certification logos as endorsement.
5. THE Homepage SHALL describe Google Cloud capability using language that references consulting services or engineering experience for Google Cloud environments, without claiming partnership, endorsement, or official affiliation with Google.
6. WHEN describing Google Cloud capability, THE Homepage SHALL use organizational phrasing with "GLMU" as the subject, consistent with Requirement 9 branding constraints.

### Requirement 13: Crawler-Accessible Content

**User Story:** As a search engine or verification crawler, I want to read all critical Homepage content without executing JavaScript, so that the site content is indexable and verifiable.

#### Acceptance Criteria

1. THE Homepage SHALL contain a Noscript_Block that includes text content for each of the following sections: Hero_Section headline and sub-headline, competencies with all domain names and descriptions, all Credential_Badge names and identifiers, at least one testimonial quote with attribution, contact email address, and Footer_Section legal entity data (legal name, VAT number, and registered address).
2. THE Footer_Section with legal entity data SHALL be present in the initial HTML source served by the web server without requiring JavaScript execution.
3. THE Homepage SHALL include Open Graph meta tags (og:title, og:description, og:url, og:type) and Twitter Card meta tags (twitter:card, twitter:title, twitter:description) in the HTML head element of the static HTML document.
4. THE Homepage SHALL NOT contain any text matching "under construction", "coming soon", "lorem ipsum", "placeholder", "[insert", or "TODO" in any section of the rendered or static HTML content.
5. WHEN the Noscript_Block content is compared to the JavaScript-rendered content, THE Noscript_Block SHALL contain the same section headings, the same credential names and identifiers, the same engagement titles, and the same legal entity data values (VAT number, legal name, registered address) as the JavaScript-rendered version.
6. THE Homepage SHALL contain a JSON_LD_Block in the static HTML source providing structured Organization data that is parseable without JavaScript execution.

### Requirement 14: Homepage Section Order

**User Story:** As a Visitor, I want to encounter information in a logical order that builds trust progressively, so that I can evaluate relevance, credibility, and fit without excessive scrolling.

#### Acceptance Criteria

1. THE Homepage SHALL present sections in the following DOM and visual order: Hero_Section (company proposition), Practice Areas (Google Cloud services), Buyer Targeting (who GLMU serves), Credentials and Professional Background, Selected Experience or Case Studies, Delivery Model, Contact (domain-based contact details), and Footer_Section (registered company information).
2. THE Hero_Section SHALL appear as the first visible section within the initial viewport on screens with a minimum height of 768 pixels at default zoom, with no other content section preceding it in the DOM.
3. THE Practice Areas section SHALL appear as the next sibling section in the DOM directly after the Hero_Section, with no intervening visible content sections between them.
4. THE Footer_Section with legal entity information SHALL appear as the last section in the DOM order, after the Contact section and before any fixed-position or floating UI elements.
5. THE Homepage section order SHALL be determined by DOM source order; no section SHALL use CSS positioning or flexbox/grid ordering to visually reorder sections away from their DOM sequence.

### Requirement 15: SEO and Meta Optimization

**User Story:** As a Visitor arriving from search, I want the page title and description to clearly communicate what GLMU does, so that I can decide to click through from search results.

#### Acceptance Criteria

1. THE Homepage SHALL use the HTML `<title>` element with the exact text "Cloud, Data & AI Architecture for Complex Enterprises | GLMU".
2. THE Homepage SHALL use the `<meta name="description">` element with the exact text "Cloud, data, and AI architecture for organisations facing complexity, sovereignty, and scaling constraints. Senior-level ownership from strategy to production handoff."
3. WHEN the term "sovereign" is first used in visible Homepage content, THE Homepage SHALL provide a definition within the same paragraph or as parenthetical text immediately following the term, containing at minimum the concepts of data residency, operational autonomy, portability, and regulated-environment requirements.
4. THE Homepage SHALL include a `<link rel="canonical">` element in the HTML head with the value "https://glmu.cc/".

### Requirement 16: Enterprise Trust Strip

**User Story:** As a Visitor, I want to see concise enterprise procurement and delivery signals, so that I can quickly assess whether GLMU meets enterprise vendor requirements.

#### Acceptance Criteria

1. THE Homepage SHALL display a Trust_Strip component containing the following indicators: "Available through AWS Marketplace", "Senior-level delivery accountability", "English and Italian", and "Direct accountability".
2. THE Trust_Strip SHALL be positioned directly below the Hero_Section, visually separated from both the Hero_Section and the subsequent Practice Areas section.
3. THE Trust_Strip SHALL be displayed as a horizontal element occupying no more than two lines of text height at any viewport width, with all four indicators visible without requiring user interaction to reveal content.
4. WHEN the viewport width is less than 768 pixels, THE Trust_Strip SHALL wrap indicators onto a second line rather than truncating or hiding any indicator.

### Requirement 17: Problem-Oriented Section Structure

**User Story:** As a Visitor, I want to see my business challenges reflected in the Homepage structure, so that I can quickly identify that GLMU understands problems at an executive level.

#### Acceptance Criteria

1. THE Homepage SHALL present exactly five Problem_Section components with the following labels displayed as section headings: "Fragmented Architecture", "Uncontrolled Cloud Economics", "AI Without Operational Readiness", "Diffused Accountability", and "Sovereignty and Control".
2. WHEN a Problem_Section is displayed, THE Problem_Section SHALL contain four visually distinguishable subsections in this order: business impact description (stating the executive-level problem and its consequences), intervention description (stating what GLMU does to resolve it), list of deliverables (between 2 and 6 items), and expected outcome (stating the measurable or observable end state after engagement).
3. THE Problem_Section components SHALL replace the Practice_Area_Card section as the primary service presentation structure on the Homepage.
4. THE "Fragmented Architecture" Problem_Section business impact description SHALL describe systems that have evolved independently without unified governance.
5. THE "Uncontrolled Cloud Economics" Problem_Section business impact description SHALL describe cloud costs rising without proportional business value.
6. THE "AI Without Operational Readiness" Problem_Section business impact description SHALL describe AI experiments that are not reaching production.
7. THE "Diffused Accountability" Problem_Section business impact description SHALL describe teams lacking architectural ownership.
8. THE "Sovereignty and Control" Problem_Section business impact description SHALL describe regulatory requirements that limit standard cloud patterns.
1. THE Homepage SHALL achieve a PageSpeed Insights mobile performance score of 95 or higher.
2. THE Homepage SHALL achieve a First_Contentful_Paint of 1.8 seconds or less on a simulated mobile 4G connection.
3. THE Homepage SHALL achieve a Largest_Contentful_Paint of 2.5 seconds or less on a simulated mobile 4G connection.
4. THE Homepage SHALL achieve a Total Blocking Time of 50 milliseconds or less on a simulated mobile 4G connection.
5. THE Homepage SHALL be designed and tested mobile-first, with desktop treated as a progressive enhancement of the mobile layout.
6. WHEN static assets are served with content-hashed filenames, THE Homepage hosting configuration SHALL set Cache-Control headers with max-age of at least one year or include the immutable directive.
7. THE Homepage SHALL achieve a Cumulative_Layout_Shift score of 0.05 or less on mobile.

### Requirement 19: Critical Rendering Path Elimination

**User Story:** As a Visitor, I want to see meaningful content immediately when the HTML document loads, so that I do not stare at a blank screen while JavaScript downloads and executes.

#### Acceptance Criteria

1. THE Homepage SHALL render all Above_The_Fold_Content directly from the initial HTML document response without requiring JavaScript execution.
2. THE Homepage SHALL NOT contain a Critical_Request_Chain where visible content depends on downloading and executing a JavaScript bundle before first paint.
3. THE Hero_Section h1 headline, sub-headline, Proof_Line, and CTA_Button SHALL be present as static HTML elements in the server-delivered document.
4. THE Largest_Contentful_Paint element (h1 headline) SHALL have zero element render delay attributable to JavaScript execution.
5. WHEN JavaScript fails to load or execute, THE Homepage SHALL still display all textual content and navigation in a readable layout.

### Requirement 20: Minimal JavaScript Architecture

**User Story:** As a Visitor, I want the page to load with minimal JavaScript overhead, so that the site performs well on constrained mobile devices and slow networks.

#### Acceptance Criteria

1. THE Homepage SHALL deliver all static content (text, layout, navigation) as pre-rendered HTML generated at Build_Time_Rendering, following a Progressive_Enhancement strategy.
2. THE Homepage SHALL NOT require a single-page application framework (Preact, React, or equivalent) for rendering static page content.
3. WHEN interactive functionality is required (Contact_Form submission, credential card toggles, mobile navigation menu), THE Homepage SHALL use vanilla JavaScript loaded asynchronously or deferred.
4. THE total JavaScript payload required for initial page render SHALL be zero bytes.
5. THE total JavaScript payload for all interactive enhancements SHALL NOT exceed 10 kilobytes (gzipped) combined.
6. WHEN the Vite build process executes, THE build output SHALL produce a complete index.html file containing all visible content as static HTML with inlined CSS.

### Requirement 21: Layout Stability

**User Story:** As a Visitor, I want the page content to remain stable after it first appears, so that I can read and click elements without them shifting unexpectedly.

#### Acceptance Criteria

1. THE Homepage SHALL achieve a Cumulative_Layout_Shift score of 0.01 or less.
2. THE Hero_Section h1 headline SHALL NOT cause a layout shift by appearing only after JavaScript execution; the headline text SHALL be present in the initial HTML.
3. WHEN web fonts are loaded, THE Homepage SHALL use font-display swap with fallback font metrics that match the web font dimensions to minimize Cumulative_Layout_Shift.
4. WHEN images (logo SVGs, credential badges) are rendered, THE Homepage SHALL specify explicit width and height attributes or use CSS aspect-ratio to reserve space before the image loads.
5. THE Homepage SHALL NOT rely on JavaScript to inject or modify visible DOM elements that affect layout geometry after the initial HTML paint.

### Requirement 22: Forced Layout Avoidance

**User Story:** As a Visitor on a mobile device, I want smooth scrolling and responsive interactions, so that the page does not stutter due to layout thrashing.

#### Acceptance Criteria

1. THE Homepage JavaScript SHALL NOT read geometric properties (offsetTop, offsetHeight, getBoundingClientRect) after modifying styles or DOM structure within the same animation frame.
2. WHEN scroll-based interactions are implemented (mobile card highlighting, intersection observers), THE Homepage SHALL batch all DOM geometry reads before any DOM writes within each frame callback.
3. THE Homepage SHALL NOT execute forced synchronous layout operations that block the main thread for more than 50 milliseconds.
4. WHEN scroll event listeners are attached, THE Homepage SHALL register them with the passive option set to true.

### Requirement 23: Font Loading Optimization

**User Story:** As a Visitor, I want text to be readable immediately on page load, so that I do not see invisible text or flash of unstyled content while fonts download.

#### Acceptance Criteria

1. THE Homepage SHALL preload the primary display font (Plus Jakarta Sans 600 weight) to minimize render-blocking font fetches.
2. THE Homepage SHALL use font-display swap for all web font declarations to ensure text remains visible during font loading.
3. THE Homepage SHALL define a system font fallback stack with size-adjusted metrics that approximate the web font dimensions to reduce layout shift during font swap.
4. WHEN the font preload completes, THE Homepage SHALL NOT trigger a visible layout shift in the Hero_Section exceeding 0.005 CLS contribution.


### Requirement 24: Preact Removal and Static-First Build Pipeline

**User Story:** As a Visitor on a mobile device, I want the Homepage to paint content in under 1.5 seconds on a 4G connection, so that the site feels instant without depending on a client-side rendering framework that adds unnecessary latency to a static content page.

#### Acceptance Criteria

1. THE Homepage build pipeline SHALL remove Preact and the @preact/preset-vite plugin as production dependencies.
2. THE Homepage SHALL deliver Above_The_Fold_Content as static HTML in the document body (not inside a noscript element), so that the browser can paint content immediately upon receiving the HTML response.
3. THE Homepage SHALL achieve a First_Contentful_Paint and Largest_Contentful_Paint of 1.5 seconds or less on a simulated mobile 4G connection (Lighthouse default throttling).
4. THE Homepage CSS SHALL use a mobile-first responsive strategy where the base styles target mobile viewport widths and min-width media queries progressively enhance the layout for larger screens.
5. THE Vite build configuration SHALL produce a static index.html containing all page content as server-ready HTML, with optional JavaScript loaded via defer or async attributes for Progressive_Enhancement only.
6. WHEN the build pipeline is modified, THE Homepage SHALL retain all existing content and section structure defined in Requirements 1 through 17 without functional regression.
7. IF the Contact_Form requires client-side JavaScript for submission, THEN THE Contact_Form SHALL render its HTML structure (labels, inputs, button) as static markup and attach event handlers only after the JavaScript enhancement loads.
