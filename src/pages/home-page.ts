import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { loadUser } from "@/services/userService";
import { formatRandomGreeting } from "@/services/greetingService";

@customElement("home-page")
export class HomePage extends LitElement {
  render() {
    const user = loadUser();

    return html`
      <h2>${formatRandomGreeting(user.name)}</h2>
      <pre>${JSON.stringify(user, undefined, 4)}</pre>
    `;
  }

  static styles = css`
    h2 {
      font-weight: inherit;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "home-page": HomePage;
  }
}
