# Astra Spatial Design System (VisionOS Adaptation)

**Goal:** Translate the paradigm-shifting 3D spatial computing aesthetic of Apple VisionOS into a premium, strictly 2D web environment for Astra. The interface must use depth, light, and translucency—rather than flat lines and solid borders—to establish hierarchy and context.

## 1. The Core Philosophy: Depth as Hierarchy
Flat design (Material, traditional minimalist UI) uses color blocks and 1px borders to separate areas. Astra's "Spatial System" uses **Z-axis Elevation (Depth)**. 

Users should intrinsically understand what is important based on what is "closest" to them.

### The Z-Axis Layers
1.  **The Void (Background / Z: 0):** A deep, rich, uninterrupted canvas. Not pure black `#000000`, but a profound ambient dark `#09090B` or a subtly shifting, impossibly slow dark gradient. This represents the infinite space of the organization.
2.  **The Base Glass (Context / Z: 1):** The lowest level of UI, such as the global sidebar (channels) and the main content backdrop. These are highly translucent panels (`rgba(255,255,255, 0.02)`) with a strong backdrop blur (`blur(24px)`). They let "The Void" bleed through softly.
3.  **The Active Cards (Work / Z: 2):** Tasks, Chat messages, and active documents. These sit on top of the Base Glass. They are slightly more opaque (`rgba(255,255,255, 0.05)`) and cast very soft, diffuse drop shadows to physically separate them from the layer below.
4.  **The Omni-Layer (Focus & AI / Z: 3):** Popovers, the `Cmd + K` AI Omni-Bar, Flow Mode modals, and context menus. These are the highest elevation. They feature the brightest glass (`rgba(255,255,255, 0.08)`), the strongest blur (`blur(40px)`), and a subtle inner light (inner shadow/border) that makes them look like floating polished glass lenses.

## 2. Lighting over Coloring
Instead of coloring buttons bright blue or green to indicate a primary action, Astra uses "light."

*   **Vibrancy and Inner Glow:** A primary button isn't a solid blue rectangle. It's a translucent glass pill that has an *inner glow* (using inset shadows: `box-shadow: inset 0 1px 0 rgba(255,255,255,0.2)`). 
*   **Edge Lighting:** When a user hovers over a task or a departmental channel, the edge facing the "imaginary light source" (usually top-left) catches the light slightly, increasing the opacity of its top border.
*   **Text Rendering:** Text on glass must always be perfectly legible. We use CSS `text-shadow` subtly to ensure text pops off the blurred background, maintaining WCAG contrast ratios even with dynamic backgrounds.

## 3. Dynamic Materials (GSAP Integration)
Glass in real life is reactive. The UI must respond biologically to the user.

*   **The Spotlight Effect (Mouse Tracking):** Using simple JS and CSS variables, a very faint, soft radial gradient "spotlight" follows the user's cursor across the Base Glass and Active Cards. It subtly illumnates the borders and backgrounds of the elements it passes over, giving the UI a tactile, physical presence.
*   **Fluid scaling:** Nothing instantaneously toggles size. If a task card expands to show subtasks, the glass panel smoothly morphs (using GSAP `Flip` or layout animations) rather than snapping.
*   **Spring Physics:** Menus and modals don't just "fade in." They use spring physics to scale from `0.95` to `1.0` and fade from `0` to `1`, mimicking a physical object being handed to the user.

## 4. Adapting VisionOS to Departmental Channels
How does this look for Astra's specific architecture?

*   **The Lateral Hub (Left Sidebar):** This is a vertical pane of Base Glass. The channel names (General, Marketing, Engineering, Chat, Storage) are text objects. When selected, a soft, bright "pill" of light slides vertically to sit behind the active channel text (magnetic selection).
*   **The Main Content Area:** When in **Chat**, messages aren't flat bubbles. They are distinct, slightly curved glass tiles resting on the base. When in **Storage**, documents look like pristine, softly lit sheets of digital vellum hovering slightly above the background.
*   **Flow Mode Shift:** When "Flow Mode" is activated, the Void (Background) slowly transitions. The ambient lighting dims, the sidebars recede (pushing back in the Z-axis, reducing opacity), and the main task is brought forward, bathed in a soft, focused spotlight. Total immersion.

## 5. CSS/Design Token Foundation (Preview)
To execute this, our CSS variables will be strictly structured around these spatial properties:

```css
:root {
  /* The Void */
  --color-void: #09090B;
  
  /* Glass Materials */
  --glass-base: rgba(255, 255, 255, 0.02);
  --glass-elevated: rgba(255, 255, 255, 0.05);
  --glass-omni: rgba(255, 255, 255, 0.08);

  /* Optical Blurs */
  --blur-base: blur(24px);
  --blur-omni: blur(40px);

  /* Lighting & Edges */
  --edge-light: inset 0 1px 1px rgba(255, 255, 255, 0.15);
  --edge-glow: inset 0 0 10px rgba(255, 255, 255, 0.05);
  
  /* Shadows (Depth) */
  --shadow-z1: 0 4px 24px rgba(0, 0, 0, 0.4);
  --shadow-z3: 0 12px 48px rgba(0, 0, 0, 0.6);
}
```

This ensures extreme scalability and absolute consistency when handing off to front-end engineering. Every component is simply a combination of a Material (Glass), an Optical property (Blur), and Depth (Shadow/Lighting).
