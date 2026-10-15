import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CLASSIC_ALIENS } from '../data/aliens';
import { AlienSilhouetteIcon, OmnitrixSymbol } from './AlienGraphics';
import { soundEngine } from '../services/soundEngine';
import { haptics } from '../services/haptics';
import { ChevronLeft, ChevronRight, Zap, RefreshCw } from 'lucide-react';

interface WatchFaceProps {
  watchState: 'standby' | 'popped' | 'transforming' | 'active' | 'recharging';
  onPopUp: () => void;
  onInitiateTransformation: (alienIndex: number) => void;
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  masterControl: boolean;
}

export const WatchFace: React.FC<WatchFaceProps> = ({
  watchState,
  onPopUp,
  onInitiateTransformation,
  selectedIndex,
  onSelectIndex,
  masterControl,
}) => {
  const [time, setTime] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const [isPrimed, setIsPrimed] = useState<boolean>(false);
  const [dragStartAngle, setDragStartAngle] = useState<number | null>(null);
  const dialRef = useRef<HTMLDivElement>(null);

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
      setDateStr(
        now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase()
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const totalAliens = CLASSIC_ALIENS.length;
  const currentAlien = CLASSIC_ALIENS[selectedIndex];

  // Rotate alien by delta (+1 or -1)
  const stepAlien = useCallback(
    (delta: number) => {
      const nextIndex = (selectedIndex + delta + totalAliens) % totalAliens;
      onSelectIndex(nextIndex);
      soundEngine.playBezelTick(1.0 + (nextIndex / totalAliens) * 0.4);
      haptics.tick();
    },
    [selectedIndex, totalAliens, onSelectIndex]
  );

  // Mouse wheel rotation support
  const handleWheel = (e: React.WheelEvent) => {
    if (watchState !== 'popped') return;
    if (Math.abs(e.deltaY) > 20 || Math.abs(e.deltaX) > 20) {
      stepAlien(e.deltaY > 0 || e.deltaX > 0 ? 1 : -1);
    }
  };

  // Touch circular rotation math
  const getAngleFromEvent = (clientX: number, clientY: number): number | null => {
    if (!dialRef.current) return null;
    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rad = Math.atan2(clientY - centerY, clientX - centerX);
    return (rad * 180) / Math.PI; // -180 to 180
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (watchState !== 'popped') return;
    const angle = getAngleFromEvent(e.clientX, e.clientY);
    if (angle !== null) {
      setDragStartAngle(angle);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartAngle === null || watchState !== 'popped') return;
    const currentAngle = getAngleFromEvent(e.clientX, e.clientY);
    if (currentAngle === null) return;

    let diff = currentAngle - dragStartAngle;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    // Trigger step every ~30 degrees of rotation
    if (Math.abs(diff) >= 30) {
      stepAlien(diff > 0 ? 1 : -1);
      setDragStartAngle(currentAngle);
    }
  };

  const handlePointerUp = () => {
    setDragStartAngle(null);
  };

  // Prime or Slam
  const handleCenterAction = () => {
    if (watchState === 'standby') {
      soundEngine.playPopUp();
      haptics.popUp();
      onPopUp();
      return;
    }

    if (watchState === 'popped') {
      if (!isPrimed) {
        setIsPrimed(true);
        soundEngine.startPrimeHum();
        haptics.prime();
      } else {
        // Slam down!
        setIsPrimed(false);
        soundEngine.playSlam();
        haptics.slam();
        onInitiateTransformation(selectedIndex);
      }
    }
  };

  return (
    <div
      ref={dialRef}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] rounded-full select-none touch-none-selection overflow-hidden bg-black flex items-center justify-center p-2 shadow-2xl border-4 border-neutral-900"
    >
      {/* Outer Metallic Bezel Ring with Hour Markers */}
      <div className="absolute inset-0 rounded-full bezel-metallic p-2 flex items-center justify-center">
        <div className="w-full h-full rounded-full bg-gradient-to-b from-neutral-950 via-black to-neutral-900 flex items-center justify-center relative overflow-hidden">
          {/* Subtle Curved Glass Lens Reflection */}
          <div className="absolute inset-0 rounded-full omni-screen-lens pointer-events-none z-30" />

          {/* STANDBY STATE VIEW */}
          {watchState === 'standby' && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              onClick={handleCenterAction}
              className="relative w-full h-full flex flex-col items-center justify-between p-6 z-20 cursor-pointer group"
            >
              {/* Top Status & Battery */}
              <div className="flex items-center justify-between w-full px-8 pt-3 text-[11px] font-telemetry tracking-widest text-emerald-400">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Zap className="w-3.5 h-3.5 fill-emerald-400 animate-pulse" />
                  {masterControl ? 'MASTER' : 'READY'}
                </span>
                <span className="text-neutral-400 font-medium">{dateStr}</span>
              </div>

              {/* Central Glowing Omnitrix Hourglass Emblem */}
              <div className="relative flex flex-col items-center justify-center my-auto transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
                {/* Glowing Aura Ring */}
                <div className="absolute w-44 h-44 rounded-full bg-emerald-500/15 blur-2xl animate-pulse" />

                <OmnitrixSymbol size={160} state="green" pulsing />

                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="mt-3 text-[12px] font-scifi font-bold tracking-widest text-emerald-400 bg-emerald-950/60 px-4 py-1 rounded-full border border-emerald-500/30 backdrop-blur-sm"
                >
                  PRESS TO POP CORE
                </motion.div>
              </div>

              {/* Bottom Real-Time Digital Watch Face */}
              <div className="flex flex-col items-center pb-3">
                <span className="font-telemetry text-lg font-bold tracking-wider text-emerald-300 tabular-nums drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]">
                  {time}
                </span>
                <span className="text-[10px] tracking-wider text-neutral-500 uppercase font-medium">
                  Omni-Core v1.0 · Pixel Watch
                </span>
              </div>
            </motion.div>
          )}

          {/* POPPED UP ALIEN SELECTION DIAL VIEW */}
          {watchState === 'popped' && (
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 20, stiffness: 260 }}
              className="relative w-full h-full flex flex-col items-center justify-between p-4 z-20"
            >
              {/* Circular Alien Silhouette Marker Ring */}
              <div className="absolute inset-4 rounded-full border-2 border-emerald-500/20 pointer-events-none">
                {CLASSIC_ALIENS.map((alien, i) => {
                  const angle = (i / totalAliens) * 360 - 90; // Top starts at 0
                  const isCurrent = i === selectedIndex;
                  return (
                    <div
                      key={alien.id}
                      className="absolute w-3.5 h-3.5 -ml-1.5 -mt-1.5 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 44}%)`,
                        left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * 44}%)`,
                      }}
                    >
                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          isCurrent
                            ? 'bg-emerald-300 scale-150 shadow-[0_0_8px_#39FF14]'
                            : 'bg-emerald-800/60'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Top Alien Category & Index */}
              <div className="flex items-center justify-between w-full px-6 pt-2 z-30">
                <span className="text-[10px] font-telemetry tracking-widest text-emerald-400 font-semibold bg-black/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  {selectedIndex + 1} / {totalAliens}
                </span>
                <span className="text-[10px] font-telemetry tracking-wider text-neutral-300 truncate max-w-[130px] uppercase">
                  {currentAlien.element}
                </span>
              </div>

              {/* Center Raised Core & Alien Hologram Silhouette */}
              <div className="relative flex flex-col items-center justify-center my-auto z-30 w-full">
                {/* Previous & Next Tap Affordances on sides for easy tap navigation */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    stepAlien(-1);
                  }}
                  aria-label="Previous Alien"
                  className="absolute left-2 z-40 p-2 text-emerald-400 hover:text-emerald-200 active:scale-90 transition-transform bg-black/40 hover:bg-black/70 rounded-full border border-emerald-500/30"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    stepAlien(1);
                  }}
                  aria-label="Next Alien"
                  className="absolute right-2 z-40 p-2 text-emerald-400 hover:text-emerald-200 active:scale-90 transition-transform bg-black/40 hover:bg-black/70 rounded-full border border-emerald-500/30"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* The 3D Elevated Pop-up Core Actuator Button */}
                <motion.div
                  onClick={handleCenterAction}
                  animate={{
                    scale: isPrimed ? [1.02, 1.06, 1.02] : 1,
                    y: isPrimed ? -4 : 0,
                  }}
                  transition={{
                    repeat: isPrimed ? Infinity : 0,
                    duration: 0.8,
                  }}
                  className={`relative cursor-pointer flex flex-col items-center justify-center w-48 h-48 rounded-full border-4 transition-all duration-300 active:scale-95 ${
                    isPrimed
                      ? 'bg-emerald-950/90 border-emerald-300 shadow-[0_0_35px_rgba(57,255,20,0.8)]'
                      : 'bg-neutral-950/90 border-emerald-500/50 shadow-[0_12px_24px_rgba(0,0,0,0.9),0_0_20px_rgba(57,255,20,0.3)]'
                  }`}
                >
                  {/* Holographic Alien Silhouette with smooth transition */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentAlien.id}
                      initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.7, rotate: 20 }}
                      transition={{ duration: 0.2 }}
                      className="text-emerald-400 flex items-center justify-center drop-shadow-[0_0_12px_rgba(57,255,20,0.9)]"
                    >
                      <AlienSilhouetteIcon alienId={currentAlien.id} className="w-24 h-24" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Primed Pulsing Slam Ring */}
                  {isPrimed && (
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-300 animate-ping opacity-60 pointer-events-none" />
                  )}
                </motion.div>

                {/* Alien Codename & Species */}
                <div className="mt-2 text-center pointer-events-none">
                  <h2 className="text-base font-scifi font-black tracking-widest text-emerald-300 drop-shadow-[0_0_10px_rgba(57,255,20,0.8)]">
                    {currentAlien.name}
                  </h2>
                  <p className="text-[11px] text-neutral-400 font-medium">
                    {currentAlien.species} · <span className="text-emerald-500">{currentAlien.homeworld}</span>
                  </p>
                </div>
              </div>

              {/* Bottom Tactile Action Guide */}
              <div className="w-full flex items-center justify-center pb-2 z-30">
                <button
                  onClick={handleCenterAction}
                  className={`px-5 py-1.5 rounded-full text-xs font-scifi font-bold tracking-wider transition-all duration-200 active:scale-95 flex items-center gap-2 ${
                    isPrimed
                      ? 'bg-emerald-400 text-black shadow-[0_0_20px_rgba(57,255,20,0.9)] hover:bg-emerald-300 animate-pulse'
                      : 'bg-neutral-900/90 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-950/80'
                  }`}
                >
                  {isPrimed ? (
                    <>
                      <Zap className="w-3.5 h-3.5 fill-black" />
                      SLAM CORE TO TRANSFORM!
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-3.5 h-3.5" />
                      TAP CENTER TO PRIME
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
