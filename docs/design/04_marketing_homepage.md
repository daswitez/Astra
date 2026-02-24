# Astra Marketing Homepage (Public Sales Page) Design Architecture

**Goal:** Create a stunning, high-conversion landing page for Astra that instantly communicates enterprise value, extreme speed, and the revolutionary "Native Context" philosophy. The landing page must perfectly mirror the internal "Spatial Design System" (Glassmorphism, Depth, GSAP lighting) so the transition from marketing to product feels seamless.

## 1. Standardized Marketing Styles

To maintain the "Stellar Map" and "VisionOS" premium feel on the public page, we extend our foundational styles:

*   **Background:** The deep `var(--color-void)` (#09090B), but enriched for marketing with a very slow, subtle, radially moving CSS gradient that mimics a deep-space nebula (using low-opacity purples and electric blues).
*   **Typography:** Massive, high-contrast typography for the Hero section. We will use a geometric font (e.g., *Clash Display* or *Inter Tight*) with dynamic tracking to look razor-sharp. Text fill will occasionally use subtle iridescent gradients for keywords (e.g., "AI", "Unified").
*   **Glass Containers:** Feature blocks, testimonial cards, and pricing tiers will not use solid colors. They will all use the standardized `.glass-panel` and `.glass-active` utility classes.
*   **GSAP ScrollTrigger:** As the user scrolls down the landing page, elements shouldn't just "appear"—they should float up from the Z-axis, with their glass blurs transitioning from heavy to sharp as they come into focus.

## 2. Page Structure & UX Flow

The landing page is designed to capture the three core corporate personas (The PM, the Engineering Manager, and the Developer) and funnel them toward the "Bottom-Up" MVP adoption strategy.

### Section 1: The Hero (The "Wow" Moment)
*   **Headline:** "The Operating System for the Hybrid Agile Era."
*   **Subheadline:** "Stop switching contexts. Astra unites your documents, tasks, and departmental chats in a single zero-latency workspace powered by Cross-Departmental AI."
*   **Call to Action (CTA):** A glowing glass button with magnetic hover: "Start Your Workspace (Free)".
*   **The Visual:** A massive, floating, 3D-tilted glass mockup of the Astra MVP interface. Using GSAP, as the user moves their mouse over the hero section, the mockup tilts on its X and Y axes, and a "spotlight" runs across its frosted glass edges.

### Section 2: The Core Problem (The Fragmentation Tax & The Anxiety of Chaos)
*   **The Storytelling Element (The Pain):** We must viscerally connect with the user's daily frustration. Engineering leaders and developers feel overwhelmed by the "tab soup." They are losing context, missing messages, and duplicating work.
*   **UX Concept:** A stark, high-contrast section that visually represents chaos. The background shifts to a heavier `var(--color-bg-secondary)` (Deep Obsidian).
*   **The Animation (The Chaos Web):** Using **Spline** or **WebGL**, we show 3D nodes representing disjointed tools (Jira, Slack, Notion, GitHub) vibrating violently, connected by tangled, red/orange glowing threads (representing friction and lost context). As the user scrolls, the vibration intensifies, simulating cognitive overload.
*   **The Message (SplitType Reveal):** "Your team loses 40% of their day switching between 10 different apps. The cognitive load is breaking your highest performers."

### Section 2.5: The Solution (The "Singularity" Moment)
*   **The Transition:** As the user continues scrolling, a massive **GSAP ScrollTrigger** timeline takes over. The tangled threads snap. The vibrating tool nodes are powerfully sucked into a central, glowing singularity in the middle of the screen.
*   **The Clarity:** Out of the singularity, a pristine, organized, glowing Astra glass panel emerges. The background transitions back to the clean, deep void with subtle, calming Champagne Gold accents.
*   **The Storytelling Element (The Relief):** "Astra brings it all home. Native context. Zero latency. Complete clarity." This connects the user's pain directly to the elegance of our solution.

### Section 3: The Four Pillars (Spatial Feature Cards)
Using a horizontal scrolling GSAP container (or a 4-grid), we highlight the product pillars using floating `.glass-elevated` cards.
1.  **Unified Context:** "Your chat *is* your workspace. Native channels for every department."
2.  **Execution:** "Zero-latency text-to-task conversion. Move at the speed of thought."
3.  **Invisible Telemetry:** "Automated DORA and SPACE metrics without micromanagement."
4.  **Astra AI Agent:** "Instantly query cross-departmental storage. Never ask for a link again."

### Section 4: The "Flow Mode" Interactive Story & Demo
*   **The Storytelling Element (Deep Work):** Developers crave uninterrupted "Flow." We need to show how Astra protects this state.
*   **UX Concept:** A dark, immersive section. As the user scrolls into it, the rest of the page dims dramatically. A glowing Champagne Gold button pulses gently: "Simulate Flow Mode."
*   **The Animation (Noise Dissolve):** Clicking it triggers a complex **GSAP and Framer Motion** sequence. Dummy UI elements representing "Slack pings," "Jira email alerts," and "Calendar reminders" violently dissolve into particle dust along the Z-axis (using WebGL shaders). The ambient sound (if applicable) drops to absolute silence.
*   **The Result:** A single, brilliantly illuminated, perfectly focused task card remains in the absolute center of the screen, floating with a subtle, buttery **Lenis** scroll effect. The storytelling message fades in: "Protect your flow state. Silence the noise."

### Section 5: The Hybrid Pricing Tiers
*   **Design:** Three distinct glass columns.
    *   *Free Learner* (Standard glass)
    *   *Organization Pro* (Glowing edge glass, slightly elevated, highlighting the "Seat-based" model)
    *   *Enterprise* (Deep glass with a subtle gold/purple iridescent border)

### Section 6: Final CTA & Footer
*   A massive, glowing central "Deploy Astra" button centered over the void.
*   Clean, minimalist technical footer.

## 3. Engineering Implementation Strategy

*   **Framework:** Next.js 15 (App Router).
*   **Styling:** Tailwind CSS using our custom `globals.css` variables.
*   **Animation Engine:** `gsap` core alongside `ScrollTrigger` for the scroll-linked depth animations.
*   **Components:** We will build a reusable `<GlassCard />` and `<MagneticButton />` component in React to standardize the marketing UI.
