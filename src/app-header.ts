import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("app-header")
export class AppHeader extends LitElement {
  render() {
    return html`
      <header>
        <h1>Pointless Beacon</h1>
      </header>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-header": AppHeader;
  }
}
