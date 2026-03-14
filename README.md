# Creepy Windows 95 Popup Overlay

A lightweight browser source overlay for Streamlabs that occasionally flashes fake Windows 95-style error popups for half a second.

## Usage in Streamlabs

1. Add a **Browser Source**.
2. Point it to this overlay (`index.html`) via local file path (for example: `file:///.../windowsoldpopups/index.html`) or host the files and use a URL.
3. Set the Browser Source size to your stream resolution.
4. Keep background transparency enabled.

## Behavior

- Generates text-based creepy Win95-style error windows (no image assets required).
- Includes expanded random message pools for titles and creepy warnings.
- Frequently spawns visual glitch variants (more common than regular error dialogs) with jitter, scanlines, and artifact bars.
- Popups appear in random positions.
- Each popup auto-closes after ~0.5 seconds.
- Popups show up at random intervals for a subtle jump-scare effect.
