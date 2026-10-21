# Project Specification: "Nowhere Shack" — Abstract Cartoon 3D Portfolio

## 1. Project Overview & Philosophy
Build an interactive, abstract, comedic 3D namesake portfolio website inspired by late-90s animated classics (*Courage the Cowardly Dog*, *Oggy and the Cockroaches*). 

The application is an isometric/third-person cutaway of a crooked cartoon shack situated in a surreal desert expanse. Visitors interact with exaggerated props to inspect career milestones, test automation work (SDET/QA), game development projects, academic history, and contact details.

### Core Architectural Rules
* **Tech Stack:** Vite + React + Three.js (`@react-three/fiber`, `@react-three/drei`) + Tailwind CSS + Lucide Icons + GSAP (or `@react-spring/three`) + Zustand.
* **Fallback & Accessibility:** A persistent `"Switch to Clean View (Resume/List)"` button in the top-right corner that bypasses the 3D canvas entirely into an accessible, responsive single-page resume layout.
* **Responsive Control Scheme:** Both keyboard (WASD / Arrows) and mouse/touch tap-to-move / click-to-inspect support.

---

## 2. Visual Aesthetic & Shader Direction

1. **Cel Shading (Toon Look):**
   * Use `MeshToonMaterial` with custom gradient stepped maps (3 tones: shadow, midtone, highlight) or a custom shader pass.
2. **Inverted Hull Black Outlines:**
   * Create an outline effect around interactive objects using inverted mesh hull with backface rendering or an edge-detection post-processing pass (`EffectComposer` + custom Sobel/Normal edge shader).
3. **Squiggle-Vision / Hand-Drawn Frame Jitter (Optional / Micro-Pass):**
   * Target 12 FPS keyframe stepping on vertex noise to mimic traditional cel animation.
4. **Color Palette:**
   * Deep surreal dusk sky (mustard yellow fading into toxic magenta `#8b2671` and bruised plum `#220b38`).
   * Desaturated, weathered wooden planks with vibrant, oversaturated primary-colored props.

---

## 3. World Layout & Interactive Prop Mapping

The scene is an open-wall isometric cartoon shack. Each prop represents a portfolio category:

### Prop 1: Sarcastic CRT Computer (The Courage Homage)
* **Category:** QA / SDET & Automation Hub
* **Visual:** Bulbous green monochrome CRT monitor perched on a rickety three-legged wooden desk with wires looping erratically.
* **Interaction:** 
  * Hover: Screen displays a snarky blinking ASCII face `(¬_¬)`.
  * Click: Camera zooms in. Triggers a retro terminal overlay displaying:
    * Test automation frameworks (Playwright, Selenium, Appium, Cypress).
    * CI/CD pipelines, Test Strategy, and live test run mock simulations (Pass/Fail green-red logs).

