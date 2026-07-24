import "@/active-beacons";
import "@/beacons-table";
import "@/app-header";
import "@/pages/error-page";
import "@/pages/home-page";

import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { Router } from "@lit-labs/router";

@customElement("app-root")
export class AppRoot extends LitElement {
  private _router = new Router(this, [
    {
      path: "/",
      render: () => html`<home-page></home-page>`,
    },
    {
      path: "/*",
      render: () => html`<error-page></error-page>`,
    },
  ]);

  render() {
    return html` <div class="app-root">
      <app-header></app-header>
      ${this._router.outlet()}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-root": AppRoot;
  }
}
