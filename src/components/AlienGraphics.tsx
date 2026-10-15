import React from 'react';

interface GraphicProps {
  alienId: string;
  className?: string;
  glow?: boolean;
}

/**
 * High-Likeness Holographic Alien Silhouette for the Circular Omnitrix Dial
 * Faithfully matches the iconic 2005 cartoon silhouettes
 */
export const AlienSilhouetteIcon: React.FC<GraphicProps> = ({ alienId, className = 'w-24 h-24', glow = true }) => {
  const glowFilter = glow ? 'drop-shadow(0 0 10px rgba(57, 255, 20, 0.95))' : 'none';

  switch (alienId) {
    case 'heatblast':
      return (
        <svg viewBox="0 0 100 100" className={className} style={{ filter: glowFilter }} fill="currentColor">
          {/* Flame spikes on head */}
          <path d="M50 4 C46 12, 42 16, 45 22 C41 20, 36 24, 38 30 C34 28, 30 33, 34 38 C42 42, 58 42, 66 38 C70 33, 66 28, 62 30 C64 24, 59 20, 55 22 C58 16, 54 12, 50 4 Z" />
          {/* Collar basalt rock plates */}
          <path d="M28 36 L72 36 L66 48 L34 48 Z" />
          {/* Muscular magma shoulders & flame hands */}
          <path d="M28 38 L14 48 L8 62 L18 64 L24 54 L32 46 Z" />
          <path d="M72 38 L86 48 L92 62 L82 64 L76 54 L68 46 Z" />
          {/* Fire bursts at knuckles */}
          <circle cx="8" cy="64" r="5" />
          <circle cx="92" cy="64" r="5" />
          {/* Angular torso */}
          <path d="M34 48 L66 48 L60 70 L40 70 Z" />
          {/* Legs with heavy volcanic rock feet */}
          <path d="M40 70 L34 94 L45 94 L48 76 L52 76 L55 94 L66 94 L60 70 Z" />
        </svg>
      );

    case 'fourarms':
      return (
        <svg viewBox="0 0 100 100" className={className} style={{ filter: glowFilter }} fill="currentColor">
          {/* Head with crest */}
          <ellipse cx="50" cy="16" rx="9" ry="11" />
          {/* 4 Muscular Arms: Upper 2 raised, lower 2 flexed */}
          <path d="M42 24 C32 16, 18 16, 12 26 C8 34, 14 42, 22 40 C26 38, 32 34, 38 32 Z" />
          <path d="M58 24 C68 16, 82 16, 88 26 C92 34, 86 42, 78 40 C74 38, 68 34, 62 32 Z" />
          <path d="M38 36 C26 40, 12 48, 10 58 C8 66, 20 68, 24 60 C28 54, 34 46, 40 42 Z" />
          <path d="M62 36 C74 40, 88 48, 90 58 C92 66, 80 68, 76 60 C72 54, 66 46, 60 42 Z" />
          {/* Broad Torso */}
          <path d="M34 26 L66 26 L62 66 L38 66 Z" />
          {/* Heavy legs */}
          <path d="M38 66 L30 94 L44 94 L48 72 L52 72 L56 94 L70 94 L62 66 Z" />
        </svg>
      );

    case 'xlr8':
      return (
        <svg viewBox="0 0 100 100" className={className} style={{ filter: glowFilter }} fill="currentColor">
          {/* Pointed cone helmet visor */}
          <path d="M50 8 C58 8, 74 18, 78 26 C76 34, 60 36, 50 36 C38 36, 36 28, 40 20 C42 12, 46 8, 50 8 Z" />
          <polygon points="76,24 86,28 74,32" />
          {/* Streamlined runner torso */}
          <path d="M44 34 L56 34 L52 56 L42 54 Z" />
          {/* Scissor claw arms */}
          <path d="M42 36 L24 44 L16 54 L24 52 L36 44 Z" />
          <path d="M58 36 L76 42 L88 38 L72 48 L56 46 Z" />
          {/* Tail */}
          <path d="M42 54 C28 58, 12 62, 6 74 C16 72, 28 66, 44 62 Z" />
          {/* Legs with rolling wheel spheres */}
          <path d="M44 56 L38 82 L46 82 L49 64 L53 64 L56 82 L64 82 L53 56 Z" />
          <circle cx="42" cy="88" r="5" />
          <circle cx="60" cy="88" r="5" />
        </svg>
      );

    case 'diamondhead':
      return (
        <svg viewBox="0 0 100 100" className={className} style={{ filter: glowFilter }} fill="currentColor">
          {/* Back Crystal Spikes jutting upward */}
          <polygon points="50,4 58,22 42,22" />
          <polygon points="32,14 46,24 38,30" />
          <polygon points="68,14 62,30 54,24" />
          {/* Faceted Head with crest */}
          <ellipse cx="50" cy="24" rx="8" ry="9" />
          {/* Crystal shoulder spikes */}
          <polygon points="30,26 14,30 26,44 36,34" />
          <polygon points="70,26 86,30 74,44 64,34" />
          {/* Blade forearms */}
          <polygon points="26,42 10,58 18,68 28,52" />
          <polygon points="74,42 90,58 82,68 72,52" />
          {/* Angular torso */}
          <polygon points="34,34 66,34 60 68 40 68" />
          {/* Segmented legs */}
          <polygon points="40,68 32,94 44,94 48,74 52,74 56,94 68,94 60,68" />
        </svg>
      );

    case 'upgrade':
      return (
        <svg viewBox="0 0 100 100" className={className} style={{ filter: glowFilter }} fill="currentColor">
          {/* Smooth curved head with central optic ring */}
          <path d="M38 16 C38 8, 62 8, 62 16 C64 26, 62 32, 50 32 C38 32, 36 26, 38 16 Z" />
          <circle cx="50" cy="18" r="5" fill="#000" />
          <circle cx="50" cy="18" r="2.5" fill="currentColor" />
          {/* Biomechanical torso */}
          <path d="M36 32 C30 34, 26 44, 24 56 C28 58, 32 50, 36 46 L36 68 L64 68 L64 46 C68 50, 72 58, 76 56 C74 44, 70 34, 64 32 Z" />
          {/* Fluid circuit arms */}
          <path d="M24 38 L12 52 L14 66 L22 62 L20 52 L30 42 Z" />
          <path d="M76 38 L88 52 L86 66 L78 62 L80 52 L70 42 Z" />
          {/* Legs */}
          <path d="M38 68 L34 94 L44 94 L48 74 L52 74 L56 94 L66 94 L62 68 Z" />
        </svg>
      );

    case 'greymatter':
      return (
        <svg viewBox="0 0 100 100" className={className} style={{ filter: glowFilter }} fill="currentColor">
          {/* Massive cranium head with huge frog eyes */}
          <path d="M30 24 C26 12, 74 12, 70 24 C76 34, 70 44, 50 44 C30 44, 24 34, 30 24 Z" />
          <circle cx="34" cy="24" r="8" />
          <circle cx="66" cy="24" r="8" />
          {/* Tiny torso */}
          <path d="M42 44 L58 44 L54 64 L46 64 Z" />
          {/* Skinny arms */}
          <path d="M42 46 L26 52 L20 66 L25 68 L32 58 L42 54 Z" />
          <path d="M58 46 L74 52 L80 66 L75 68 L68 58 L58 54 Z" />
          {/* Folded frog legs */}
          <path d="M44 64 L34 78 L28 92 L38 92 L42 80 L50 72 L58 80 L62 92 L72 92 L66 78 L56 64 Z" />
        </svg>
      );

    case 'ripjaws':
      return (
        <svg viewBox="0 0 100 100" className={className} style={{ filter: glowFilter }} fill="currentColor">
          {/* Angler lure stalk & bulb */}
          <path d="M50 14 C48 4, 56 2, 58 6" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <circle cx="58" cy="6" r="3.5" />
          {/* Gaping jaw & scaly head */}
          <path d="M38 16 C38 10, 62 10, 62 16 C66 22, 68 30, 50 34 C32 30, 34 22, 38 16 Z" />
          <path d="M32 26 L68 26 L62 42 L38 42 Z" />
          {/* Dorsal fin & Torso */}
          <path d="M36 38 L64 38 L58 66 L42 66 Z" />
          <polygon points="64,42 76,46 62,52" />
          {/* Webbed claw arms */}
          <path d="M34 40 L20 50 L14 64 L24 60 L30 50 Z" />
          <path d="M66 40 L80 50 L86 64 L76 60 L70 50 Z" />
          {/* Swimming tailfin legs */}
          <path d="M42 66 L34 90 L40 96 L48 76 L52 76 L60 96 L66 90 L58 66 Z" />
        </svg>
      );

    case 'stinkfly':
      return (
        <svg viewBox="0 0 100 100" className={className} style={{ filter: glowFilter }} fill="currentColor">
          {/* 4 Stalk Eyes */}
          <circle cx="40" cy="10" r="3" />
          <circle cx="60" cy="10" r="3" />
          <circle cx="34" cy="16" r="3" />
          <circle cx="66" cy="16" r="3" />
          {/* Insectoid Head */}
          <ellipse cx="50" cy="20" rx="7" ry="8" />
          {/* 4 Wings Spread */}
          <ellipse cx="24" cy="26" rx="20" ry="7" transform="rotate(-20 24 26)" opacity="0.85" />
          <ellipse cx="76" cy="26" rx="20" ry="7" transform="rotate(20 76 26)" opacity="0.85" />
          <ellipse cx="20" cy="40" rx="18" ry="6" transform="rotate(-35 20 40)" opacity="0.75" />
          <ellipse cx="80" cy="40" rx="18" ry="6" transform="rotate(35 80 40)" opacity="0.75" />
          {/* Thorax */}
          <path d="M44 26 L56 26 L52 56 L48 56 Z" />
          {/* Curved Stinger Tail */}
          <path d="M48 56 C46 68, 54 82, 50 94 L46 88 C49 80, 44 70, 46 56 Z" />
          <polygon points="50,94 54,88 46,88" />
          {/* Legs */}
          <path d="M44 36 L28 54 L30 70 L34 66 L34 54 Z" />
          <path d="M56 36 L72 54 L70 70 L66 66 L66 54 Z" />
        </svg>
      );

    case 'ghostfreak':
      return (
        <svg viewBox="0 0 100 100" className={className} style={{ filter: glowFilter }} fill="currentColor">
          {/* Hooded ghost head with single track eye curve */}
          <path d="M50 10 C34 10, 32 22, 36 32 C40 40, 42 46, 50 46 C58 46, 60 40, 64 32 C68 22, 66 10, 50 10 Z" />
          <ellipse cx="48" cy="22" rx="3.5" ry="5.5" transform="rotate(-20 48 22)" fill="#000" />
          <circle cx="48" cy="22" r="2" fill="currentColor" />
          {/* Wispy floating spectral torso */}
          <path d="M36 36 C30 42, 26 50, 24 62 C28 60, 32 56, 36 50 L40 64 C38 74, 30 82, 34 94 C44 88, 46 76, 50 70 C54 78, 60 86, 66 92 C66 82, 58 74, 56 64 L60 50 C64 56, 68 60, 72 62 C70 50, 66 42, 60 36 Z" />
          {/* Clawed wispy hands */}
          <path d="M28 44 L12 54 L10 62 L16 60 L22 52 Z" />
          <path d="M72 44 L88 54 L90 62 L84 60 L78 52 Z" />
        </svg>
      );

    case 'wildmutt':
      return (
        <svg viewBox="0 0 100 100" className={className} style={{ filter: glowFilter }} fill="currentColor">
          {/* Eyeless beast muzzle & jaw */}
          <path d="M60 24 C70 26, 82 30, 86 36 C82 42, 70 44, 58 40 C54 36, 56 28, 60 24 Z" />
          {/* Gill slats on neck */}
          <path d="M54 30 L50 36 M50 28 L46 34 M46 26 L42 32" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
          {/* Muscular shoulders with back quills */}
          <path d="M60 34 C50 28, 36 32, 26 38 C18 44, 16 54, 20 64 L26 62 C24 54, 28 46, 36 42 L44 46 Z" />
          {/* Front heavy paws */}
          <path d="M64 40 L68 76 L78 76 L74 52 L62 44 Z" />
          <path d="M48 42 L44 76 L54 76 L56 54 Z" />
          {/* Back crouched legs */}
          <path d="M26 60 L18 84 L28 84 L34 68 L30 56 Z" />
        </svg>
      );

    default:
      return null;
  }
};

