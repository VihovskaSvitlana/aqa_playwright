import { Locator, type Page } from "@playwright/test";

export class GaragePage {
  private page: Page;
  readonly _garageTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this._garageTable = this.page.locator("app-garage");
  }
  get garageTable() {
    return this._garageTable;
  }
}
