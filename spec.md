# Specification

## Summary
**Goal:** Deliver an MVP drone design website with a landing page and a 3D design workspace where authenticated users can create, preview, and persist drone configurations.

**Planned changes:**
- Build a responsive app with two routes/pages: landing page and drone design workspace, with clear navigation on desktop and mobile.
- Add Internet Identity sign-in/out and signed-in status in the UI; disable saving/loading when signed out with a helpful message.
- Implement a drone design editor to configure components (frame size/type, motor, propeller, battery, flight controller, camera/optional payload) and key parameters (e.g., quantity, KV, prop size, battery cell count) with immediate UI updates.
- Render a live 3D preview (3D game) in the workspace using Three.js / React Three Fiber with orbit controls; reflect component changes at least for frame size/type and prop size.
- Compute and display a design summary (estimated all-up weight, total thrust, thrust-to-weight ratio, flight time range) with visible assumptions, updating as inputs change.
- Implement backend persistence per authenticated user: create, list, load, update, delete designs with id, name, configuration payload, createdAt, updatedAt, and access control by principal.
- Add a “My Designs” panel using React Query to save named designs, list with last updated time, load into the editor, rename, delete, and show loading/error states.
- Apply a consistent visual theme across landing and workspace (non-blue/purple primary palette).
- Add generated static brand/hero imagery referenced from `frontend/public/assets/generated`, including a landing hero image and a logo mark in the app header/shell.

**User-visible outcome:** Users can navigate from a landing page into a drone design workspace, configure a drone via an editor with a live 3D preview and calculated summary, sign in with Internet Identity, and save/load/manage their designs in “My Designs.”
