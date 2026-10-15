/**
 * Haptic Vibration Service for Omnitrix Alien Watch
 * Uses browser Vibration API when supported on mobile and wearable touchscreens.
 */

class HapticsService {
  private isEnabled: boolean = true;

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  public getEnabled(): boolean {
    return this.isEnabled;
  }

  private vibrate(pattern: number | number[]) {
    if (!this.isEnabled) return;
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(pattern);
      }
    } catch {
      // safe fallback if unsupported
    }
  }

  /**
   * Crisp micro pulse when bezel ratchets to next alien silhouette
   */
  public tick() {
    this.vibrate(18);
  }

  /**
   * Pneumatic release double-pulse when core pops up
   */
  public popUp() {
    this.vibrate([35, 40, 55]);
  }

  /**
   * Rhythmic high-voltage vibration while core is primed
   */
  public prime() {
    this.vibrate([25, 30, 35, 30, 45]);
  }

  /**
   * Heavy mechanical slam impact
   */
  public slam() {
    this.vibrate([140, 60, 200]);
  }

  /**
   * Cinematic transformation shockwave pulses
   */
  public transformSequence() {
    this.vibrate([90, 40, 130, 50, 160, 60, 300]);
  }

  /**
   * Alien power attack vibration
   */
  public attack() {
    this.vibrate([70, 30, 90]);
  }

  /**
   * Urgent timeout warning pulse
   */
  public timeoutWarning() {
    this.vibrate([80, 80, 80]);
  }

  /**
   * Recharge discharge shutdown pulse
   */
  public rechargeShutdown() {
    this.vibrate([200, 100, 150]);
  }
}

export const haptics = new HapticsService();
