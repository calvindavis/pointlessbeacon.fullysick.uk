import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("error-page")
export class ErrorPage extends LitElement {
  render() {
    return html`<h2>Are you lost, traveller?</h2>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "error-page": ErrorPage;
  }
}
