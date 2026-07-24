import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import { loadUser, saveUser } from "@/services/userService";
import { formatRandomGreeting } from "@/services/greetingService";
import type { User } from "@/types/User";
import {
  BEACON_DURATION_MS,
  LEVEL_MAX,
  LEVEL_MIN,
  LOCATIONS,
} from "@/constants";
import { lightBeacon } from "@/supabase";

@customElement("home-page")
export class HomePage extends LitElement {
  @state()
  private _user: User = loadUser();

  private _getValue(event: Event) {
    const target = event.target;

    if (target?.type === "number") {
      return Number(target.value);
    }

    if (target?.type === "checkbox") {
      return Boolean(target.checked);
    }

    return target.value as string;
  }

  private _updateUser(patch: Partial<User>) {
    this._user = { ...this._user, ...patch };
    saveUser(this._user);
  }

  private _handleUserUpdate(e: InputEvent) {
    const id = e?.target?.id;
    const value = this._getValue(e);

    this._updateUser({ [id]: value });
  }

  private async _handleUserSubmit(e: SubmitEvent) {
    e.preventDefault();

    const expires = this._user.beacon_expires_at;

    if (expires != undefined) {
      const difference = new Date(expires).getTime() - Date.now();

      if (difference > 0) {
        alert(`Wait ${difference / 1000} seconds`);
        return;
      }
    }

    const updatedUser = await lightBeacon(this._user);

    this._updateUser(updatedUser);
  }

  render() {
    return html`
      <h2>${formatRandomGreeting(this._user.name)}</h2>
      <pre>${JSON.stringify(this._user, undefined, 4)}</pre>

      <form @input=${this._handleUserUpdate} @submit=${this._handleUserSubmit}>
        <label for="name">Name</label>
        <input id="name" type="text" .value=${this._user.name} />

        <label for="level">Level</label>
        <input
          id="level"
          type="number"
          min=${LEVEL_MIN}
          max=${LEVEL_MAX}
          .value=${this._user.level}
        />

        <label for="location">Location</label>
        <select id="location">
          ${repeat(
            LOCATIONS,
            (location) => location,
            (location) =>
              html`<option
                label="${location}"
                .selected=${location === this._user.location}
              >
                ${location}
              </option>`,
          )}
        </select>

        <label for="using_mic">Using mic?</label>
        <input
          id="using_mic"
          type="checkbox"
          .checked=${this._user.using_mic}
        />
        <button type="submit">Light the beacon 🔥</button>
      </form>
    `;
  }

  static styles = css`
    h2 {
      font-weight: inherit;
    }

    form {
      display: grid;
      gap: 10px;
      grid-template-columns: 1fr 1fr;

      button {
        grid-column-span: 2;
      }

      max-width: 500px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "home-page": HomePage;
  }
}
