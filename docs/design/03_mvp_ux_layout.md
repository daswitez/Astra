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
    *   **The Home Hub (Default Entry):** When users first log in, they land here. It acts as a dashboard or launchpad. Instead of dropping the user into a chaotic chat, it presents an aesthetic grid (Glass Cards) of their most used Ecosystem Tools: *My Kanban, Engineering Chat, Architecture Flowchart, Brainstorming Whiteboard*.
    *   **If `#Chat` channel is active:** The canvas functions like a modern forum/Slack. Messages are *Active Cards (Z: 2)* resting on the Base Glass. Chat is essential for communication, but it is *not* the sole focus of the Astra ecosystem.
    *   **If `#Storage` or `#Tools` are active:** The canvas hosts dedicated applications (e.g., a Kanban board for task assignment, a document editor, or a custom internal tool). 
    *   **Zero-Friction Morphing:** Transitioning between the Home Hub, specific tools, and chat does not require a page reload. Using GSAP, the current view cross-fades and the new tool elegantly slides into place.

### Zone C: The AI Omni-Bar (Z: 3 - The Omni-Layer)
*   **Location:** Floating exactly in the dead center of the screen, completely separate from the sidebar.
*   **Purpose:** The ultimate shortcut for execution and cross-departmental AI querying.
*   **UX Design:**
    *   **Invocation:** The user presses `Cmd + K`. The main Execution Canvas (Zone B) instantly dims and blurs slightly (`backdrop-filter` transition).
    *   **The Modal:** A brilliantly lit, highly blurred glass search bar drops in using spring physics.
    *   **Querying:** Typing "What is the marketing plan for Q3?" causes the AI to search the Marketing `#Storage` channel. The Omni-Bar elegantly expands vertically, revealing an AI-generated summary card right beneath the search input.

## 2. The Core Workflow: Ecosystem & Focus

The core value proposition of Astra is not zero-latency chat, but the seamless integration of a **Tool Ecosystem** coupled with intense **Focus Management**.

**The Standard Workflow:**
1. **Entry (The Home Hub):** The user logs in and is greeted by their personalized dashboard. They see an overview of their active ecosystem (e.g., "3 Tasks in Progress", "2 Unread mentions in #Engineering", "Recent flowchart: Q3 Arch").
2. **Assignment (The Kanban):** Department heads manage workflows in a dedicated Kanban/Board view accessed via the Hub or Sidebar. Tasks are created, enriched with context, and assigned here.
3. **Execution & Tools:** A user might open a **Flowchart Tool** or a **Brainstorming Canvas** within Zone B to plan their work, seamlessly referring back to the Kanban.
4. **Communication (The Chat):** Team members use `#Chat` to discuss blockers or share updates on those tasks, but the chat serves the work, not the other way around.
5. **Deep Work (Flow Mode):** When a user is ready to execute a complex task, they select it from their Kanban and enter **Flow Mode** to leverage the Pomodoro engine.

## 3. The Flow Mode UX Transition (Pomodoro & Social Focus)

Flow Mode is Astra's signature feature. Transitioning into Flow Mode must feel like stepping into a highly aesthetic, soundproof room designed for deep work. It fundamentally shifts the UI from an "ecosystem" view to a "focused execution" view.

**The User Journey:**
1. **Task Selection:** The user selects a specific task from their Kanban or Active Context pool that they want to dedicate focus to.
2. **The "Lockdown" Animation:**
    *   The user clicks "Enter Flow".
    *   The Global Nav and active ecosystem tools (Zone A and standard Zone B) slide off-screen or fade aggressively into the background.
    *   The ambient background ("The Void") deepens, minimizing visual noise.
    *   All system notifications are silenced.
3. **The Focus Canvas (The Pomodoro Engine):** 
    *   The selected task expands into a beautiful, softly glowing glass card in the dead center of the screen.
    *   An elegant, integrated **Pomodoro timer** appears, encouraging time-boxed deep work intervals (e.g., 25 minutes of focus, 5 minutes of rest).
    *   Aesthetic focus tools might include ambient lo-fi sound toggles or minimal visual metronomes.
4. **Social Visibility:** 
    *   While in Flow Mode, the user's status across the organization updates automatically.
    *   In the team directory or chat sidebars of *other* users, a distinct visual indicator (e.g., an animated glowing ring or a "Flow" icon) appears next to the user's name, signaling that they are immersed in deep work on a specific task and should not be disturbed. 
5. **The Interception Log:** If someone pings the user in `#Chat` during Flow Mode, a tiny, unobtrusive counter (`+1`) appears in the top corner. The message is completely hidden until the Pomodoro cycle ends or the user exits Flow Mode.

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
