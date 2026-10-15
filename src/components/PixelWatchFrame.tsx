import React from 'react';
import { motion } from 'motion/react';
import { RotateCw, RotateCcw } from 'lucide-react';

interface PixelWatchFrameProps {
  children: React.ReactNode;
  isFullscreen: boolean;
  onRotateCrown: (delta: number) => void;
  onPressCrown: () => void;
  watchState: string;
}

export const PixelWatchFrame: React.FC<PixelWatchFrameProps> = ({
  children,
  isFullscreen,
  onRotateCrown,
  onPressCrown,
  watchState,
}) => {
  if (isFullscreen) {
    // Pure round display mode for actual smartwatches or direct circular canvas
    return (
      <div className="relative flex items-center justify-center w-full max-w-[420px] aspect-square rounded-full overflow-hidden bg-black p-0 shadow-[0_0_50px_rgba(0,0,0,0.9)]">
        {children}
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center my-6 select-none">
      {/* Top Silicone Strap */}
      <div className="relative w-36 h-28 bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 rounded-t-3xl shadow-inner border-t border-x border-neutral-700/40 flex flex-col items-center justify-start pt-3 overflow-hidden">
        {/* Strap holes & texture */}
        <div className="flex flex-col gap-3 items-center opacity-40">
          <div className="w-4 h-2 rounded-full bg-neutral-950 border border-neutral-700/60" />
          <div className="w-4 h-2 rounded-full bg-neutral-950 border border-neutral-700/60" />
          <div className="w-4 h-2 rounded-full bg-neutral-950 border border-neutral-700/60" />
        </div>
      </div>

      {/* Main Watch Casing Ring */}
      <div className="relative flex items-center justify-center">
        {/* Interactive Digital Crown on the Right */}
        <div className="absolute -right-7 top-1/2 -translate-y-1/2 flex flex-col items-center z-30 group">
          {/* Rotate Up Button */}
          <button
            onClick={() => onRotateCrown(-1)}
            aria-label="Crown Up"
            title="Rotate Crown Clockwise"
            className="w-5 h-5 -mb-1 bg-neutral-800 hover:bg-neutral-700 active:scale-90 text-neutral-400 hover:text-emerald-400 rounded-t flex items-center justify-center border border-neutral-700 transition-all"
          >
            <RotateCcw className="w-3 h-3" />
          </button>

          {/* Crown Cylindrical Knob with Tactile Knurling */}
          <button
            onClick={onPressCrown}
            aria-label="Press Digital Crown"
            title="Press Digital Crown (Activates Watch or primes alien)"
            className="w-7 h-14 bg-gradient-to-r from-neutral-800 via-neutral-600 to-neutral-900 rounded-r-md border border-neutral-700 shadow-xl flex flex-col justify-around py-1.5 px-0.5 active:translate-x-[-2px] transition-transform cursor-pointer"
          >
            {/* Knurling ridges */}
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-full h-[1.5px] bg-neutral-950/80 rounded-full" />
            ))}
          </button>

          {/* Rotate Down Button */}
          <button
            onClick={() => onRotateCrown(1)}
            aria-label="Crown Down"
            title="Rotate Crown Counter-Clockwise"
            className="w-5 h-5 -mt-1 bg-neutral-800 hover:bg-neutral-700 active:scale-90 text-neutral-400 hover:text-emerald-400 rounded-b flex items-center justify-center border border-neutral-700 transition-all"
          >
            <RotateCw className="w-3 h-3" />
          </button>
        </div>

        {/* Secondary Side Button (above crown) */}
        <button
          onClick={onPressCrown}
          aria-label="Side Button"
          title="Hardware Power Button"
          className="absolute -right-3.5 top-[32%] w-2 h-7 bg-neutral-800 hover:bg-neutral-700 rounded-r border-r border-y border-neutral-700 cursor-pointer transition-transform active:translate-x-[-1px]"
        />

        {/* Matte Outer Watch Body (Curved Case Chassis) */}
        <div className="relative p-4 rounded-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(255,255,255,0.1)] border border-neutral-700/60">
          {/* Inner Bezel Chamfer Ring */}
          <div className="p-1 rounded-full bg-gradient-to-b from-neutral-900 to-black shadow-inner">
            {children}
          </div>
        </div>
      </div>

      {/* Bottom Silicone Strap */}
      <div className="relative w-36 h-28 bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 rounded-b-3xl shadow-inner border-b border-x border-neutral-700/40 flex flex-col items-center justify-end pb-4 overflow-hidden">
        {/* Buckle pin loop */}
        <div className="w-14 h-4 rounded-md bg-neutral-950 border border-neutral-700 flex items-center justify-center mb-2">
          <div className="w-2 h-2 rounded-full bg-neutral-600" />
        </div>
      </div>
    </div>
  );
};
