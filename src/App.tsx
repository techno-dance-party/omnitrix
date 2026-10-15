/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { WatchFace } from './components/WatchFace';
import { PixelWatchFrame } from './components/PixelWatchFrame';
import { TransformationModal } from './components/TransformationModal';
import { AlienBattleView } from './components/AlienBattleView';
import { RechargeView } from './components/RechargeView';
import { ControlsOverlay } from './components/ControlsOverlay';
import { CLASSIC_ALIENS } from './data/aliens';
import { soundEngine } from './services/soundEngine';
import { alienVoiceEngine } from './services/alienVoice';
import { haptics } from './services/haptics';

export default function App() {
  const [watchState, setWatchState] = useState<
    'standby' | 'popped' | 'transforming' | 'active' | 'recharging'
  >('standby');
  const [selectedAlienIndex, setSelectedAlienIndex] = useState<number>(0);
  const [isFullscreenDial, setIsFullscreenDial] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [hapticsEnabled, setHapticsEnabled] = useState<boolean>(true);
  const [masterControl, setMasterControl] = useState<boolean>(false);

  const currentAlien = CLASSIC_ALIENS[selectedAlienIndex];

  // Toggle Sound
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEngine.setMuted(!next);
    alienVoiceEngine.setMuted(!next);
    if (next) soundEngine.playClick();
  };

  // Toggle Haptics
  const handleToggleHaptics = () => {
    const next = !hapticsEnabled;
    setHapticsEnabled(next);
    haptics.setEnabled(next);
    if (next) haptics.tick();
  };

  // Toggle Display Mode
  const handleToggleFullscreen = () => {
    setIsFullscreenDial((prev) => !prev);
    soundEngine.playClick();
  };

  // Toggle Master Control
  const handleToggleMasterControl = () => {
    setMasterControl((prev) => !prev);
    soundEngine.playClick();
    haptics.tick();
  };

  // Pop Up Watch Face
  const handlePopUp = useCallback(() => {
    setWatchState('popped');
  }, []);

  // Initiate Transformation
  const handleInitiateTransformation = useCallback((index: number) => {
    setSelectedAlienIndex(index);
    setWatchState('transforming');
    soundEngine.playTransformSequence();
    haptics.transformSequence();
  }, []);

  // Complete Transformation Animation
  const handleCompleteTransformation = useCallback(() => {
    setWatchState('active');
  }, []);

  // Detransform or timeout
  const handleDetransform = useCallback(() => {
    soundEngine.playClick();
    if (masterControl) {
      setWatchState('standby');
    } else {
      setWatchState('recharging');
    }
  }, [masterControl]);

  // Handle Timeout from battle
  const handleTimeout = useCallback(() => {
    setWatchState('recharging');
  }, []);

  // Recharge complete
  const handleRecharged = useCallback(() => {
    setWatchState('standby');
    soundEngine.playClick();
    haptics.popUp();
  }, []);

  // Digital Crown Rotation
  const handleRotateCrown = useCallback(
    (delta: number) => {
      if (watchState === 'standby') {
        soundEngine.playPopUp();
        haptics.popUp();
        setWatchState('popped');
        return;
      }
      if (watchState === 'popped') {
        const total = CLASSIC_ALIENS.length;
        const nextIndex = (selectedAlienIndex + delta + total) % total;
        setSelectedAlienIndex(nextIndex);
        soundEngine.playBezelTick(1.0 + (nextIndex / total) * 0.4);
        haptics.tick();
      }
    },
    [watchState, selectedAlienIndex]
  );

  // Digital Crown Press
  const handlePressCrown = useCallback(() => {
    if (watchState === 'standby') {
      soundEngine.playPopUp();
      haptics.popUp();
      setWatchState('popped');
    } else if (watchState === 'popped') {
      handleInitiateTransformation(selectedAlienIndex);
    } else if (watchState === 'active') {
      handleDetransform();
    } else if (watchState === 'recharging') {
      handleRecharged();
    }
  }, [
    watchState,
    selectedAlienIndex,
    handleInitiateTransformation,
    handleDetransform,
    handleRecharged,
  ]);

  return (
    <div className="relative min-h-screen w-full bg-neutral-950 text-white flex flex-col items-center justify-between overflow-x-hidden selection:bg-emerald-500 selection:text-black">
      {/* Dynamic Galactic Background Ambiance */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="w-full h-full opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 50% 20%, rgba(16, 185, 129, 0.25), transparent 60%), radial-gradient(circle at 80% 80%, rgba(5, 150, 105, 0.15), transparent 50%)',
          }}
        />
        {/* Subtle high-tech hex grid lines */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #39FF14 1px, transparent 1px), linear-gradient(to bottom, #39FF14 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Top Controls Overlay */}
      <ControlsOverlay
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        hapticsEnabled={hapticsEnabled}
        onToggleHaptics={handleToggleHaptics}
        isFullscreenDial={isFullscreenDial}
        onToggleFullscreen={handleToggleFullscreen}
        masterControl={masterControl}
        onToggleMasterControl={handleToggleMasterControl}
        selectedAlienIndex={selectedAlienIndex}
        onSelectAlien={(idx) => {
          setSelectedAlienIndex(idx);
          if (watchState === 'standby') {
            soundEngine.playPopUp();
            haptics.popUp();
            setWatchState('popped');
          } else {
            soundEngine.playBezelTick(1.2);
            haptics.tick();
          }
        }}
        watchState={watchState}
      />

      {/* Center Stage: Watch Emulator / Display */}
      <main className="relative z-10 flex flex-col items-center justify-center my-auto p-2 w-full max-w-4xl">
        {/* Standby & Popped Selection Dial */}
        {(watchState === 'standby' || watchState === 'popped') && (
          <PixelWatchFrame
            isFullscreen={isFullscreenDial}
            onRotateCrown={handleRotateCrown}
            onPressCrown={handlePressCrown}
            watchState={watchState}
          >
            <WatchFace
              watchState={watchState}
              onPopUp={handlePopUp}
              onInitiateTransformation={handleInitiateTransformation}
              selectedIndex={selectedAlienIndex}
              onSelectIndex={setSelectedAlienIndex}
              masterControl={masterControl}
            />
          </PixelWatchFrame>
        )}

        {/* Active Alien Battle View */}
        {watchState === 'active' && (
          <div className="relative flex flex-col items-center justify-center">
            <AlienBattleView
              alien={currentAlien}
              masterControl={masterControl}
              onDetransform={handleDetransform}
              onTimeout={handleTimeout}
            />
          </div>
        )}

        {/* Recharge Timeout Cooldown View */}
        {watchState === 'recharging' && (
          <div className="relative flex flex-col items-center justify-center">
            <RechargeView onRecharged={handleRecharged} />
          </div>
        )}
      </main>

      {/* Full-Screen Transformation Cinematic Overlay */}
      {watchState === 'transforming' && (
        <TransformationModal
          alien={currentAlien}
          onComplete={handleCompleteTransformation}
        />
      )}

      {/* Bottom Footer Telemetry */}
      <footer className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-2 px-6 py-4 z-20 text-[11px] font-telemetry text-neutral-500 border-t border-neutral-900/80">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-semibold">STATUS:</span>
          <span className="uppercase text-neutral-300">
            {watchState === 'standby' && 'OMNITRIX STANDBY · READY'}
            {watchState === 'popped' && 'CORE POPPED · SELECTING FORM'}
            {watchState === 'transforming' && 'TRANSFORMATION IN PROGRESS'}
            {watchState === 'active' && `EXTRATERRESTRIAL ENGAGED · ${currentAlien.name}`}
            {watchState === 'recharging' && 'DISCHARGED · RECHARGING COOLDOWN'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span>PIXEL WATCH 3 WEARABLE EMULATION</span>
          <span>·</span>
          <span className="text-neutral-400">10 CLASSIC ALIENS</span>
        </div>
      </footer>
    </div>
  );
}
