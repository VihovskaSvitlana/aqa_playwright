import { Locator, type Page } from "@playwright/test";

export class GaragePage {
  private page: Page;
  readonly _garageTable: Locator;
  readonly _addCarBtn: Locator;
  readonly _mileageInput: Locator;
  readonly _addBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this._garageTable = this.page.locator("app-garage");
    this._addCarBtn = this.page.getByRole("button", { name: "Add car" });
    this._mileageInput = this.page.locator("input#addCarMileage");
    this._addBtn = this.page.getByRole("button", { name: "Add" });
  }
  get garageTable() {
    return this._garageTable;
  }
  async openGaragePage() {
    await this.page.goto("/panel/garage");
  }
  async addNewCar() {
    await this._addCarBtn.click();
    await this.page.waitForTimeout(1000);
    await this._mileageInput.fill("100");
    await this._addBtn.click();
    await this.page.waitForSelector("app-add-car-modal", { state: "hidden" });
  }
}