/**
 * Detailed Full-Color Cartoon Character Visual for Transformation & Battle Screen
 * Crafted with authentic cartoon likeness (colors, uniforms, anatomy, and Omnitrix badges)
 */
export const AlienCharacterArt: React.FC<GraphicProps> = ({ alienId, className = 'w-56 h-56' }) => {
  switch (alienId) {
    case 'heatblast':
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          {/* Fiery radial aura */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-orange-600/50 via-yellow-500/40 to-transparent blur-2xl animate-pulse" />
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(249,115,22,0.95)]">
            {/* Blazing Crown Fire Spikes */}
            <path
              d="M100 10 C82 30, 70 38, 76 54 C66 48, 54 58, 65 72 C52 68, 45 82, 60 92 C78 114, 122 114, 140 92 C155 82, 148 68, 135 72 C146 58, 134 48, 124 54 C130 38, 118 30, 100 10 Z"
              fill="#FDE047"
            />
            <path
              d="M100 22 C88 36, 80 42, 84 56 C76 52, 68 60, 75 70 C66 68, 60 78, 70 86 C82 102, 118 102, 130 86 C140 78, 134 68, 125 70 C132 60, 124 52, 116 56 C120 42, 112 36, 100 22 Z"
              fill="#F97316"
            />
            {/* Charcoal Rock Face */}
            <path
              d="M82 58 C82 50, 118 50, 118 58 C122 72, 118 84, 100 86 C82 84, 78 72, 82 58 Z"
              fill="#521B0B"
              stroke="#2B0A03"
              strokeWidth="3"
            />
            {/* Glowing Lava Cracks on Face */}
            <path d="M88 66 L94 72 M112 66 L106 72 M100 74 L100 82" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
            {/* Fiery Slit Eyes */}
            <polygon points="88,62 96,65 94,68 86,66" fill="#FEF08A" />
            <polygon points="112,62 104,65 106,68 114,66" fill="#FEF08A" />
            {/* Basalt Magma Collar Plates */}
            <path d="M68 82 L132 82 L124 96 L76 96 Z" fill="#7C2D12" stroke="#371007" strokeWidth="3" />
            {/* Charcoal Chest Plate with Molten Veins */}
            <path d="M72 96 L128 96 L120 144 L80 144 Z" fill="#9A3412" stroke="#431407" strokeWidth="4" />
            <path d="M80 102 L92 114 L82 134 M120 102 L108 114 L118 134" stroke="#FDE047" strokeWidth="3" fill="none" />
            {/* Centered Omnitrix Badge */}
            <circle cx="100" cy="116" r="12" fill="#000" stroke="#CBD5E1" strokeWidth="2.5" />
            <polygon points="93,111 107,111 100,116" fill="#39FF14" />
            <polygon points="93,121 107,121 100,116" fill="#39FF14" />
            {/* Massive Fiery Fists */}
            <circle cx="44" cy="116" r="18" fill="#EA580C" stroke="#7C2D12" strokeWidth="3.5" />
            <circle cx="156" cy="116" r="18" fill="#EA580C" stroke="#7C2D12" strokeWidth="3.5" />
            <circle cx="44" cy="116" r="10" fill="#FDE047" />
            <circle cx="156" cy="116" r="10" fill="#FDE047" />
            {/* Fire jets emitting from fists */}
            <path d="M26 116 C16 110, 12 122, 26 128 Z" fill="#FDE047" />
            <path d="M174 116 C184 110, 188 122, 174 128 Z" fill="#FDE047" />
          </svg>
        </div>
      );

    case 'fourarms':
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 rounded-full bg-red-600/35 blur-2xl animate-pulse" />
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(220,38,38,0.95)]">
            {/* Upper Muscular Crimson Arms */}
            <path d="M58 54 C36 40, 16 46, 12 72 C28 82, 48 76, 62 72 Z" fill="#DC2626" stroke="#0F172A" strokeWidth="4" />
            <path d="M142 54 C164 40, 184 46, 188 72 C172 82, 152 76, 138 72 Z" fill="#DC2626" stroke="#0F172A" strokeWidth="4" />
            {/* Black Wrist Bracers & Fist on Upper Arms */}
            <circle cx="12" cy="74" r="11" fill="#DC2626" stroke="#0F172A" strokeWidth="3" />
            <rect x="18" y="66" width="10" height="16" rx="2" fill="#0F172A" />
            <circle cx="188" cy="74" r="11" fill="#DC2626" stroke="#0F172A" strokeWidth="3" />
            <rect x="172" y="66" width="10" height="16" rx="2" fill="#0F172A" />

            {/* Lower Muscular Crimson Arms */}
            <path d="M64 92 C38 96, 22 112, 18 132 C38 138, 56 124, 68 114 Z" fill="#DC2626" stroke="#0F172A" strokeWidth="4" />
            <path d="M136 92 C162 96, 178 112, 182 132 C162 138, 144 124, 132 114 Z" fill="#DC2626" stroke="#0F172A" strokeWidth="4" />
            <circle cx="18" cy="132" r="11" fill="#DC2626" stroke="#0F172A" strokeWidth="3" />
            <rect x="24" y="124" width="10" height="16" rx="2" fill="#0F172A" />
            <circle cx="182" cy="132" r="11" fill="#DC2626" stroke="#0F172A" strokeWidth="3" />
            <rect x="166" y="124" width="10" height="16" rx="2" fill="#0F172A" />

            {/* Massive Torso: Iconic Classic White T-shirt with Black Stripe */}
            <path d="M58 60 L142 60 L132 148 L68 148 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="5" />
            <rect x="88" y="60" width="24" height="88" fill="#0F172A" />

            {/* Red Head with Black Central Stripe */}
            <ellipse cx="100" cy="40" rx="22" ry="26" fill="#DC2626" stroke="#0F172A" strokeWidth="4" />
            <path d="M95 14 L105 14 L105 66 L95 66 Z" fill="#0F172A" />

            {/* 4 Golden Eyes */}
            <circle cx="88" cy="36" r="3.5" fill="#FACC15" stroke="#0F172A" strokeWidth="1" />
            <circle cx="112" cy="36" r="3.5" fill="#FACC15" stroke="#0F172A" strokeWidth="1" />
            <circle cx="85" cy="44" r="3" fill="#FACC15" stroke="#0F172A" strokeWidth="1" />
            <circle cx="115" cy="44" r="3" fill="#FACC15" stroke="#0F172A" strokeWidth="1" />

            {/* Omnitrix Badge on Left Shoulder */}
            <circle cx="68" cy="74" r="11" fill="#000" stroke="#E2E8F0" strokeWidth="2.5" />
            <polygon points="62,69 74,69 68,74" fill="#39FF14" />
            <polygon points="62,79 74,79 68,74" fill="#39FF14" />
          </svg>
        </div>
      );

    case 'xlr8':
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 rounded-full bg-cyan-500/35 blur-2xl animate-pulse" />
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(14,165,233,0.95)]">
            {/* Aerodynamic Black & Cyan Cone Head */}
            <path
              d="M100 16 C122 16, 172 42, 182 58 C176 74, 134 84, 100 84 C66 84, 52 68, 62 42 C72 26, 84 16, 100 16 Z"
              fill="#0F172A"
              stroke="#0284C7"
              strokeWidth="4"
            />
            {/* Cyan Stripes on Cone */}
            <path d="M82 28 C96 24, 116 26, 134 34" stroke="#38BDF8" strokeWidth="4" fill="none" />
            <path d="M72 44 C92 40, 118 42, 142 50" stroke="#38BDF8" strokeWidth="4" fill="none" />

            {/* Retractable Green Visor Slit */}
            <polygon points="122,46 172,56 138,64 116,54" fill="#39FF14" stroke="#15803D" strokeWidth="1.5" />

            {/* Slender Blue & Black Torso with Lightning Chevron */}
            <path d="M82 84 L126 84 L116 146 L88 146 Z" fill="#0284C7" stroke="#0F172A" strokeWidth="4" />
            <polygon points="98,84 110,84 106,146 94,146" fill="#0F172A" />

            {/* Centered Omnitrix Chest Emblem */}
            <circle cx="102" cy="112" r="11" fill="#000" stroke="#E2E8F0" strokeWidth="2.5" />
            <polygon points="96,107 108,107 102,112" fill="#39FF14" />
            <polygon points="96,117 108,117 102,112" fill="#39FF14" />

            {/* Scissor Claws */}
            <polygon points="40,94 72,110 52,132" fill="#0F172A" stroke="#0284C7" strokeWidth="3" />
            <polygon points="160,94 128,110 148,132" fill="#0F172A" stroke="#0284C7" strokeWidth="3" />

            {/* Balancing Tail with Cyan Ring */}
            <path d="M88 144 C66 150, 40 156, 24 168 C38 166, 56 160, 92 152 Z" fill="#0F172A" stroke="#0284C7" strokeWidth="3" />
            <circle cx="48" cy="162" r="4" fill="#38BDF8" />

            {/* Spherical Wheel Feet with Speed Blur */}
            <circle cx="82" cy="178" r="14" fill="#0F172A" stroke="#38BDF8" strokeWidth="3.5" />
            <circle cx="82" cy="178" r="5" fill="#38BDF8" />
            <circle cx="126" cy="178" r="14" fill="#0F172A" stroke="#38BDF8" strokeWidth="3.5" />
            <circle cx="126" cy="178" r="5" fill="#38BDF8" />
          </svg>
        </div>
      );

    case 'diamondhead':
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 rounded-full bg-emerald-500/35 blur-2xl animate-pulse" />
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(16,185,129,0.95)]">
            {/* Massive Back Crystal Shard Spikes */}
            <polygon points="100,6 116,42 84,42" fill="#34D399" stroke="#065F46" strokeWidth="3.5" />
            <polygon points="62,24 90,52 68,66" fill="#10B981" stroke="#065F46" strokeWidth="3.5" />
            <polygon points="138,24 132,66 110,52" fill="#10B981" stroke="#065F46" strokeWidth="3.5" />

            {/* Faceted Petrosapien Head & Backward Crest */}
            <polygon points="100,34 124,50 116,78 84,78 76,50" fill="#6EE7B7" stroke="#065F46" strokeWidth="4" />
            <polygon points="100,34 116,46 100,56 84,46" fill="#A7F3D0" />

            {/* Glowing Golden Eyes */}
            <polygon points="86,58 94,60 92,64 86,63" fill="#FACC15" />
            <polygon points="114,58 106,60 108,64 114,63" fill="#FACC15" />

            {/* Iconic 50/50 Split Uniform: Left Black / Right White */}
            <path d="M68 78 L100 78 L98 146 L72 146 Z" fill="#0F172A" stroke="#065F46" strokeWidth="4" />
            <path d="M100 78 L132 78 L128 146 L98 146 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />

            {/* Omnitrix Symbol on Left Chest */}
            <circle cx="84" cy="102" r="11" fill="#000" stroke="#CBD5E1" strokeWidth="2.5" />
            <polygon points="78,97 90,97 84,102" fill="#39FF14" />
            <polygon points="78,107 90,107 84,102" fill="#39FF14" />

            {/* Razor-Sharp Crystalline Blade Arms */}
            <polygon points="42,92 14,128 36,144 64,112" fill="#10B981" stroke="#047857" strokeWidth="3.5" />
            <polygon points="158,92 186,128 164,144 136,112" fill="#34D399" stroke="#047857" strokeWidth="3.5" />
            <polygon points="14,128 8,142 22,138" fill="#A7F3D0" />
            <polygon points="186,128 192,142 178,138" fill="#A7F3D0" />
          </svg>
        </div>
      );

    case 'upgrade':
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 rounded-full bg-emerald-400/35 blur-2xl animate-pulse" />
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(52,211,153,0.95)]">
            {/* Black Metallic Nanite Body */}
            <path
              d="M72 46 C72 24, 128 24, 128 46 C134 72, 128 88, 100 88 C72 88, 66 72, 72 46 Z"
              fill="#0F172A"
              stroke="#10B981"
              strokeWidth="4"
            />

            {/* Glowing Green Eye Optic Circle Ring */}
            <circle cx="100" cy="52" r="15" fill="#000" stroke="#39FF14" strokeWidth="5" />
            <circle cx="100" cy="52" r="6" fill="#39FF14" className="animate-pulse" />

            {/* Branching Circuit Traces */}
            <path d="M100 67 L100 88 M85 52 L68 52 M115 52 L132 52 M90 40 L78 30 M110 40 L122 30" stroke="#39FF14" strokeWidth="3" />
            <circle cx="78" cy="30" r="2.5" fill="#39FF14" />
            <circle cx="122" cy="30" r="2.5" fill="#39FF14" />

            {/* Torso & White Underbelly Panel */}
            <path d="M68 88 L132 88 L122 152 L78 152 Z" fill="#0F172A" stroke="#10B981" strokeWidth="4" />
            <path d="M84 88 L116 88 L110 152 L90 152 Z" fill="#E2E8F0" stroke="#0F172A" strokeWidth="2" />

            {/* Centered Omnitrix Badge */}
            <circle cx="100" cy="110" r="12" fill="#000" stroke="#10B981" strokeWidth="2.5" />
            <polygon points="93,105 107,105 100,110" fill="#39FF14" />
            <polygon points="93,115 107,115 100,110" fill="#39FF14" />

            {/* Nanite Fluid Arms with Circuit Traces */}
            <path d="M48 96 L26 134 L42 144 L64 112 Z" fill="#0F172A" stroke="#39FF14" strokeWidth="3" />
            <path d="M152 96 L174 134 L158 144 L136 112 Z" fill="#0F172A" stroke="#39FF14" strokeWidth="3" />
          </svg>
        </div>
      );

    case 'greymatter':
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 rounded-full bg-slate-400/35 blur-2xl animate-pulse" />
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_20px_rgba(148,163,184,0.95)]">
            {/* Enormous Cranium Head with Forehead Furrows */}
            <path
              d="M58 42 C48 20, 152 20, 142 42 C158 68, 142 90, 100 90 C58 90, 42 68, 58 42 Z"
              fill="#94A3B8"
              stroke="#334155"
              strokeWidth="4"
            />
            <path d="M86 30 C94 26, 106 26, 114 30" stroke="#64748B" strokeWidth="2.5" fill="none" />
            <path d="M90 36 C96 34, 104 34, 110 36" stroke="#64748B" strokeWidth="2" fill="none" />

            {/* Bulbous Green Frog Eyes with Horizontal Rectangular Slits */}
            <circle cx="68" cy="48" r="19" fill="#22C55E" stroke="#0F172A" strokeWidth="3" />
            <circle cx="132" cy="48" r="19" fill="#22C55E" stroke="#0F172A" strokeWidth="3" />
            <rect x="56" y="45" width="24" height="6" rx="2" fill="#0F172A" />
            <rect x="120" y="45" width="24" height="6" rx="2" fill="#0F172A" />

            {/* Tiny Frog Mouth */}
            <path d="M92 74 C96 76, 104 76, 108 74" stroke="#475569" strokeWidth="2" strokeLinecap="round" />

            {/* Small White Suit with Black Center Stripe */}
            <path d="M78 90 L122 90 L116 142 L84 142 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
            <rect x="94" y="90" width="12" height="52" fill="#0F172A" />

            {/* Back-Mounted Omnitrix Badge (visible on upper back/crest) */}
            <circle cx="100" cy="24" r="10" fill="#000" stroke="#CBD5E1" strokeWidth="2" />
            <polygon points="94,20 106,20 100,24" fill="#39FF14" />
            <polygon points="94,28 106,28 100,24" fill="#39FF14" />
          </svg>
        </div>
      );

    case 'ripjaws':
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 rounded-full bg-sky-500/35 blur-2xl animate-pulse" />
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(2,132,199,0.95)]">
            {/* Glowing Anglerfish Lure */}
            <path d="M100 32 C95 10, 118 6, 124 15" stroke="#38BDF8" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            <circle cx="124" cy="15" r="8" fill="#FDE047" className="animate-ping" />
            <circle cx="124" cy="15" r="6" fill="#FEF08A" />

            {/* Menacing Scaly Blue Aquatic Head */}
            <path
              d="M66 44 C66 28, 134 28, 134 44 C144 65, 148 92, 100 96 C52 92, 56 65, 66 44 Z"
              fill="#0284C7"
              stroke="#082F49"
              strokeWidth="4"
            />
            {/* Piercing Red Predator Eyes */}
            <circle cx="78" cy="48" r="6" fill="#EF4444" stroke="#000" strokeWidth="1.5" />
            <circle cx="122" cy="48" r="6" fill="#EF4444" stroke="#000" strokeWidth="1.5" />
            <circle cx="78" cy="48" r="2" fill="#000" />
            <circle cx="122" cy="48" r="2" fill="#000" />

            {/* Massive Gaping Unhinged Jaw with Razor Shark Teeth */}
            <path d="M68 64 L132 64 L124 88 L76 88 Z" fill="#082F49" stroke="#000" strokeWidth="3" />
            {/* Top Teeth */}
            <polygon points="74,64 78,74 82,64" fill="#FFFFFF" />
            <polygon points="84,64 88,74 92,64" fill="#FFFFFF" />
            <polygon points="94,64 98,75 102,64" fill="#FFFFFF" />
            <polygon points="104,64 108,74 112,64" fill="#FFFFFF" />
            <polygon points="114,64 118,74 122,64" fill="#FFFFFF" />
            {/* Bottom Teeth */}
            <polygon points="78,88 82,78 86,88" fill="#FFFFFF" />
            <polygon points="88,88 92,77 96,88" fill="#FFFFFF" />
            <polygon points="98,88 102,76 106,88" fill="#FFFFFF" />
            <polygon points="108,88 112,77 116,88" fill="#FFFFFF" />

            {/* Torso with Dorsal Fin & Left Pectoral Omnitrix */}
            <path d="M72 96 L128 96 L120 152 L80 152 Z" fill="#0369A1" stroke="#082F49" strokeWidth="4" />
            <circle cx="88" cy="116" r="11" fill="#000" stroke="#CBD5E1" strokeWidth="2.5" />
            <polygon points="82,111 94,111 88,116" fill="#39FF14" />
            <polygon points="82,121 94,121 88,116" fill="#39FF14" />
          </svg>
        </div>
      );

    case 'stinkfly':
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 rounded-full bg-lime-500/35 blur-2xl animate-pulse" />
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(132,204,22,0.95)]">
            {/* 4 Distinct Stalk Eyes on Sides */}
            <line x1="74" y1="36" x2="60" y2="22" stroke="#65A30D" strokeWidth="4" strokeLinecap="round" />
            <circle cx="60" cy="22" r="7" fill="#FACC15" stroke="#0F172A" strokeWidth="2.5" />
            <line x1="126" y1="36" x2="140" y2="22" stroke="#65A30D" strokeWidth="4" strokeLinecap="round" />
            <circle cx="140" cy="22" r="7" fill="#FACC15" stroke="#0F172A" strokeWidth="2.5" />
            <line x1="72" y1="46" x2="52" y2="38" stroke="#65A30D" strokeWidth="4" strokeLinecap="round" />
            <circle cx="52" cy="38" r="6.5" fill="#FACC15" stroke="#0F172A" strokeWidth="2.5" />
            <line x1="128" y1="46" x2="148" y2="38" stroke="#65A30D" strokeWidth="4" strokeLinecap="round" />
            <circle cx="148" cy="38" r="6.5" fill="#FACC15" stroke="#0F172A" strokeWidth="2.5" />

            {/* 4 Large Veined Insect Wings */}
            <ellipse cx="38" cy="50" rx="46" ry="18" transform="rotate(-28 38 50)" fill="#ECFCCB" opacity="0.85" stroke="#84CC16" strokeWidth="2.5" />
            <ellipse cx="162" cy="50" rx="46" ry="18" transform="rotate(28 162 50)" fill="#ECFCCB" opacity="0.85" stroke="#84CC16" strokeWidth="2.5" />
            <ellipse cx="32" cy="74" rx="38" ry="14" transform="rotate(-40 32 74)" fill="#ECFCCB" opacity="0.75" stroke="#84CC16" strokeWidth="2" />
            <ellipse cx="168" cy="74" rx="38" ry="14" transform="rotate(40 168 74)" fill="#ECFCCB" opacity="0.75" stroke="#84CC16" strokeWidth="2" />

            {/* Insectoid Exoskeleton Head */}
            <ellipse cx="100" cy="42" rx="18" ry="20" fill="#84CC16" stroke="#1E293B" strokeWidth="4" />

            {/* Centered Omnitrix Badge on Face/Forehead */}
            <circle cx="100" cy="42" r="11" fill="#000" stroke="#CBD5E1" strokeWidth="2.5" />
            <polygon points="94,37 106,37 100,42" fill="#39FF14" />
            <polygon points="94,47 106,47 100,42" fill="#39FF14" />

            {/* Brown/Green Segmented Thorax & Abdomen */}
            <path d="M84 62 L116 62 L110 125 L90 125 Z" fill="#65A30D" stroke="#1E293B" strokeWidth="4" />
            {/* Curled Scorpion Tail & Black Stinger */}
            <path d="M100 125 C96 142, 114 162, 106 182" stroke="#65A30D" strokeWidth="8" fill="none" strokeLinecap="round" />
            <polygon points="106,182 118,172 112,188" fill="#0F172A" />
          </svg>
        </div>
      );

    case 'ghostfreak':
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 rounded-full bg-purple-500/35 blur-2xl animate-pulse" />
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(203,213,225,0.95)]">
            {/* Wispy Ghostly Shroud Body */}
            <path
              d="M100 22 C72 22, 68 44, 74 66 C80 88, 84 98, 100 98 C116 98, 120 88, 126 66 C132 44, 128 22, 100 22 Z"
              fill="#CBD5E1"
              stroke="#475569"
              strokeWidth="4"
            />
            {/* Eye Track Groove & Inverted Purple Cyclops Eye */}
            <path d="M84 38 C94 50, 108 54, 118 48" stroke="#334155" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            <ellipse cx="98" cy="46" rx="6" ry="8" transform="rotate(-15 98 46)" fill="#A855F7" stroke="#000" strokeWidth="1.5" />
            <ellipse cx="98" cy="46" rx="2.5" ry="3.5" fill="#0F172A" />

            {/* Wispy Tattered Tail Floating with Spectral Tendrils */}
            <path
              d="M74 88 C64 102, 54 122, 50 148 C62 142, 74 130, 82 118 L90 152 C84 174, 68 186, 78 200 C98 188, 102 162, 110 150 C118 168, 132 184, 144 196 C144 174, 126 156, 122 136 L132 116 C142 126, 154 136, 162 142 C156 116, 146 98, 122 88 Z"
              fill="#E2E8F0"
              stroke="#64748B"
              strokeWidth="4"
            />
            {/* Chest Seam with Omnitrix Badge */}
            <circle cx="100" cy="100" r="11" fill="#000" stroke="#CBD5E1" strokeWidth="2.5" />
            <polygon points="94,95 106,95 100,100" fill="#39FF14" />
            <polygon points="94,105 106,105 100,100" fill="#39FF14" />
          </svg>
        </div>
      );

    case 'wildmutt':
      return (
        <div className={`relative flex items-center justify-center ${className}`}>
          <div className="absolute inset-0 rounded-full bg-orange-600/35 blur-2xl animate-pulse" />
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(234,88,12,0.95)]">
            {/* Orange Feral Beast Snout & Jaws */}
            <path
              d="M120 44 C140 48, 170 58, 178 72 C170 88, 142 92, 120 84 C108 76, 110 56, 120 44 Z"
              fill="#EA580C"
              stroke="#7C2D12"
              strokeWidth="4"
            />
            {/* Razor White Fangs */}
            <polygon points="144,74 150,86 154,74" fill="#FFFFFF" />
            <polygon points="134,76 138,86 142,76" fill="#FFFFFF" />

            {/* Three Thermographic Gill Slits on Neck */}
            <path d="M112 56 L102 70 M102 52 L92 66 M92 48 L82 62" stroke="#431407" strokeWidth="4.5" strokeLinecap="round" />

            {/* Muscular Spine with Brown Porcupine Quills */}
            <path
              d="M120 66 C98 52, 66 60, 48 74 C30 88, 26 108, 36 130 L48 126 C44 108, 54 92, 70 84 L88 92 Z"
              fill="#C2410C"
              stroke="#7C2D12"
              strokeWidth="4"
            />
            <polygon points="76,66 70,54 84,62" fill="#7C2D12" />
            <polygon points="94,62 90,50 102,58" fill="#7C2D12" />

            {/* Left Shoulder Metallic Omnitrix Bracer */}
            <circle cx="84" cy="84" r="12" fill="#000" stroke="#CBD5E1" strokeWidth="2.5" />
            <polygon points="77,79 91,79 84,84" fill="#39FF14" />
            <polygon points="77,89 91,89 84,84" fill="#39FF14" />

            {/* Heavy Front Ape Paws & Black Claws */}
            <path d="M128 78 L136 152 L158 152 L150 104 L124 88 Z" fill="#EA580C" stroke="#7C2D12" strokeWidth="4" />
            <polygon points="158,152 168,156 158,160" fill="#0F172A" />
            <polygon points="146,152 156,156 146,160" fill="#0F172A" />
          </svg>
        </div>
      );

    default:
      return null;
  }
};

