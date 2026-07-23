import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { Task } from "@lit/task";

@customElement("home-page")
export class HomePage extends LitElement {
  render() {
    return html`<h2>Home</h2>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "home-page": HomePage;
  }
}
