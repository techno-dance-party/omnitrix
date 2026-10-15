import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { OmnitrixSymbol } from './AlienGraphics';
import { soundEngine } from '../services/soundEngine';
import { haptics } from '../services/haptics';
import { AlertTriangle, Zap, RotateCcw } from 'lucide-react';

interface RechargeViewProps {
  onRecharged: () => void;
}

export const RechargeView: React.FC<RechargeViewProps> = ({ onRecharged }) => {
  const [cooldown, setCooldown] = useState<number>(10); // 10s recharge timer

  useEffect(() => {
    soundEngine.playRechargeAlarm();
    haptics.rechargeShutdown();

    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Safely trigger onRecharged after state update finishes
  useEffect(() => {
    if (cooldown === 0) {
      onRecharged();
    }
  }, [cooldown, onRecharged]);

  const handleInstantRecharge = () => {
    soundEngine.playClick();
    onRecharged();
  };

  const progressPercent = ((10 - cooldown) / 10) * 100;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative w-full max-w-sm flex flex-col items-center justify-between p-6 z-20 min-h-[420px]"
    >
      {/* Red Warning Header */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 border border-red-500/50 text-red-400 text-xs font-scifi font-bold tracking-widest animate-pulse">
        <AlertTriangle className="w-4 h-4 text-red-400" />
        TIMEOUT · COOLING DOWN
      </div>

      {/* Glowing Crimson Hourglass Emblem */}
      <div className="relative my-auto flex flex-col items-center justify-center">
        <div className="absolute w-44 h-44 rounded-full bg-red-600/20 blur-2xl animate-pulse" />

        <OmnitrixSymbol size={160} state="red" pulsing />

        <div className="mt-4 text-center">
          <h2 className="text-xl font-scifi font-black tracking-widest text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.9)]">
            RECHARGING
          </h2>
          <p className="text-xs text-neutral-400 font-telemetry mt-1">
            Omni-energy replenishment in progress
          </p>
        </div>
      </div>

      {/* Recharge Progress Bar & Instant Override */}
      <div className="w-full flex flex-col items-center gap-3">
        {/* Progress Bar */}
        <div className="w-full bg-neutral-900 rounded-full h-3 p-0.5 border border-red-500/30 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full shadow-[0_0_10px_#EF4444]"
            style={{ width: `${progressPercent}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>

        <div className="flex items-center justify-between w-full text-xs font-telemetry text-neutral-400">
          <span>{cooldown}s REMAINING</span>
          <span className="text-red-400 font-bold">{Math.round(progressPercent)}%</span>
        </div>

        {/* Quick Bypass Button for Instant Fun */}
        <button
          onClick={handleInstantRecharge}
          className="mt-1 flex items-center gap-2 px-5 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white text-xs font-scifi tracking-wider transition-all active:scale-95 shadow-md"
        >
          <Zap className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          BYPASS COOLDOWN (INSTANT READY)
        </button>
      </div>
    </motion.div>
  );
};
