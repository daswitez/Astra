# Astra MVP UX & Structural Layout

**Goal:** Apply the "Spatial Design System" to the Astra Minimum Viable Product (MVP). The challenge of the MVP is displaying tasks, native departmental chats, and unstructured documents without creating cognitive overload (the "ClickUp Problem").

## 1. The UX Layout Architecture

The MVP interface is divided horizontally into three main Z-axis zones.

### Zone A: The Global Nav (Z: 1 - Base Glass)
*   **Location:** Slim, fixed panel on the far left.
*   **Purpose:** Rapid, keyboard-first context switching.
*   **UX Design:**
    *   **The Switcher:** A vertical stack of ultra-minimal icons representing: `Home`, `Organization`, `My Department`, `Flow Mode`.
    *   **The Channel Tree:** Expanding the `My Department` tab gently pushes the main canvas right, revealing the Native Channels: `#General`, `#Chat`, `#Information`, `#Storage`, `#Notifications`.
    *   **Material:** `rgba(255,255,255,0.02)` with `blur(24px)`. It feels like frosted glass floating over "The Void."

### Zone B: The Execution Canvas (Z: 0 to Z: 2)
*   **Location:** The expansive center-right area.
*   **Purpose:** Where the actual work happens. The content dynamically changes based on the context selected in Zone A.
*   **UX Design (Context Dependent):**
    *   **If `#Chat` channel is active:** The canvas functions like Slack. Messages are grouped by day. However, each message isn't a flat bubble; it's an *Active Card (Z: 2)* resting on the Base Glass. Hovering over a message allows the user to instantly click "Convert to Task."
    *   **If `#Storage` (Docs/Tasks) is active:** The canvas shifts to a Kanban or List view.
    *   **Zero-Friction Morphing:** When transitioning from a Chat view to a Task view, the UI does not refresh. Using GSAP, the chat messages cross-fade, and the task columns gracefully slide in from the right.

### Zone C: The AI Omni-Bar (Z: 3 - The Omni-Layer)
*   **Location:** Floating exactly in the dead center of the screen, completely separate from the sidebar.
*   **Purpose:** The ultimate shortcut for execution and cross-departmental AI querying.
*   **UX Design:**
    *   **Invocation:** The user presses `Cmd + K`. The main Execution Canvas (Zone B) instantly dims and blurs slightly (`backdrop-filter` transition).
    *   **The Modal:** A brilliantly lit, highly blurred glass search bar drops in using spring physics.
    *   **Querying:** Typing "What is the marketing plan for Q3?" causes the AI to search the Marketing `#Storage` channel. The Omni-Bar elegantly expands vertically, revealing an AI-generated summary card right beneath the search input.

## 2. Solving the Text-to-Task UX Problem

One of the MVP's core promises is zero-latency conversion between conversation/docs and execution.

**The User Journey:**
1. A user is in the Engineering `#Chat`. Someone types: *"We need to fix the caching bug on the login screen by Thursday."*
2. The user hovers over the message tile. The "Spotlight Effect" highlights the message's border.
3. A subtle contextual glass menu appears on the right edge of the message. The user clicks the **`+ Task`** icon (or presses `T`).
4. **The GSAP Magic:** The chat message physically *detaches* from the chat flow. It elevates on the Z-axis, shrinking slightly into a "Task Card" format. A quick inline modal asks for Assignee/Date.
5. Upon hitting `Enter`, the card "flies" off-screen to the right (into the `#Storage`/Kanban system), leaving behind a small, inline hyperlinked badge in the chat: `[Task Created: Fix Caching Bug]`.

## 3. The Flow Mode UX Transition

Flow Mode is Astra's signature feature. Transitioning into Flow Mode must feel like stepping into a soundproof room.

**The User Journey:**
1. User clicks the "Enter Flow" button in the Global Nav.
2. **The "Lockdown" Animation:**
    *   The Global Nav (Zone A) slides off-screen to the left.
    *   The ambient background ("The Void") deepens, perhaps turning entirely black.
    *   All system notification badges organically dissolve.
3. **The Focus Canvas:** The Execution Canvas expands to fill the screen constraint. Only the specific task or document the user selected prior to entering Flow Mode is visible. It is presented on a softly glowing glass card in the dead center.
4. **The Interception Log:** If someone pings the user in `#Chat` during Flow Mode, a tiny, unobtrusive counter (`+1`) appears in the top right corner, completely silent, waiting for the Flow session to end before revealing the message context.

## 4. MVP Aesthetic Principles (Elegant UI)

To ensure the MVP feels highly premium and strictly adheres to our high-end UX requirements, development must follow these rules:

1. **Curated Color Palettes**
   - **Primary Palette:** Deep, rich tones (e.g., Midnight Blue, Charcoal, Obsidian) for backgrounds to create depth ("The Void").
   - **Accent Colors:** Use subtle, vibrant gradients (e.g., deep purple to electric blue, or warm gold hues) sparingly for interactive elements or active states. Avoid raw web colors (e.g., `#00FF00`, `#FF0000`).

2. **Refined Typography**
   - Use high-quality sans-serif fonts natively embedded (e.g., Inter defaults).
   - Ensure a rigorous typographic hierarchy: tight tracking for large headings; softer, slightly loose tracking for body text.
   - Extensively use `color: var(--color-text-muted)` (soft grays, semi-transparent whites) to establish clear visual hierarchy, keeping pure white reserved for selected/active items.

3. **Glassmorphism & Depth (Z-Axis UI)**
   - Panels and sidebars should leverage `backdrop-filter: blur(24px)` with ultra-low opacity solid colors (`rgba(255,255,255,0.02)`).
   - Add a subtle 1px border (`rgba(255,255,255,0.05)`) to glass components to give them a physical rim.
   - Use soft, widespread drop shadows (`box-shadow: 0 20px 60px rgba(0,0,0,0.5)`) to effectively simulate layers floating above each other.

4. **Micro-Animations & Dynamic States**
   - **Hover States:** Interactive UI components must boast smooth hover transitions (`transition-all duration-300`, `hover:scale-[1.02]`) and subtle glow effects.
   - **Entrance:** Base components shouldn't snap into existence. They should organically fade or drift in via framer-motion/GSAP (`y: 20`, `opacity: 0` -> `y: 0`).
   - The UI must feel responsive to the cursor without being noisy or jarring.

5. **Expansive Negative Space**
   - Given the "Spatial OS" nature, give major components adequate breathing room (`padding: 2rem` or `3rem`). Do not crowd the UI. Less density conveys confidence and premium feel.
