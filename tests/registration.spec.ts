import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
test.describe("Registration", () => {
  test("Check required fields", async ({ page }) => {
    const {
      nameInput,
      signupLastNameInput,
      emailInput,
      passwordInput,
      reEnterPasswordInput,
      registerBtn,
    } = locators(page);

    await page.goto("/");
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.locator("app-signin-modal").waitFor();
    await page.getByRole("button", { name: "Registration" }).click();
    await page.locator(".modal-title", { hasText: "Registration" }).waitFor();
    await expect(registerBtn).toHaveAttribute("disabled");

    await nameInput.click();
    await signupLastNameInput.click();
    await emailInput.click();
    await passwordInput.click();
    await reEnterPasswordInput.click();
    await nameInput.click();

    await expect(page.locator(`${nameXPath}//${siblingXPath}`)).toHaveText(
      "Name required"
    );
    await expect(
      page.locator(`${signupLastNameXPath}//${siblingXPath}`)
    ).toHaveText("Last name required");

    await expect(page.locator(`${emailXPath}//${siblingXPath}`)).toHaveText(
      "Email required"
    );
    await expect(page.locator(`${passwordXPath}//${siblingXPath}`)).toHaveText(
      "Password required"
    );
    await expect(
      page.locator(`${reEnterPasswordXPath}//${siblingXPath}`)
    ).toHaveText("Re-enter password required");

    await expect(registerBtn).toHaveAttribute("disabled");
  });

  test("Chech length of entered data", async ({ page }) => {
    const { nameInput, signupLastNameInput, registerBtn } = locators(page);
    await page.goto("/");
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.locator("app-signin-modal").waitFor();
    await page.getByRole("button", { name: "Registration" }).click();
    await page.locator(".modal-title", { hasText: "Registration" }).waitFor();
    await nameInput.click();
    await signupLastNameInput.click();
    await nameInput.click();

    const twentyCharsTxt = "abcdefghijklmnopqrst";

    await nameInput.fill("a");
    await expect(page.locator(`${nameXPath}//${siblingXPath}`)).toHaveText(
      "Name has to be from 2 to 20 characters long"
    );
    await nameInput.fill("ab");
    await expect(
      page.locator(`${nameXPath}//${siblingXPath}`)
    ).not.toBeVisible();
    await nameInput.fill(twentyCharsTxt);
    await expect(
      page.locator(`${nameXPath}//${siblingXPath}`)
    ).not.toBeVisible();
    await nameInput.fill(twentyCharsTxt + "a");
    await expect(page.locator(`${nameXPath}//${siblingXPath}`)).toHaveText(
      "Name has to be from 2 to 20 characters long"
    );
    await signupLastNameInput.fill("a");
    await expect(
      page.locator(`${signupLastNameXPath}//${siblingXPath}`)
    ).toHaveText("Last name has to be from 2 to 20 characters long");
    await signupLastNameInput.fill("ab");
    await expect(
      page.locator(`${signupLastNameXPath}//${siblingXPath}`)
    ).not.toBeVisible();
    await signupLastNameInput.fill(twentyCharsTxt);
    await expect(
      page.locator(`${signupLastNameXPath}//${siblingXPath}`)
    ).not.toBeVisible();
    await signupLastNameInput.fill(twentyCharsTxt + "a");
    await expect(
      page.locator(`${signupLastNameXPath}//${siblingXPath}`)
    ).toHaveText("Last name has to be from 2 to 20 characters long");
    await expect(registerBtn).toHaveAttribute("disabled");
  });

  test("Check Email field", async ({ page }) => {
    const { emailInput, passwordInput, registerBtn } = locators(page);
    await page.goto("/");
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.locator("app-signin-modal").waitFor();
    await page.getByRole("button", { name: "Registration" }).click();
    await page.locator(".modal-title", { hasText: "Registration" }).waitFor();
    await emailInput.click();
    await passwordInput.click();
    await emailInput.fill("a");
    await expect(page.locator(`${emailXPath}//${siblingXPath}`)).toHaveText(
      "Email is incorrect"
    );
    await emailInput.fill("a@");
    await expect(page.locator(`${emailXPath}//${siblingXPath}`)).toHaveText(
      "Email is incorrect"
    );
    await emailInput.fill("a@a");
    await expect(page.locator(`${emailXPath}//${siblingXPath}`)).toHaveText(
      "Email is incorrect"
    );
    await emailInput.fill("a@a.io");
    await expect(
      page.locator(`${emailXPath}//${siblingXPath}`)
    ).not.toBeVisible();
    await expect(registerBtn).toHaveAttribute("disabled");
  });

  test("Check Password fields", async ({ page }) => {
    const { nameInput, passwordInput, reEnterPasswordInput, registerBtn } =
      locators(page);
    await page.goto("/");
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.locator("app-signin-modal").waitFor();
    await page.getByRole("button", { name: "Registration" }).click();
    await page.locator(".modal-title", { hasText: "Registration" }).waitFor();
    await passwordInput.click();
    await reEnterPasswordInput.click();
    await nameInput.click();

    await passwordInput.fill("a");
    await expect(page.locator(`${passwordXPath}//${siblingXPath}`)).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await passwordInput.fill("abcdefgh!jklmn1o");
    const correctPassword = "Abcdefgh!jklmn1";
    await expect(page.locator(`${passwordXPath}//${siblingXPath}`)).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await passwordInput.fill(correctPassword + "a");
    await expect(page.locator(`${passwordXPath}//${siblingXPath}`)).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await passwordInput.fill(correctPassword.toUpperCase());
    await expect(page.locator(`${passwordXPath}//${siblingXPath}`)).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await passwordInput.fill(correctPassword);
    await expect(
      page.locator(`${passwordXPath}//${siblingXPath}`)
    ).not.toBeVisible();
    await expect(registerBtn).toHaveAttribute("disabled");

    await reEnterPasswordInput.fill("a");
    await expect(
      page.locator(`${reEnterPasswordXPath}//${siblingXPath}`)
    ).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await reEnterPasswordInput.fill("abcdefgh!jklmn1o");
    await expect(
      page.locator(`${reEnterPasswordXPath}//${siblingXPath}`)
    ).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await reEnterPasswordInput.fill(correctPassword + "a");
    await expect(
      page.locator(`${reEnterPasswordXPath}//${siblingXPath}`)
    ).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await reEnterPasswordInput.fill(correctPassword.toUpperCase());
    await expect(
      page.locator(`${reEnterPasswordXPath}//${siblingXPath}`)
    ).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await reEnterPasswordInput.fill(correctPassword);
    await expect(
      page.locator(`${reEnterPasswordXPath}//${siblingXPath}`)
    ).not.toBeVisible();
    await expect(registerBtn).toHaveAttribute("disabled");
  });

  test("Registration. Positive case", async ({ page }) => {
    const {
      nameInput,
      signupLastNameInput,
      emailInput,
      passwordInput,
      reEnterPasswordInput,
      registerBtn,
    } = locators(page);

    await page.goto("/");
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.locator("app-signin-modal").waitFor();
    await page.getByRole("button", { name: "Registration" }).click();
    await page.locator(".modal-title", { hasText: "Registration" }).waitFor();

    const correctPassword = "Abcdefgh!jklmn1";
    await nameInput.fill("Svitlana");
    await signupLastNameInput.fill("Automation");
    await emailInput.fill("aqa_svihovska@aqa.io");
    await passwordInput.fill(correctPassword);
    await reEnterPasswordInput.fill(correctPassword);
    await expect(registerBtn).not.toHaveAttribute("disabled");
    await registerBtn.click();
    await page.locator("app-signup-modal").waitFor({ state: "hidden" });
    await expect(page.locator("#userNavDropdown")).toBeVisible();
  });
});
const nameXPath = '//input[@id="signupName"]';
const signupLastNameXPath = '//input[@id="signupLastName"]';
const emailXPath = '//input[@id="signupEmail"]';
const passwordXPath = '//input[@id="signupPassword"]';
const reEnterPasswordXPath = '//input[@id="signupRepeatPassword"]';
const siblingXPath = "following-sibling::div/p";

function locators(page: Page) {
  return {
    nameInput: page.locator(nameXPath),
    signupLastNameInput: page.locator(signupLastNameXPath),
    emailInput: page.locator(emailXPath),
    passwordInput: page.locator(passwordXPath),
    reEnterPasswordInput: page.locator(reEnterPasswordXPath),
    registerBtn: page.getByRole("button", { name: "Register" }),
  };
}
