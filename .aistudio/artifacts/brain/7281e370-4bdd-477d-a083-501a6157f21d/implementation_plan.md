# Omnitrix Alien Watch for Pixel Watch & Wearable Web

An authentic, tactile alien transformation watch application inspired by classic cartoons, tailored for Pixel Watch and wearable round touchscreens with responsive device framing, circular dial navigation, pop-up core mechanics, and cinematic transformation sequences.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following user preferences were confirmed during Phase 1:
> - **Alien Roster**: Classic Original 10 (Heatblast, Four Arms, XLR8, Diamondhead, Upgrade, Grey Matter, Ripjaws, Stinkfly, Ghostfreak, Wildmutt).
> - **Watch Frame**: Interactive Pixel Watch casing mockup with instant toggle to pure fullscreen round display.
> - **Activation Flow**: Pop-up dial core that rises on activation/selection and slams down to trigger the transformation sequence.

---

## 1. Overview & Core Concept

- **What It Does**: Replicates the iconic extraterrestrial wristwatch interface. Users can pop open the dial faceplate, swipe or rotate the circular dial to cycle through glowing green holographic alien silhouettes, prime the elevated core, and slam it down to trigger a full-screen, screen-shaking transformation sequence complete with synthesized cartoon sound effects and multi-step haptic pulses.
- **Target Audience**: Young fans, cartoon enthusiasts, and smartwatch owners looking for an intuitive, highly tactile toy-grade wearable experience.
- **Key Value**: Delightful tactile fidelity combining Web Audio procedural sound design, browser vibration API haptics, rotatable circular gestures, and smooth Framer Motion animations.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Standby Mode / Watch Face**:
   - The watch displays the classic black and green hourglass faceplate with a pulsing alien green core, or an ambient smartwatch clock showing real-time hours, minutes, and Omnitrix charge.
   - User taps the digital crown or the watch face to trigger the mechanical core pop-up.
2. **Alien Selection Mode (Core Popped Up)**:
   - The dial physically elevates with a hydraulic hiss and rising chime.
   - The circular bezel ring lights up. Users swipe across the screen, drag in a circular arc, or click the digital crown arrows to spin through the 10 classic alien silhouettes with mechanical ratchet click sounds and haptic pulses.
   - Alien info card reveals name, alien species, home planet, and elemental powers.
3. **Core Priming & Slam Down**:
   - Tapping the primed alien or pressing the center dial lifts the core into ready position.
   - Slapping or tapping the top of the core slams it down with an explosive capacitor release sound and deep haptic shockwave.
4. **Transformation Sequence**:
   - Screen flashes with radiant alien green rays and radial energy burst.
   - DNA helix animation and cellular matrix overlay pulse across the viewport.
   - The selected alien materializes in dynamic battle stance with sound effects and roar.
5. **Active Alien Battle Mode & Powers**:
   - Interactive alien view with 2 signature power moves per alien (e.g., Heatblast "Flamethrower" and "Meteor Burst"), with audio-visual blast effects.
   - Timed countdown gauge (or Master Control infinite mode).
   - When time expires, watch blinks red with warning beeps and enters recharge cooldown mode.

### Visual Identity & Theme
- **Dominant Palette**:
  - Deep space black (`#0a0f0d`, `#050807`)
  - Glowing alien neon green (`#00FF66`, `#39FF14`, `#10B981`)
  - Translucent holographic jade (`rgba(0, 255, 102, 0.15)`)
  - Warning/timeout crimson (`#FF1E27`, `#EF4444`)
  - Pixel Watch hardware matte carbon finish (`#18191B`, `#26292B`)
- **Typography**:
  - Display: `Plus Jakarta Sans` / `Outfit` with high-tech uppercase tracking for extraterrestrial codenames.
  - Telemetry: Monospace tabular numerals (`font-mono tabular-nums`) for energy levels and transformation timers.
- **Tactile Ergonomics**:
  - Touch targets $\ge 48\text{px}$ for young fingers.
  - Large central slam zone for intuitive physical slap interaction.

---

## 3. Key Product Decisions & Trade-Offs

- **Procedural Web Audio Engine vs External MP3 Files**:
  - *Decision*: Build a dedicated zero-dependency procedural Web Audio synthesizer that generates the exact mechanical clicks, hydraulic pops, charging hums, slam blasts, and red timeout alarms in real time.
  - *Why*: Immune to CORS blocks, 404 broken audio links, or network latency; produces zero-lag instantaneous feedback on every touch.
- **Dual Display Modes (Pixel Watch Mockup + True Smartwatch Display)**:
  - *Decision*: Provide an interactive Google Pixel Watch 3 casing (with rotating crown, curved bezel, and silicone band) alongside a clean "Fullscreen Dial" toggle that fits round watch displays (e.g. WearOS browser view).
  - *Why*: Perfect showcase on desktop/tablets while completely usable as a real watch app.
- **High-Definition Vector Alien Hologram Icons & Canvas FX**:
  - *Decision*: Hand-crafted SVG silhouettes for all 10 classic aliens with glowing Gaussian blur filters and particle bursts.
  - *Why*: Crisp rendering at any scale, instantaneous rotation during bezel spin, and zero image loading delay.

---

## 4. Technical Architecture & Component Structure

```
┌─────────────────────────────────────────────────────────────┐
│                       App Container                         │
│  • Sound Engine (Web Audio Synth) & Vibration Haptic Hook   │
│  • Watch State (Standby, Popped, Transforming, Active, Cooldown) │
│  • Display Mode (Pixel Watch Case vs Fullscreen Dial)       │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               ▼                              ▼
┌──────────────────────────────┐ ┌──────────────────────────────┐
│     Pixel Watch Casing       │ │    Watch Face / Core Dial    │
│ • Matte chassis & lugs       │ │ • Hourglass Faceplate        │
│ • Interactive Digital Crown  │ │ • Pop-up Core Actuator       │
│ • Bezel touch touch-strip    │ │ • Circular Alien Carousel    │
│ • Real-time ambient clock    │ │ • Holographic Silhouettes    │
└──────────────────────────────┘ └──────────────┬───────────────┘
                                                │
                                                ▼
                                 ┌──────────────────────────────┐
                                 │   Transformation Engine      │
                                 │ • Screen-flash blast         │
                                 │ • DNA Helix particle canvas  │
                                 │ • Alien Reveal & Battle FX   │
                                 │ • Interactive Power Buttons  │
                                 │ • Timeout / Recharge cycle   │
                                 └──────────────────────────────┘
```

### State Model & Transitions
- `watchState`: `'standby'` | `'popped'` | `'transforming'` | `'active'` | `'recharging'`
- `selectedAlienIndex`: `0..9` (cycling through Heatblast, Four Arms, XLR8, Diamondhead, Upgrade, Grey Matter, Ripjaws, Stinkfly, Ghostfreak, Wildmutt)
- `masterControl`: `boolean` (toggle for infinite playtime without recharge timeout)
- `soundEnabled`: `boolean` (audio toggle)
- `hapticsEnabled`: `boolean` (navigator.vibrate toggle)
- `viewMode`: `'pixel-watch'` | `'fullscreen-dial'`

---

## Verification Plan

1. Verify build compilation using `compile_applet`.
2. Test circular dial drag navigation, wheel spinning, and next/prev alien selection.
3. Test pop-up mechanical lift and center slam trigger.
4. Verify Web Audio synthesized sound playback on user interaction.
5. Verify haptic feedback (`navigator.vibrate`) timing.
6. Verify transformation sequence screen transitions, particle animations, and battle powers.
