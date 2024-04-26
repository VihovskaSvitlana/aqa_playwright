import { Locator, expect, type Page } from "@playwright/test";

export class RegistrationModal {
  private page: Page;
  readonly _container: Locator;
  readonly nameInput: Locator;
  readonly _nameError: Locator;
  readonly signupLastNameInput: Locator;
  readonly _signupLastNameError: Locator;
  readonly emailInput: Locator;
  readonly _emailError: Locator;
  readonly passwordInput: Locator;
  readonly _passwordError: Locator;
  readonly reEnterPasswordInput: Locator;
  readonly _reEnterPasswordError: Locator;
  readonly _signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    const nameXPath = '//input[@id="signupName"]';
    const signupLastNameXPath = '//input[@id="signupLastName"]';
    const emailXPath = '//input[@id="signupEmail"]';
    const passwordXPath = '//input[@id="signupPassword"]';
    const reEnterPasswordXPath = '//input[@id="signupRepeatPassword"]';
    const siblingXPath = "following-sibling::div/p";

    this._container = this.page.locator("app-signin-modal");
    this.nameInput = this.page.locator(nameXPath);
    this._nameError = this.page.locator(`${nameXPath}//${siblingXPath}`);
    this.signupLastNameInput = this.page.locator(signupLastNameXPath);
    this._signupLastNameError = this.page.locator(
      `${signupLastNameXPath}//${siblingXPath}`
    );
    this.emailInput = this.page.locator(emailXPath);
    this._emailError = this.page.locator(`${emailXPath}//${siblingXPath}`);
    this.passwordInput = this.page.locator(passwordXPath);
    this._passwordError = this.page.locator(
      `${passwordXPath}//${siblingXPath}`
    );
    this.reEnterPasswordInput = this.page.locator(reEnterPasswordXPath);
    this._reEnterPasswordError = this.page.locator(
      `${reEnterPasswordXPath}//${siblingXPath}`
    );
    this._signInButton = this.page.getByRole("button", { name: "Sign In" });
  }
  async clickOnNameInput() {
    await this.nameInput.click();
  }
  async clickOnSignupLastNameInput() {
    await this.signupLastNameInput.click();
  }
  async clickOnEmailInput() {
    await this.emailInput.click();
  }
  async clickOnPasswordInput() {
    await this.passwordInput.click();
  }
  async clickOnReEnterPasswordInput() {
    await this.reEnterPasswordInput.click();
  }
  async fillNameInput(name: any) {
    await this.nameInput.fill(name);
  }
  async fillSignupLastNameInput(lastName: any) {
    await this.signupLastNameInput.fill(lastName);
  }
  async fillEmailInput(email: any) {
    await this.emailInput.fill(email);
  }
  async fillPasswordInput(password: any) {
    await this.passwordInput.fill(password);
  }
  async fillReEnterPasswordInput(reEnteredPassword: any) {
    await this.reEnterPasswordInput.fill(reEnteredPassword);
  }
  get nameError() {
    return this._nameError;
  }
  get signupLastNameError() {
    return this._signupLastNameError;
  }
  get emailError() {
    return this._emailError;
  }
  get passwordError() {
    return this._passwordError;
  }
  get reEnterPasswordError() {
    return this._reEnterPasswordError;
  }
  get signInButton() {
    return this._signInButton;
  }
  get registrationModal() {
    return this._container;
  }
}
