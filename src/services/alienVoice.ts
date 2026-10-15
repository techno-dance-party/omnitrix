/**
 * Alien Voice Synthesizer for Omnitrix Pixel Watch
 * Procedurally generates alien-themed voice clips for all 10 classic aliens
 * using Web Speech API with custom pitch, rate, and timbre parameters,
 * layered with Web Audio spectral effects.
 */

import { soundEngine } from './soundEngine';

export interface AlienVoiceConfig {
  shout: string;
  pitch: number;
  rate: number;
  volume: number;
  voiceStyle: 'fiery' | 'giant' | 'speed' | 'crystal' | 'robotic' | 'tiny' | 'aquatic' | 'insect' | 'spectral' | 'beast';
}

export const ALIEN_VOICE_CONFIGS: Record<string, AlienVoiceConfig> = {
  heatblast: {
    shout: 'HEATBLAST! Time to turn up the heat!',
    pitch: 0.65,
    rate: 0.95,
    volume: 1.0,
    voiceStyle: 'fiery',
  },
  fourarms: {
    shout: 'FOUR ARMS! Ready to smash!',
    pitch: 0.35,
    rate: 0.8,
    volume: 1.0,
    voiceStyle: 'giant',
  },
  xlr8: {
    shout: 'X-L-R-8! Too fast for you!',
    pitch: 1.45,
    rate: 1.5,
    volume: 1.0,
    voiceStyle: 'speed',
  },
  diamondhead: {
    shout: 'DIAMONDHEAD! Crystal clear!',
    pitch: 0.8,
    rate: 0.95,
    volume: 1.0,
    voiceStyle: 'crystal',
  },
  upgrade: {
    shout: 'UPGRADE! System reconfiguration complete!',
    pitch: 1.0,
    rate: 1.05,
    volume: 1.0,
    voiceStyle: 'robotic',
  },
  greymatter: {
    shout: 'GREY MATTER! Intellect vastly superior!',
    pitch: 1.95,
    rate: 1.35,
    volume: 1.0,
    voiceStyle: 'tiny',
  },
  ripjaws: {
    shout: 'RIPJAWS! Time to take a bite!',
    pitch: 0.5,
    rate: 0.9,
    volume: 1.0,
    voiceStyle: 'aquatic',
  },
  stinkfly: {
    shout: 'STINKFLY! Coming through!',
    pitch: 1.6,
    rate: 1.25,
    volume: 1.0,
    voiceStyle: 'insect',
  },
  ghostfreak: {
    shout: 'GHOSTFREAK! You cannot escape fear...',
    pitch: 0.45,
    rate: 0.7,
    volume: 1.0,
    voiceStyle: 'spectral',
  },
  wildmutt: {
    shout: 'GRRR-ROAAAR!',
    pitch: 0.3,
    rate: 0.75,
    volume: 1.0,
    voiceStyle: 'beast',
  },
};

class AlienVoiceEngine {
  private isMuted: boolean = false;

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  /**
   * Procedural synthesized guttural roar for Wildmutt (since Wildmutt does not speak English)
   */
  private playWildmuttBeastRoar() {
    if (this.isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // 1. Guttural sub growl
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const g = ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(95, now);
      osc1.frequency.linearRampToValueAtTime(140, now + 0.3);
      osc1.frequency.exponentialRampToValueAtTime(45, now + 1.2);

      osc2.frequency.setValueAtTime(80, now);
      osc2.frequency.linearRampToValueAtTime(120, now + 0.3);
      osc2.frequency.exponentialRampToValueAtTime(40, now + 1.2);

      // Lowpass resonance for beast vocal tract
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(350, now);
      filter.frequency.linearRampToValueAtTime(650, now + 0.4);
      filter.frequency.exponentialRampToValueAtTime(200, now + 1.2);
      filter.Q.setValueAtTime(3.0, now);

      g.gain.setValueAtTime(0.01, now);
      g.gain.linearRampToValueAtTime(0.65, now + 0.15);
      g.gain.exponentialRampToValueAtTime(0.001, now + 1.25);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(g);
      g.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.3);
      osc2.stop(now + 1.3);
    } catch {}
  }

  /**
   * Speak alien voice clip upon transformation completion
   */
  public playAlienVoice(alienId: string, onEnd?: () => void) {
    if (this.isMuted) {
      if (onEnd) onEnd();
      return;
    }

    // Wildmutt is purely animalistic roar
    if (alienId === 'wildmutt') {
      this.playWildmuttBeastRoar();
      if (onEnd) setTimeout(onEnd, 1300);
      return;
    }

    const config = ALIEN_VOICE_CONFIGS[alienId];
    if (!config) {
      if (onEnd) onEnd();
      return;
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(config.shout);
      utterance.pitch = config.pitch;
      utterance.rate = config.rate;
      utterance.volume = config.volume;

      // Select matching voice if available
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        // Find English voice
        const englishVoices = voices.filter((v) => v.lang.startsWith('en'));
        if (config.voiceStyle === 'giant' || config.voiceStyle === 'spectral' || config.voiceStyle === 'fiery') {
          // Prefer deeper or male voice if present
          const deepVoice = englishVoices.find(
            (v) => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('george')
          );
          if (deepVoice) utterance.voice = deepVoice;
        } else if (config.voiceStyle === 'tiny' || config.voiceStyle === 'speed') {
          // Prefer higher/crisp voice
          const highVoice = englishVoices.find(
            (v) => v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('junior') || v.name.toLowerCase().includes('zira')
          );
          if (highVoice) utterance.voice = highVoice;
        } else if (englishVoices.length > 0) {
          utterance.voice = englishVoices[0];
        }
      }

      if (onEnd) {
        utterance.onend = () => onEnd();
        utterance.onerror = () => onEnd();
      }

      // Add vocal synthesizer accompaniment
      soundEngine.playAlienAttack(alienId, 0);

      window.speechSynthesis.speak(utterance);
    } catch {
      if (onEnd) onEnd();
    }
  }
}

export const alienVoiceEngine = new AlienVoiceEngine();
