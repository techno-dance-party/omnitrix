import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Alien, AlienPower } from '../types/alien';
import { AlienCharacterArt, OmnitrixSymbol } from './AlienGraphics';
import { soundEngine } from '../services/soundEngine';
import { haptics } from '../services/haptics';
import { alienVoiceEngine } from '../services/alienVoice';
import { motionSensor, MotionStrikeType } from '../services/motionSensor';
import {
  Zap,
  Volume2,
  Flame,
  Activity,
  Compass,
  Radio,
  Hand,
  Sparkles,
} from 'lucide-react';

interface AlienBattleViewProps {
  alien: Alien;
  masterControl: boolean;
  onDetransform: () => void;
  onTimeout: () => void;
}

export const AlienBattleView: React.FC<AlienBattleViewProps> = ({
  alien,
  masterControl,
  onDetransform,
  onTimeout,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(30); // 30 second cartoon duration
  const [activeAttackEffect, setActiveAttackEffect] = useState<string | null>(null);
  const [attackCooldowns, setAttackCooldowns] = useState<{ [key: string]: boolean }>({});
  const [lastMotionStrike, setLastMotionStrike] = useState<string | null>(null);
  const [motionIntensity, setMotionIntensity] = useState<number>(0);
  const [sensorActive, setSensorActive] = useState<boolean>(false);

  // Trigger alien signature power
  const handleUsePower = useCallback(
    (power: AlienPower, index: number) => {
      if (attackCooldowns[power.name]) return;

      soundEngine.playAlienAttack(alien.id, index);
      haptics.attack();
      setActiveAttackEffect(power.type);

      // Set cooldown
      setAttackCooldowns((prev) => ({ ...prev, [power.name]: true }));
      setTimeout(() => {
        setAttackCooldowns((prev) => ({ ...prev, [power.name]: false }));
      }, power.cooldownMs);

      setTimeout(() => {
        setActiveAttackEffect(null);
      }, 600);
    },
    [alien.id, attackCooldowns]
  );

  // Subscribe to Accelerometer / Device Motion
  useEffect(() => {
    let mounted = true;

    motionSensor.start().then((started) => {
      if (mounted) setSensorActive(started);
    });

    const unsubscribe = motionSensor.subscribe((type: MotionStrikeType, intensity: number) => {
      if (!mounted) return;

      setLastMotionStrike(type);
      setMotionIntensity(intensity);

      // Map motion to attack moves:
      // Punch / forward thrust -> Power 1
      // Slam / downward strike -> Power 2
      // Shake -> Alien Voice Shout or Power 1
      if (type === 'punch') {
        handleUsePower(alien.powers[0], 0);
      } else if (type === 'slam') {
        handleUsePower(alien.powers[1], 1);
      } else if (type === 'shake') {
        alienVoiceEngine.playAlienVoice(alien.id);
        handleUsePower(alien.powers[0], 0);
      }

      setTimeout(() => {
        if (mounted) setLastMotionStrike(null);
      }, 700);
    });

    return () => {
      mounted = false;
      unsubscribe();
      motionSensor.stop();
    };
  }, [alien, handleUsePower]);

  // Countdown timer unless master control is active
  useEffect(() => {
    if (masterControl) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        // Warning beeps in last 5 seconds
        if (prev <= 6) {
          soundEngine.playTimeoutWarning();
          haptics.timeoutWarning();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [masterControl]);

  // Safely trigger onTimeout when timer reaches 0
  useEffect(() => {
    if (!masterControl && timeLeft === 0) {
      onTimeout();
    }
  }, [timeLeft, masterControl, onTimeout]);

  // Quick gesture swipe on screen to simulate arm swing
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (dist > 40) {
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        motionSensor.simulateMotion('slam', 1.2);
      } else {
        motionSensor.simulateMotion('punch', 1.2);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const isLowTime = !masterControl && timeLeft <= 5;

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full max-w-sm flex flex-col items-center justify-between p-4 z-20 min-h-[520px] select-none"
    >
      {/* Motion Strike Alert Indicator */}
      <AnimatePresence>
        {lastMotionStrike && (
          <motion.div
            initial={{ scale: 0.5, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="absolute top-2 z-50 flex items-center gap-1.5 px-4 py-1 rounded-full bg-emerald-400 text-black font-scifi font-black text-xs tracking-widest shadow-[0_0_20px_#39FF14]"
          >
            <Sparkles className="w-4 h-4 fill-black" />
            MOTION STRIKE: {lastMotionStrike.toUpperCase()}!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visual Attack Effects Overlay */}
      <AnimatePresence>
        {activeAttackEffect === 'blast' && (
          <motion.div
            initial={{ scale: 0.2, opacity: 1 }}
            animate={{ scale: 2.8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
          >
            <div
              className="w-56 h-56 rounded-full blur-md"
              style={{
                backgroundColor: alien.primaryColor,
                boxShadow: `0 0 70px ${alien.primaryColor}`,
              }}
            />
          </motion.div>
        )}

        {activeAttackEffect === 'slam' && (
          <motion.div
            initial={{ y: -40, opacity: 1 }}
            animate={{ y: 40, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
          >
            <div className="w-72 h-14 rounded-full bg-white/50 blur-sm shadow-[0_0_50px_#FFFFFF]" />
          </motion.div>
        )}

        {activeAttackEffect === 'dash' && (
          <motion.div
            initial={{ x: -160, opacity: 1 }}
            animate={{ x: 160, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
          >
            <div className="w-80 h-10 bg-cyan-400/70 blur-md rounded-full shadow-[0_0_30px_#38BDF8]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar: Alien Name & Energy Timer */}
      <div className="w-full flex items-center justify-between px-3 py-2 bg-neutral-900/80 rounded-2xl border border-neutral-800 backdrop-blur-md">
        <div className="flex flex-col">
          <span className="text-[10px] font-telemetry tracking-widest text-neutral-400">
            ACTIVE TRANSFORMATION
          </span>
          <span className="text-sm font-scifi font-bold tracking-wider text-emerald-400">
            {alien.name}
          </span>
        </div>

        {/* Timer Gauge */}
        <div className="flex items-center gap-2">
          {masterControl ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-scifi font-bold">
              <Zap className="w-3.5 h-3.5 fill-emerald-400" />
              MASTER
            </div>
          ) : (
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-telemetry font-bold tabular-nums transition-colors ${
                isLowTime
                  ? 'bg-red-950/80 border-red-500 text-red-400 animate-pulse'
                  : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              {timeLeft}s
            </div>
          )}
        </div>
      </div>

      {/* Accelerometer Status Banner */}
      <div className="w-full mt-2 flex items-center justify-between px-3 py-1.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-[11px] font-telemetry text-neutral-300">
        <div className="flex items-center gap-1.5">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="text-neutral-400">MOTION SENSOR:</span>
          <span className="text-emerald-400 font-semibold">
            {sensorActive ? 'ACTIVE (SWING ARM)' : 'READY'}
          </span>
        </div>

        {/* Desktop / Manual Punch Simulator Button */}
        <button
          onClick={() => motionSensor.simulateMotion('punch', 1.4)}
          className="px-2.5 py-0.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-[10px] font-scifi font-bold flex items-center gap-1 active:scale-95 transition-transform"
        >
          <Hand className="w-3 h-3" />
          THROW PUNCH
        </button>
      </div>

      {/* Center Alien Character Display */}
      <div className="relative my-3 flex flex-col items-center justify-center">
        {/* Pulsing energy backdrop */}
        <div
          className="absolute w-52 h-52 rounded-full blur-2xl opacity-40 animate-pulse pointer-events-none"
          style={{ backgroundColor: isLowTime ? '#EF4444' : alien.primaryColor }}
        />

        {/* Alien Vector Character */}
        <motion.div
          animate={
            lastMotionStrike
              ? { scale: [1, 1.15, 1], rotate: [0, -6, 6, 0] }
              : isLowTime
              ? { x: [-3, 3, -3], opacity: [0.7, 1, 0.7] }
              : { y: [-4, 4, -4] }
          }
          transition={{
            repeat: lastMotionStrike ? 0 : Infinity,
            duration: lastMotionStrike ? 0.3 : isLowTime ? 0.3 : 3,
          }}
          className="relative z-10 cursor-pointer"
          onClick={() => {
            motionSensor.simulateMotion('punch', 1.0);
          }}
        >
          <AlienCharacterArt alienId={alien.id} className="w-48 h-48 sm:w-56 sm:h-56" />
        </motion.div>

        {/* Battle Cry Speech Bubble with Voice Trigger */}
        <div className="mt-2 text-center max-w-xs flex items-center justify-center gap-1.5">
          <p
            onClick={() => alienVoiceEngine.playAlienVoice(alien.id)}
            className="text-xs italic font-semibold text-neutral-300 bg-black/60 hover:bg-black/80 hover:text-emerald-300 px-4 py-1.5 rounded-full border border-neutral-800 backdrop-blur-sm cursor-pointer transition-colors flex items-center gap-1.5"
            title="Click to speak alien voice clip"
          >
            <Volume2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            "{alien.battleCry}"
          </p>
        </div>
      </div>

      {/* Signature Alien Power Attack Buttons */}
      <div className="w-full flex flex-col gap-2 my-1">
        <div className="flex items-center justify-between text-[10px] font-telemetry tracking-widest text-neutral-400 uppercase px-1">
          <span>Physical Strike Abilities</span>
          <span className="text-emerald-500 font-semibold">MOTION LINKED</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {alien.powers.map((power, idx) => {
            const onCooldown = attackCooldowns[power.name];
            return (
              <button
                key={power.name}
                onClick={() => handleUsePower(power, idx)}
                disabled={onCooldown}
                className={`relative px-3 py-2.5 rounded-xl border text-left flex flex-col justify-between transition-all active:scale-95 overflow-hidden ${
                  onCooldown
                    ? 'bg-neutral-900/50 border-neutral-800 text-neutral-500 cursor-not-allowed'
                    : 'bg-neutral-900 hover:bg-neutral-800 border-emerald-500/40 text-white shadow-lg'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-xs font-scifi font-bold tracking-wide truncate text-emerald-300">
                    {power.name}
                  </span>
                  <Flame className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] text-neutral-400 line-clamp-1">
                    {power.description}
                  </span>
                  <span className="text-[9px] font-telemetry text-emerald-400 ml-1 shrink-0 font-bold">
                    {idx === 0 ? 'PUNCH' : 'SLAM'}
                  </span>
                </div>

                {/* Cooldown progress shimmer */}
                {onCooldown && (
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: power.cooldownMs / 1000, ease: 'linear' }}
                    className="absolute bottom-0 left-0 h-1 bg-emerald-500/50"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Manual De-transform Action / Hit Omnitrix Symbol */}
      <div className="w-full flex items-center justify-center pt-2">
        <button
          onClick={onDetransform}
          className="group flex items-center gap-2 px-6 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-scifi tracking-wider transition-all active:scale-95"
        >
          <div className="w-4 h-4 rounded-full overflow-hidden">
            <OmnitrixSymbol size={16} state="green" />
          </div>
          HIT BADGE TO DE-TRANSFORM
        </button>
      </div>
    </div>
  );
};
