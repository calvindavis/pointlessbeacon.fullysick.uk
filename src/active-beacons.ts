import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import type { User } from "./types/User";
import { getActiveBeacons, subscribeToActiveBeacons } from "./supabase";

@customElement("active-beacons")
export class ActiveBeacons extends LitElement {
  @state()
  private _beacons: User[] = [];

  private async _loadBeacons() {
    this._beacons = await getActiveBeacons();
  }

  private _intervalId: number = 0;

  constructor() {
    super();

    this._loadBeacons();

    subscribeToActiveBeacons(() => {
      this._loadBeacons();
    });

    this._intervalId = setInterval(() => {
      this._loadBeacons();
    }, 10 * 1000);
  }

  disconnectedCallback(): void {
    if (this._intervalId) {
      clearInterval(this._intervalId);
    }
  }

  render() {
    return html`<beacons-table .beacons=${this._beacons}></beacons-table>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "active-beacons": ActiveBeacons;
  }
}
