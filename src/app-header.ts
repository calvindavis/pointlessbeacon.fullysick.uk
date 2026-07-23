import { LitElement, css, html } from "lit";
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

  static styles = css`
    h1 {
      font-size: 2.5rem;
      font-weight: inherit;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "app-header": AppHeader;
  }
}
