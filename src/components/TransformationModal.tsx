import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Alien } from '../types/alien';
import { AlienCharacterArt } from './AlienGraphics';
import { alienVoiceEngine, ALIEN_VOICE_CONFIGS } from '../services/alienVoice';
import { Zap, Sparkles, Volume2 } from 'lucide-react';

interface TransformationModalProps {
  alien: Alien;
  onComplete: () => void;
}

export const TransformationModal: React.FC<TransformationModalProps> = ({ alien, onComplete }) => {
  const [stage, setStage] = useState<'impact' | 'flash' | 'dna' | 'reveal'>('impact');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    // Stage 1: Impact shockwave (0 - 450ms)
    const t1 = setTimeout(() => {
      setStage('flash');
    }, 450);

    // Stage 2: Blinding green flash & DNA surge (450ms - 1000ms)
    const t2 = setTimeout(() => {
      setStage('dna');
    }, 950);

    // Stage 3: Alien hero reveal & voice clip trigger (1600ms)
    const t3 = setTimeout(() => {
      setStage('reveal');
      setIsSpeaking(true);
      alienVoiceEngine.playAlienVoice(alien.id, () => {
        setIsSpeaking(false);
      });
    }, 1600);

    // Stage 4: Auto transition to battle mode after full cinematic (4.6s total)
    const t4 = setTimeout(() => {
      onComplete();
    }, 4800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [alien.id, onComplete]);

  const handleReplayVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSpeaking(true);
    alienVoiceEngine.playAlienVoice(alien.id, () => {
      setIsSpeaking(false);
    });
  };

  const voiceConfig = ALIEN_VOICE_CONFIGS[alien.id];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 overflow-hidden select-none">
      {/* Dynamic Screen Shake on initial slam impact */}
      <motion.div
        animate={
          stage === 'impact'
            ? {
                x: [-14, 16, -12, 12, -6, 6, 0],
                y: [-12, 14, -10, 10, -4, 4, 0],
              }
            : {}
        }
        transition={{ duration: 0.45 }}
        className="relative w-full h-full flex flex-col items-center justify-center"
      >
        {/* Shockwave Rings */}
        <AnimatePresence>
          {stage === 'impact' && (
            <>
              <motion.div
                initial={{ scale: 0.2, opacity: 1 }}
                animate={{ scale: 3.5, opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute w-64 h-64 rounded-full border-4 border-emerald-400 shadow-[0_0_50px_#39FF14]"
              />
              <motion.div
                initial={{ scale: 0.1, opacity: 1 }}
                animate={{ scale: 2.8, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                className="absolute w-64 h-64 rounded-full border-2 border-emerald-300 shadow-[0_0_30px_#10B981]"
              />
            </>
          )}
        </AnimatePresence>

        {/* Blinding Green Flash Overlay */}
        <AnimatePresence>
          {stage === 'flash' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.85] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-emerald-400 flex items-center justify-center z-40"
            >
              {/* Radial light rays */}
              <div
                className="w-full h-full animate-spin"
                style={{
                  background:
                    'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.4) 0deg 15deg, transparent 15deg 30deg)',
                  animationDuration: '6s',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* DNA Cellular Matrix Stream */}
        {(stage === 'dna' || stage === 'reveal') && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="w-full h-full opacity-25"
              style={{
                backgroundImage:
                  'radial-gradient(circle, #39FF14 1px, transparent 1px), linear-gradient(to right, rgba(57,255,20,0.1) 1px, transparent 1px)',
                backgroundSize: '32px 32px, 64px 64px',
              }}
            />
            {/* Animated DNA particles */}
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 50,
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  y: -50,
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.8],
                }}
                transition={{
                  duration: 2.5 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 0.8,
                }}
                className="absolute w-3 h-3 rounded-full bg-emerald-300 shadow-[0_0_12px_#39FF14]"
              />
            ))}
          </div>
        )}

        {/* Alien Character Climax Reveal */}
        <AnimatePresence>
          {stage === 'reveal' && (
            <motion.div
              initial={{ scale: 0.2, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 14, stiffness: 180 }}
              className="relative flex flex-col items-center justify-center p-6 z-30 max-w-md w-full"
            >
              {/* Massive Glowing Backdrop Halo */}
              <div className="absolute -inset-8 rounded-full bg-gradient-to-t from-emerald-500/30 via-emerald-400/20 to-transparent blur-3xl animate-pulse" />

              {/* Alien Artwork with authentic cartoon likeness */}
              <AlienCharacterArt alienId={alien.id} className="w-64 h-64 sm:w-72 sm:h-72 my-1" />

              {/* Transformation Title & Battle Cry */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center mt-2"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
                  <span className="text-xs font-telemetry tracking-widest text-emerald-400 font-bold uppercase">
                    TRANSFORMATION COMPLETE
                  </span>
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
                </div>

                <h1 className="text-3xl sm:text-4xl font-scifi font-black tracking-widest text-white drop-shadow-[0_0_20px_rgba(57,255,20,0.9)]">
                  {alien.name}
                </h1>

                {/* Spoken Voice Clip Bubble with Replay button */}
                <div className="mt-2.5 flex items-center justify-center gap-2">
                  <div
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold backdrop-blur-md transition-all ${
                      isSpeaking
                        ? 'bg-emerald-950/90 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(57,255,20,0.6)] animate-pulse'
                        : 'bg-black/70 border-neutral-700 text-neutral-300'
                    }`}
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'text-emerald-400 animate-bounce' : 'text-neutral-400'}`} />
                    <span className="italic">"{voiceConfig?.shout || alien.battleCry}"</span>
                  </div>

                  <button
                    onClick={handleReplayVoice}
                    aria-label="Replay Voice Clip"
                    title="Replay Voice Clip"
                    className="p-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-emerald-400 border border-neutral-700 transition-transform active:scale-90"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="mt-2.5 flex items-center justify-center gap-2 text-xs text-neutral-400 font-telemetry">
                  <span>{alien.species}</span>
                  <span>·</span>
                  <span>{alien.homeworld}</span>
                  <span>·</span>
                  <span className="text-emerald-400 font-semibold">{alien.element}</span>
                </div>
              </motion.div>

              {/* Skip / Enter Battle Action */}
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={onComplete}
                className="mt-5 px-8 py-2.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-black font-scifi font-black text-xs tracking-widest shadow-[0_0_25px_rgba(57,255,20,0.9)] transition-all active:scale-95 flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-black" />
                ENTER BATTLE MODE
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