/**
 * Iconic Omnitrix Hourglass Symbol with customizable glowing state
 */
export const OmnitrixSymbol: React.FC<{
  size?: number;
  state?: 'green' | 'red' | 'yellow' | 'white';
  pulsing?: boolean;
}> = ({ size = 120, state = 'green', pulsing = false }) => {
  const colorMap = {
    green: {
      core: '#39FF14',
      glow: 'rgba(57, 255, 20, 0.85)',
      ring: '#10B981',
      shadowClass: 'omni-glow-green',
    },
    red: {
      core: '#EF4444',
      glow: 'rgba(239, 68, 68, 0.85)',
      ring: '#DC2626',
      shadowClass: 'omni-glow-red',
    },
    yellow: {
      core: '#FACC15',
      glow: 'rgba(250, 204, 21, 0.85)',
      ring: '#EAB308',
      shadowClass: '',
    },
    white: {
      core: '#F8FAFC',
      glow: 'rgba(248, 250, 252, 0.85)',
      ring: '#CBD5E1',
      shadowClass: '',
    },
  };

  const current = colorMap[state];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`${current.shadowClass} ${pulsing ? 'animate-pulse' : ''} transition-all duration-300`}
    >
      {/* Outer black bezel ring */}
      <circle cx="50" cy="50" r="48" fill="#0C0E10" stroke="#272A2D" strokeWidth="4" />

      {/* Internal rim */}
      <circle cx="50" cy="50" r="42" fill="#14171A" stroke={current.ring} strokeWidth="1.5" opacity="0.6" />

      {/* Black Hourglass Hour Wings */}
      <path
        d="M 12 50 C 12 30, 28 14, 50 14 C 40 28, 40 40, 50 50 C 40 60, 40 72, 50 86 C 28 86, 12 70, 12 50 Z"
        fill="#08090A"
      />
      <path
        d="M 88 50 C 88 30, 72 14, 50 14 C 60 28, 60 40, 50 50 C 60 60, 60 72, 50 86 C 72 86, 88 70, 88 50 Z"
        fill="#08090A"
      />

      {/* Glowing Neon Triangles (The Iconic Interlocking Hourglass) */}
      <polygon points="50,48 24,18 76,18" fill={current.core} />
      <polygon points="50,52 24,82 76,82" fill={current.core} />

      {/* Subtle glass reflection highlight */}
      <path
        d="M 20 30 C 35 18, 65 18, 80 30 C 68 24, 32 24, 20 30 Z"
        fill="#FFFFFF"
        opacity="0.3"
      />
    </svg>
  );
};
