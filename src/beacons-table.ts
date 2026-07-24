import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { User } from "./types/User";
import { repeat } from "lit/directives/repeat.js";

@customElement("beacons-table")
export class BeaconsTable extends LitElement {
  @property({ type: Array })
  private beacons: User[] = [];

  render() {
    return html`
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Location</th>
            <th>Using mic?</th>
            <th>Beacon expires</th>
          </tr>
        </thead>
        <tbody>
          ${repeat(
            this.beacons,
            (user) => user.id,
            (user) =>
              html`<tr>
                <td>${user.name}</td>
                <td>${user.level}</td>
                <td>${user.location}</td>
                <td>${user.using_mic ? "🎤" : "👂"}</td>
                <td>${user.beacon_expires_at}</td>
              </tr>`,
          )}
        </tbody>
      </table>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "beacons-table": BeaconsTable;
  }
}
