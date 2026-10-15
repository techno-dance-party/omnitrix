/**
 * Web Audio Procedural Sound Engine for Omnitrix Alien Watch
 * Zero-dependency, zero-latency synthesizer for authentic cartoon sound effects.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private primeOscillator: OscillatorNode | null = null;
  private primeGain: GainNode | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopPrimeHum();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Mechanical ratchet click when rotating the circular dial
   */
  public playBezelTick(pitchMultiplier: number = 1.0) {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      // Click snap oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200 * pitchMultiplier, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.035);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(4.0, now);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);

      // Add tiny noise click
      const bufferSize = ctx.sampleRate * 0.015;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.2, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

      noise.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);
    } catch {
      // AudioContext policy safe fallback
    }
  }

  /**
   * Pneumatic hydraulic release + rising chime when watch core pops up
   */
  public playPopUp() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      // 1. Hydraulic air release hiss (Bandpass Noise)
      const noiseDuration = 0.28;
      const bufferSize = Math.floor(ctx.sampleRate * noiseDuration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(800, now);
      noiseFilter.frequency.exponentialRampToValueAtTime(2800, now + 0.12);
      noiseFilter.frequency.exponentialRampToValueAtTime(400, now + noiseDuration);
      noiseFilter.Q.setValueAtTime(3.5, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.01, now);
      noiseGain.gain.linearRampToValueAtTime(0.35, now + 0.03);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + noiseDuration);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);

      // 2. Rising alien synthesizer chime (Two-tone triad)
      const freqs = [392, 587.33, 783.99, 1046.5]; // G4, D5, G5, C6
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        const startOffset = idx * 0.045;
        osc.frequency.setValueAtTime(freq, now + startOffset);

        gain.gain.setValueAtTime(0.001, now + startOffset);
        gain.gain.linearRampToValueAtTime(0.18, now + startOffset + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + startOffset + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + startOffset);
        osc.stop(now + startOffset + 0.28);
      });
    } catch {}
  }

  /**
   * High-voltage energy priming hum when selecting and readying alien
   */
  public startPrimeHum() {
    if (this.isMuted) return;
    try {
      this.stopPrimeHum();
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(330, now + 0.4);

      // LFO modulation for alien vibration hum
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(18, now);
      lfoGain.gain.setValueAtTime(25, now);
      lfo.connect(osc.frequency);
      lfo.start(now);

      // Lowpass filter to keep it warm and weighty
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.16, now + 0.1);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);

      this.primeOscillator = osc;
      this.primeGain = gain;
    } catch {}
  }

  public stopPrimeHum() {
    try {
      if (this.primeGain && this.ctx) {
        this.primeGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      }
      if (this.primeOscillator) {
        this.primeOscillator.stop(this.ctx ? this.ctx.currentTime + 0.06 : 0);
        this.primeOscillator = null;
      }
    } catch {}
  }

  /**
   * Heavy mechanical slam impact when pressing down the raised dial
   */
  public playSlam() {
    if (this.isMuted) return;
    this.stopPrimeHum();
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      // 1. Sub-bass drop thump
      const sub = ctx.createOscillator();
      const subGain = ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(160, now);
      sub.frequency.exponentialRampToValueAtTime(32, now + 0.35);

      subGain.gain.setValueAtTime(0.8, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      sub.connect(subGain);
      subGain.connect(ctx.destination);
      sub.start(now);
      sub.stop(now + 0.4);

      // 2. Heavy metallic punch
      const punch = ctx.createOscillator();
      const punchGain = ctx.createGain();
      punch.type = 'triangle';
      punch.frequency.setValueAtTime(440, now);
      punch.frequency.exponentialRampToValueAtTime(70, now + 0.15);

      punchGain.gain.setValueAtTime(0.5, now);
      punchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      punch.connect(punchGain);
      punchGain.connect(ctx.destination);
      punch.start(now);
      punch.stop(now + 0.2);

      // 3. Capacitive electrical pop
      const bufferSize = Math.floor(ctx.sampleRate * 0.08);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.15));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      noise.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now);
    } catch {}
  }

  /**
   * The cartoon transformation energy build-up, blast & alien reveal chord
   */
  public playTransformSequence() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      // Phase 1: Rising warp sweep (0s -> 0.7s)
      const sweep = ctx.createOscillator();
      const sweepGain = ctx.createGain();
      sweep.type = 'sawtooth';
      sweep.frequency.setValueAtTime(140, now);
      sweep.frequency.exponentialRampToValueAtTime(1400, now + 0.7);

      const sweepFilter = ctx.createBiquadFilter();
      sweepFilter.type = 'lowpass';
      sweepFilter.frequency.setValueAtTime(400, now);
      sweepFilter.frequency.exponentialRampToValueAtTime(4800, now + 0.7);

      sweepGain.gain.setValueAtTime(0.1, now);
      sweepGain.gain.linearRampToValueAtTime(0.45, now + 0.65);
      sweepGain.gain.exponentialRampToValueAtTime(0.01, now + 0.75);

      sweep.connect(sweepFilter);
      sweepFilter.connect(sweepGain);
      sweepGain.connect(ctx.destination);

      sweep.start(now);
      sweep.stop(now + 0.76);

      // Phase 2: Green flash burst explosion at 0.7s
      const blastTime = now + 0.68;
      const sub = ctx.createOscillator();
      const subGain = ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(220, blastTime);
      sub.frequency.exponentialRampToValueAtTime(36, blastTime + 0.8);

      subGain.gain.setValueAtTime(0.7, blastTime);
      subGain.gain.exponentialRampToValueAtTime(0.001, blastTime + 0.85);

      sub.connect(subGain);
      subGain.connect(ctx.destination);
      sub.start(blastTime);
      sub.stop(blastTime + 0.9);

      // Phase 3: Heroic transformation harmonic resolution (0.9s -> 1.8s)
      const chordTime = blastTime + 0.15;
      const chordFreqs = [261.63, 329.63, 392.0, 523.25, 659.25]; // C major alien triumph
      chordFreqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, chordTime);

        gain.gain.setValueAtTime(0.001, chordTime);
        gain.gain.linearRampToValueAtTime(0.15 / (i + 1), chordTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, chordTime + 1.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(chordTime);
        osc.stop(chordTime + 1.2);
      });
    } catch {}
  }

  /**
   * Sound effect tailored to the alien's signature elemental power
   */
  public playAlienAttack(alienId: string, attackIndex: number = 0) {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      switch (alienId) {
        case 'heatblast': {
          // Roaring fire blast whoosh + sizzle
          const dur = 0.6;
          const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
          const d = buf.getChannelData(0);
          for (let i = 0; i < buf.length; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (buf.length * 0.5));
          const noise = ctx.createBufferSource();
          noise.buffer = buf;
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(600, now);
          filter.frequency.exponentialRampToValueAtTime(2400, now + 0.2);
          filter.frequency.exponentialRampToValueAtTime(300, now + dur);
          const g = ctx.createGain();
          g.gain.setValueAtTime(0.5, now);
          g.gain.exponentialRampToValueAtTime(0.01, now + dur);
          noise.connect(filter);
          filter.connect(g);
          g.connect(ctx.destination);
          noise.start(now);
          break;
        }

        case 'fourarms': {
          // Sonic thunderclap boom
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(240, now);
          osc.frequency.exponentialRampToValueAtTime(45, now + 0.4);
          g.gain.setValueAtTime(0.7, now);
          g.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
          osc.connect(g);
          g.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.5);
          break;
        }

        case 'xlr8': {
          // Mach speed sonic slice
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(2800, now);
          osc.frequency.exponentialRampToValueAtTime(240, now + 0.25);
          g.gain.setValueAtTime(0.4, now);
          g.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
          osc.connect(g);
          g.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.3);
          break;
        }

        case 'diamondhead': {
          // Crystal sharp chimes and shatter
          [1480, 2220, 2960].forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.04);
            g.gain.setValueAtTime(0.3, now + idx * 0.04);
            g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.3);
            osc.connect(g);
            g.connect(ctx.destination);
            osc.start(now + idx * 0.04);
            osc.stop(now + idx * 0.04 + 0.35);
          });
          break;
        }

        case 'upgrade': {
          // Cybernetic laser glitch & pulse
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(600, now);
          osc.frequency.setValueAtTime(1200, now + 0.08);
          osc.frequency.setValueAtTime(450, now + 0.16);
          osc.frequency.setValueAtTime(1800, now + 0.24);
          g.gain.setValueAtTime(0.25, now);
          g.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
          osc.connect(g);
          g.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.38);
          break;
        }

        default: {
          // Default extraterrestrial blast
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(750, now);
          osc.frequency.exponentialRampToValueAtTime(120, now + 0.3);
          g.gain.setValueAtTime(0.4, now);
          g.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
          osc.connect(g);
          g.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.38);
        }
      }
    } catch {}
  }

  /**
   * Cartoon timeout warning beeps (classic urgent two-tone chirp)
   */
  public playTimeoutWarning() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      // Beep 1
      const osc1 = ctx.createOscillator();
      const g1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(987.77, now); // B5
      g1.gain.setValueAtTime(0.3, now);
      g1.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc1.connect(g1);
      g1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.09);

      // Beep 2
      const osc2 = ctx.createOscillator();
      const g2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1318.51, now + 0.1); // E6
      g2.gain.setValueAtTime(0.35, now + 0.1);
      g2.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      osc2.connect(g2);
      g2.connect(ctx.destination);
      osc2.start(now + 0.1);
      osc2.stop(now + 0.19);
    } catch {}
  }

  /**
   * Recharge power-down drain noise
   */
  public playRechargeAlarm() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.5);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(150, now + 0.5);

      g.gain.setValueAtTime(0.3, now);
      g.gain.exponentialRampToValueAtTime(0.01, now + 0.52);

      osc.connect(filter);
      filter.connect(g);
      g.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.55);
    } catch {}
  }

  /**
   * Subtle UI click
   */
  public playClick() {
    if (this.isMuted) return;
    try {
      const ctx = this.initCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.02);
      g.gain.setValueAtTime(0.15, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.03);
    } catch {}
  }
}

export const soundEngine = new SoundEngine();
