import { Injectable } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Injectable({
  providedIn: 'root',
})
export class LiveAnnouncerService {
  constructor(private liveAnnouncer: LiveAnnouncer) {}

  /**
   * Announces a polite message to the user.
   * @param message The message to be announced.
   */
  announcePolite(message: string): void {
    this.liveAnnouncer.announce(message, 'polite');
  }

  /**
   * Announces an assertive message to the user.
   * @param message The message to be announced.
   */
  announceAssertive(message: string): void {
    this.liveAnnouncer.announce(message, 'assertive');
  }
}
