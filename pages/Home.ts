import { Locator, expect, type Page } from "@playwright/test";

export class HomePage {
  private page: Page;
  readonly signInButton: Locator;
  readonly loginModal: Locator;
  readonly registrationLink: Locator;
  readonly registrationModal: Locator;
  readonly _registerBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = this.page.getByRole("button", { name: "Sign In" });
    this.loginModal = this.page.locator("app-signin-modal");
    this.registrationLink = this.page.getByRole("button", {
      name: "Registration",
    });
    this.registrationModal = page.locator(".modal-title", {
      hasText: "Registration",
    });
    this._registerBtn = page.getByRole("button", { name: "Register" });
  }
  get registerBtn() {
    return this._registerBtn;
  }
  async openRegistrationModal() {
    await this.signInButton.click();
    await this.loginModal.waitFor();
    await this.registrationLink.click();
    await this.registrationModal.waitFor();
    await expect(this.registerBtn).toHaveAttribute("disabled");
  }
}
