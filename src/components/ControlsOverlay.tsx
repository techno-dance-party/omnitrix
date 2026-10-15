import React, { useState } from 'react';
import { CLASSIC_ALIENS } from '../data/aliens';
import { AlienSilhouetteIcon } from './AlienGraphics';
import {
  Volume2,
  VolumeX,
  Vibrate,
  VibrateOff,
  Maximize2,
  Minimize2,
  Zap,
  HelpCircle,
  X,
  Layers,
  QrCode,
  Copy,
  Check,
  ExternalLink,
  Watch,
} from 'lucide-react';

interface ControlsOverlayProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  hapticsEnabled: boolean;
  onToggleHaptics: () => void;
  isFullscreenDial: boolean;
  onToggleFullscreen: () => void;
  masterControl: boolean;
  onToggleMasterControl: () => void;
  selectedAlienIndex: number;
  onSelectAlien: (index: number) => void;
  watchState: string;
}

export const ControlsOverlay: React.FC<ControlsOverlayProps> = ({
  soundEnabled,
  onToggleSound,
  hapticsEnabled,
  onToggleHaptics,
  isFullscreenDial,
  onToggleFullscreen,
  masterControl,
  onToggleMasterControl,
  selectedAlienIndex,
  onSelectAlien,
  watchState,
}) => {
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [showRoster, setShowRoster] = useState<boolean>(false);
  const [showWatchSetup, setShowWatchSetup] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedManifest, setCopiedManifest] = useState<boolean>(false);

  const watchUrl = 'https://ais-pre-orryqt6krqactu64xfltuh-307902310699.europe-west1.run.app';

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(watchUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyManifest = () => {
    const manifestJson = {
      id: "/",
      name: "Omnitrix Alien Watch",
      short_name: "Omnitrix",
      description: "Tactile cartoon alien watch emulator for Pixel Watch and wearable screens",
      start_url: watchUrl,
      scope: "/",
      display: "standalone",
      orientation: "portrait",
      background_color: "#000000",
      theme_color: "#00FF66",
      icons: [
        {
          src: `${watchUrl}/icon-192.png`,
          sizes: "192x192",
          type: "image/png",
          purpose: "any"
        },
        {
          src: `${watchUrl}/icon-512.png`,
          sizes: "512x512",
          type: "image/png",
          purpose: "any"
        },
        {
          src: `${watchUrl}/icon-512.png`,
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable"
        }
      ]
    };
    navigator.clipboard.writeText(JSON.stringify(manifestJson, null, 2));
    setCopiedManifest(true);
    setTimeout(() => setCopiedManifest(false), 2000);
  };

  return (
    <>
      {/* Top Floating Control Bar */}
      <header className="w-full max-w-4xl flex items-center justify-between gap-4 px-6 py-4 z-30">
        {/* Brand Zone: 1 Clean Line */}
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_#39FF14] animate-pulse" />
          <span className="font-scifi text-base sm:text-lg font-black tracking-widest text-white whitespace-nowrap">
            OMNITRIX <span className="text-emerald-400">PIXEL WATCH</span>
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Sound Mute/Unmute */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
            title={soundEnabled ? 'Sound Enabled' : 'Sound Muted'}
            className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-emerald-400 transition-all active:scale-95"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-neutral-500" />}
          </button>

          {/* Haptics Vibration Toggle */}
          <button
            onClick={onToggleHaptics}
            aria-label={hapticsEnabled ? 'Disable Haptics' : 'Enable Haptics'}
            title={hapticsEnabled ? 'Vibration Haptics ON' : 'Haptics OFF'}
            className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-emerald-400 transition-all active:scale-95"
          >
            {hapticsEnabled ? <Vibrate className="w-4 h-4 text-emerald-400" /> : <VibrateOff className="w-4 h-4 text-neutral-500" />}
          </button>

          {/* Display Mode: Watch Frame vs Pure Round Screen */}
          <button
            onClick={onToggleFullscreen}
            aria-label={isFullscreenDial ? 'Show Watch Casing' : 'Show Pure Round Face'}
            title={isFullscreenDial ? 'Switch to Pixel Watch Casing' : 'Switch to Pure Round Watch Face'}
            className={`p-2.5 rounded-xl border transition-all active:scale-95 flex items-center gap-1.5 text-xs font-semibold ${
              isFullscreenDial
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-300'
            }`}
          >
            {isFullscreenDial ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="hidden sm:inline">
              {isFullscreenDial ? 'Case Mode' : 'Round Face'}
            </span>
          </button>

          {/* Master Control Toggle */}
          <button
            onClick={onToggleMasterControl}
            aria-label="Toggle Master Control"
            title="Master Control (No recharge cooldown, unlimited transformation)"
            className={`p-2.5 rounded-xl border transition-all active:scale-95 flex items-center gap-1.5 text-xs font-scifi font-bold ${
              masterControl
                ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_15px_rgba(57,255,20,0.8)]'
                : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-neutral-400'
            }`}
          >
            <Zap className={`w-4 h-4 ${masterControl ? 'fill-black' : ''}`} />
            <span className="hidden md:inline">Master Control</span>
          </button>

          {/* Quick Roster Drawer Toggle */}
          <button
            onClick={() => setShowRoster(true)}
            aria-label="Open Alien Roster"
            title="Browse all 10 Aliens"
            className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-emerald-400 transition-all active:scale-95 flex items-center gap-1.5 text-xs font-semibold"
          >
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">10 Aliens</span>
          </button>

          {/* Send to Pixel Watch Button */}
          <button
            onClick={() => setShowWatchSetup(true)}
            aria-label="Send to Pixel Watch"
            title="Install or Open on Pixel Watch"
            className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-emerald-500/40 text-emerald-300 hover:text-emerald-200 transition-all active:scale-95 flex items-center gap-1.5 text-xs font-semibold shadow-[0_0_10px_rgba(57,255,20,0.2)]"
          >
            <Watch className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Pixel Watch</span>
          </button>

          {/* Help & Instructions Modal */}
          <button
            onClick={() => setShowHelp(true)}
            aria-label="How to Play"
            title="Instructions"
            className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-emerald-400 transition-all active:scale-95"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Quick Alien Roster Drawer Modal */}
      {showRoster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl bg-neutral-950 border border-neutral-800 rounded-3xl p-6 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div>
                <h3 className="font-scifi font-bold text-lg text-emerald-400">
                  ORIGINAL 10 ALIEN ROSTER
                </h3>
                <p className="text-xs text-neutral-400">
                  Select any extraterrestrial form to instantly load it onto the dial
                </p>
              </div>
              <button
                onClick={() => setShowRoster(false)}
                className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 overflow-y-auto py-4 pr-1">
              {CLASSIC_ALIENS.map((alien, idx) => {
                const isSelected = idx === selectedAlienIndex;
                return (
                  <button
                    key={alien.id}
                    onClick={() => {
                      onSelectAlien(idx);
                      setShowRoster(false);
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-emerald-950/90 border-emerald-400 shadow-[0_0_15px_rgba(57,255,20,0.5)]'
                        : 'bg-neutral-900 hover:bg-neutral-800/80 border-neutral-800 text-neutral-300'
                    }`}
                  >
                    <div className="w-16 h-16 flex items-center justify-center text-emerald-400 mb-2">
                      <AlienSilhouetteIcon alienId={alien.id} className="w-14 h-14" />
                    </div>
                    <span className="text-xs font-scifi font-bold tracking-wider truncate w-full text-white">
                      {alien.name}
                    </span>
                    <span className="text-[10px] text-neutral-400 truncate w-full mt-0.5">
                      {alien.species}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Instructions Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="font-scifi font-bold text-lg text-emerald-400 flex items-center gap-2">
                <Zap className="w-5 h-5 fill-emerald-400" />
                HOW TO OPERATE THE WATCH
              </h3>
              <button
                onClick={() => setShowHelp(false)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-4 py-4 text-sm text-neutral-300">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-white">Pop the Core</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Tap the glowing Omnitrix watch face or the digital crown knob to mechanically raise the dial core.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-white">Choose Your Alien</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Drag around the circular bezel ring, swipe left/right, scroll your mouse wheel, or turn the crown buttons to cycle through the 10 aliens.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-white">Prime the Actuator</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Tap the center holographic silhouette to arm the energy matrix with an audible hum and haptic pulse.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-white">Slam to Transform!</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Slap the raised core button down to initiate the explosive full-screen transformation sequence, DNA animation, and voice shout!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  5
                </div>
                <div>
                  <h4 className="font-semibold text-white">Punch & Move to Battle!</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Swing your arm, throw a punch, or shake your wrist to trigger kinetic battle sounds and elemental projectile attacks via the device accelerometer!
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowHelp(false)}
              className="w-full mt-2 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-scifi font-bold text-xs tracking-wider transition-all"
            >
              GOT IT, HERO!
            </button>
          </div>
        </div>
      )}

      {/* Pixel Watch Setup & QR Code Modal */}
      {showWatchSetup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Watch className="w-5 h-5 text-emerald-400" />
                <h3 className="font-scifi font-bold text-base sm:text-lg text-emerald-400">
                  PIXEL WATCH INSTALL & PLAY
                </h3>
              </div>
              <button
                onClick={() => setShowWatchSetup(false)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* QR Code & Direct Link */}
            <div className="flex flex-col sm:flex-row items-center gap-5 my-4 p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800">
              <div className="relative w-36 h-36 shrink-0 rounded-xl bg-black p-2 border-2 border-emerald-500/50 shadow-[0_0_20px_rgba(57,255,20,0.3)] flex items-center justify-center">
                <img
                  src="/watch-qr.svg"
                  alt="Scan to open on Pixel Watch"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex flex-col justify-between flex-1 gap-2 text-center sm:text-left">
                <div>
                  <span className="text-xs font-scifi font-bold text-white tracking-wide">
                    SCAN WITH PHONE / WATCH
                  </span>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Scan with your phone camera or watch browser to load instantly with zero Java or setup.
                  </p>
                </div>

                {/* Copy Link & Copy Manifest Buttons */}
                <div className="flex flex-col gap-2 mt-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={watchUrl}
                      className="w-full bg-black/80 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-[10px] font-telemetry text-emerald-300 truncate select-all"
                    />
                    <button
                      onClick={handleCopyUrl}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold font-scifi flex items-center gap-1 shrink-0 active:scale-95 transition-transform"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'COPIED' : 'COPY LINK'}
                    </button>
                  </div>

                  <button
                    onClick={handleCopyManifest}
                    className="w-full py-1.5 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 hover:text-white text-[11px] font-telemetry font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                  >
                    {copiedManifest ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedManifest ? 'MANIFEST JSON COPIED!' : 'COPY MANIFEST.JSON'}
                  </button>
                </div>
              </div>
            </div>

            {/* Methods Breakdown */}
            <div className="flex flex-col gap-3 text-xs text-neutral-300">
              {/* Method 1 */}
              <div className="p-3 rounded-xl bg-neutral-900/50 border border-emerald-500/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-scifi font-bold text-emerald-400">
                    METHOD 1: WEAR OS BROWSER (NO JAVA REQUIRED)
                  </span>
                  <span className="text-[10px] font-telemetry text-neutral-400 font-semibold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40">
                    RECOMMENDED · 2 MINS
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  1. On your Pixel Watch, open the <strong>Google Play Store</strong>.<br />
                  2. Search for and install <strong>Samsung Internet</strong> (official Wear OS browser).<br />
                  3. Open the browser on your watch, enter the copied URL, and tap <strong>"Add to Home Screen"</strong>.<br />
                  4. The watch dial fills the entire circular screen with full accelerometer and haptic vibration support!
                </p>
              </div>

              {/* Method 2 */}
              <div className="p-3 rounded-xl bg-neutral-900/50 border border-neutral-800">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-scifi font-bold text-white">
                    METHOD 2: 1-CLICK CLOUD APK (NO JDK / ZERO JAVA)
                  </span>
                  <span className="text-[10px] font-telemetry text-neutral-400">PWABUILDER</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Instead of struggling with local JDK/Gradle version conflicts, use Microsoft's open-source <strong>PWABuilder</strong> cloud compiler:
                  <br />
                  1. Go to <a href="https://www.pwabuilder.com" target="_blank" rel="noreferrer" className="text-emerald-400 underline font-semibold">pwabuilder.com</a>.<br />
                  2. Paste this app's URL and click <strong>"Package for Android"</strong>.<br />
                  3. Download the signed APK directly in your browser without installing JDK 17.<br />
                  4. Sideload to your Pixel Watch using <code>adb install</code> over Wireless Debugging.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowWatchSetup(false)}
              className="w-full mt-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-scifi font-bold text-xs tracking-wider transition-all"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
};
