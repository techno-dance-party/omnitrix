/**
 * Kinetic Motion & Accelerometer Service for Omnitrix Alien Watch
 * Detects real physical wrist swings, punches, and arm movements via DeviceMotionEvent,
 * with fallbacks and simulated gestures for desktop testing.
 */

export type MotionStrikeType = 'punch' | 'slam' | 'shake';

export type MotionCallback = (type: MotionStrikeType, intensity: number) => void;

class MotionSensorService {
  private isListening: boolean = false;
  private isSupported: boolean = false;
  private permissionGranted: boolean = false;
  private lastX: number = 0;
  private lastY: number = 0;
  private lastZ: number = 0;
  private lastTriggerTime: number = 0;
  private listeners: Set<MotionCallback> = new Set();
  private currentMagnitude: number = 0;
  private sensitivity: number = 16; // Threshold in m/s^2

  constructor() {
    if (typeof window !== 'undefined' && 'DeviceMotionEvent' in window) {
      this.isSupported = true;
    }
  }

  public subscribe(cb: MotionCallback): () => void {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  public getCurrentMagnitude(): number {
    return this.currentMagnitude;
  }

  public setSensitivity(thresh: number) {
    this.sensitivity = thresh;
  }

  public getSensitivity(): number {
    return this.sensitivity;
  }

  public getIsSupported(): boolean {
    return this.isSupported;
  }

  /**
   * Request permission for iOS/WearOS if required, and start listener
   */
  public async start(): Promise<boolean> {
    if (this.isListening) return true;

    if (
      typeof window !== 'undefined' &&
      typeof (DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function'
    ) {
      try {
        const response = await (
          DeviceMotionEvent as unknown as { requestPermission: () => Promise<string> }
        ).requestPermission();
        if (response === 'granted') {
          this.permissionGranted = true;
        } else {
          return false;
        }
      } catch {
        return false;
      }
    } else {
      this.permissionGranted = true;
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('devicemotion', this.handleDeviceMotion, { passive: true });
      this.isListening = true;
      return true;
    }

    return false;
  }

  public stop() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('devicemotion', this.handleDeviceMotion);
    }
    this.isListening = false;
  }

  private handleDeviceMotion = (e: DeviceMotionEvent) => {
    const acc = e.acceleration || e.accelerationIncludingGravity;
    if (!acc || acc.x === null || acc.y === null || acc.z === null) return;

    const x = acc.x || 0;
    const y = acc.y || 0;
    const z = acc.z || 0;

    // Delta acceleration between frames (detects sudden jerk / strike)
    const deltaX = Math.abs(x - this.lastX);
    const deltaY = Math.abs(y - this.lastY);
    const deltaZ = Math.abs(z - this.lastZ);

    const totalMagnitude = Math.sqrt(x * x + y * y + z * z);
    const jerk = deltaX + deltaY + deltaZ;

    this.currentMagnitude = totalMagnitude;
    this.lastX = x;
    this.lastY = y;
    this.lastZ = z;

    const now = Date.now();
    // Debounce strikes by at least 450ms
    if (now - this.lastTriggerTime < 450) return;

    // Trigger strike if jerk exceeds threshold
    if (jerk > this.sensitivity || totalMagnitude > this.sensitivity * 1.3) {
      this.lastTriggerTime = now;

      // Classify motion:
      // Strong vertical jerk (Y) -> Slam
      // Strong forward/depth jerk (Z or X) -> Punch
      let type: MotionStrikeType = 'punch';
      if (deltaY > deltaX && deltaY > deltaZ) {
        type = 'slam';
      } else if (Math.abs(deltaX - deltaY) < 4 && jerk > this.sensitivity * 1.5) {
        type = 'shake';
      }

      this.listeners.forEach((cb) => cb(type, Math.min(jerk / 30, 1.5)));
    }
  };

  /**
   * Manually simulate motion on desktop / emulator
   */
  public simulateMotion(type: MotionStrikeType = 'punch', intensity: number = 1.0) {
    const now = Date.now();
    if (now - this.lastTriggerTime < 300) return;
    this.lastTriggerTime = now;
    this.currentMagnitude = this.sensitivity * intensity;
    this.listeners.forEach((cb) => cb(type, intensity));
  }
}

export const motionSensor = new MotionSensorService();