### Prop 2: The Rattling Padlocked Trapdoor
* **Category:** Game Dev & Creative Projects (Unity, C#, Blender)
* **Visual:** Cellar trapdoor on the floor wrapped with heavy cartoon chains and a comically oversized lock that physically rattles and bulges periodically.
* **Interaction:**
  * Hover: Shakes violently with dust particles.
  * Click: Chains snap off cartoonishly; camera looks down into a glowing dimensional void modal displaying:
    * Interactive video/WebGL embeds of Unity builds.
    * 3D modeling snippets and GitHub source links.

### Prop 3: The Overstuffed Bulging Fridge
* **Category:** Skills, Tools & Tech Stack
* **Visual:** Vintage round-corner refrigerator shivering under pressure.
* **Interaction:**
  * Hover: Door nudges open, leaking cartoon light and condensation particles.
  * Click: Door swings open and a flood of cartoon food items, bottles, and gadgets tumble out, each representing a skill tag (Java, TypeScript, Python, Postman, Git, Docker, SQL).

### Prop 4: The Crooked Eyes Portrait Wall
* **Category:** Academics & Certifications
* **Visual:** Two wonky picture frames hung crookedly on the peeling wallpaper. The eyes inside the portraits subtly track the user's cursor.
* **Interaction:**
  * Click: Framed certificate expands into view displaying:
    * Master of Computer Applications (MCA) / Degree credentials.
    * Certifications (ISTQB CTFL, Cloud certifications, specialized courses).

### Prop 5: The Red "DO NOT PRESS" ACME Button / Rake
* **Category:** About Me & Resume Download
* **Visual:** A bright red mushroom button on a stand or a classic garden rake lying flat.
* **Interaction:**
  * Click: Triggers a rubbery cartoon squash animation (e.g., anvil drops or rake handle flips up), followed by opening an interactive "About the Engineer" polaroid modal with bio, contact links (LinkedIn, GitHub, Email), and a `"Download CV"` button.

---

## 4. Technical Architecture & File Structure

```
src/
├── components/
│   ├── 3d/
│   │   ├── Scene.jsx              # Main Canvas, lighting, and environment setup
│   │   ├── ShackEnvironment.jsx   # Walls, floorboards, windows, desert terrain
│   │   ├── PlayerCharacter.jsx    # Optional rubber-hose avatar or cursor controller
│   │   ├── props/
│   │   │   ├── CRTComputer.jsx    # Terminal / QA portfolio trigger
│   │   │   ├── Trapdoor.jsx       # Unity / Game dev trigger
│   │   │   ├── Fridge.jsx         # Tech stack dispenser
│   │   │   ├── Portraits.jsx      # Academics / Certs
│   │   │   └── AcmeButton.jsx     # Contact / Resume trigger
│   │   └── effects/
│   │       ├── ToonShaderMaterial.js
│   │       └── OutlinePass.jsx
│   ├── dom/
│   │   ├── NavigationHUD.jsx      # Sound toggle, reset view, resume switch
│   │   ├── modals/
│   │   │   ├── TerminalModal.jsx  # QA logs & test runs
│   │   │   ├── GameVaultModal.jsx # Unity showreels
│   │   │   ├── SkillsModal.jsx    # Interactive fridge item inspector
│   │   │   └── ResumeModal.jsx    # About me & contact details
│   │   └── FlatPortfolioView.jsx  # Accessible, recruiter-friendly 2D fallback page
├── store/
│   └── usePortfolioStore.js       # Zustand store for modal states, audio, active prop
├── hooks/
│   ├── useSoundEffects.js         # Sound triggers for cartoon SFX
│   └── useCameraControls.js       # Smooth lerp camera movement
├── assets/
│   ├── sfx/                       # Cartoony squishes, boings, clicks, static
│   └── models/                    # GLTF / GLB assets (procedural primitives as fallback)
├── App.jsx
└── main.jsx
```

---

## 5. State Management Blueprint (`usePortfolioStore.js`)

The app state should manage active modals, active camera focal targets, and user preferences:

```javascript
import { create } from 'zustand';

export const usePortfolioStore = create((set) => ({
  activeModal: null, // 'terminal' | 'vault' | 'skills' | 'resume' | null
  cameraFocus: 'default', // 'crt' | 'trapdoor' | 'fridge' | 'portraits' | 'default'
  isMuted: true,
  viewMode: '3d', // '3d' | 'flat'
  
  openModal: (modalName, targetFocus) => set({ 
    activeModal: modalName, 
    cameraFocus: targetFocus || 'default' 
  }),
  closeModal: () => set({ 
    activeModal: null, 
    cameraFocus: 'default' 
  }),
  toggleSound: () => set((state) => ({ isMuted: !state.isMuted })),
  setViewMode: (mode) => set({ viewMode: mode }),
}));
```

---

## 6. Implementation Milestones for Antigravity

When prompting the coding agent to start working, execute in this order:

### Phase 1: Core Scaffolding
- Initialize project with React, Tailwind CSS, `@react-three/fiber`, `@react-three/drei`, and `zustand`.
- Create placeholder `Scene.jsx` with an isometric camera (`OrthographicCamera` or perspective at 45° angle, low FOV).
- Implement top-right HUD with the `"Switch to 2D Clean View"` toggle and mute button.

### Phase 2: Procedural Cartoon Room (No External Models Required)
- Build the crooked room using Three.js primitive geometries (`BoxGeometry`, `CylinderGeometry`) with slight random rotations and skewed scale values to achieve the non-Euclidean look without relying on heavy external GLTF assets initially.
- Apply vibrant toon materials with warm rim lighting and purple desert fog (`scene.fog = new THREE.FogExp2('#220b38', 0.05)`).

### Phase 3: Interactive Props & Camera Dolly
- Wire raycasting / click events on props using Drei's `<mesh onClick={...}>`.
- Add camera lerping: when an item is clicked, smoothly transition the camera towards that prop before rendering the DOM overlay.
- Animate props on hover/click using `@react-spring/three` or GSAP (squash, stretch, and wiggle).

### Phase 4: Overlay Modals & Data Injection
- Populate `TerminalModal.jsx` with real test suites, frameworks, and architecture diagrams.
- Populate `GameVaultModal.jsx` with Unity/itch.io project links and playable embeds.
- Create `FlatPortfolioView.jsx` populated with all resume content, styled with clean, minimal cards.

### Phase 5: Audio & Cartoon Polish
- Add lightweight Web Audio synthesized pops/boings or load free retro sound effects for modal opens, button clicks, and camera swooshes.