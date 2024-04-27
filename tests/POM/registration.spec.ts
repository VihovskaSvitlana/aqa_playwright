import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/Home";
import { RegistrationModal } from "../../components/registrationModal";
import { GaragePage } from "../../pages/GaragePage";

test.describe("Registration", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  test("Check required fields", async ({ page }) => {
    const homePage = new HomePage(page);
    const registrationModal = new RegistrationModal(page);
    await homePage.openRegistrationModal();
    await registrationModal.clickOnNameInput();
    await registrationModal.clickOnSignupLastNameInput();
    await registrationModal.clickOnEmailInput();
    await registrationModal.clickOnPasswordInput();
    await registrationModal.clickOnReEnterPasswordInput();
    await registrationModal.clickOnNameInput();
    await expect(registrationModal.nameError).toHaveText("Name required");
    await expect(registrationModal.signupLastNameError).toHaveText(
      "Last name required"
    );
    await expect(registrationModal.emailError).toHaveText("Email required");
    await expect(registrationModal.passwordError).toHaveText(
      "Password required"
    );
    await expect(registrationModal.reEnterPasswordError).toHaveText(
      "Re-enter password required"
    );
    await expect(homePage.registerBtn).toHaveAttribute("disabled");
  });

  test("Chech length of entered data", async ({ page }) => {
    const homePage = new HomePage(page);
    const registrationModal = new RegistrationModal(page);
    await homePage.openRegistrationModal();
    await registrationModal.clickOnNameInput();
    await registrationModal.clickOnSignupLastNameInput();
    await registrationModal.clickOnNameInput();
    const twentyCharsTxt = "abcdefghijklmnopqrst";
    await registrationModal.fillNameInput("a");
    await expect(registrationModal.nameError).toHaveText(
      "Name has to be from 2 to 20 characters long"
    );
    await registrationModal.fillNameInput("ab");
    await expect(registrationModal.nameError).not.toBeVisible();
    await registrationModal.fillNameInput(twentyCharsTxt);
    await expect(registrationModal.nameError).not.toBeVisible();
    await registrationModal.fillNameInput(twentyCharsTxt + "a");
    await expect(registrationModal.nameError).toHaveText(
      "Name has to be from 2 to 20 characters long"
    );
    await registrationModal.fillSignupLastNameInput("a");
    await expect(registrationModal.signupLastNameError).toHaveText(
      "Last name has to be from 2 to 20 characters long"
    );
    await registrationModal.fillSignupLastNameInput("ab");
    await expect(registrationModal.signupLastNameError).not.toBeVisible();
    await registrationModal.fillSignupLastNameInput(twentyCharsTxt);
    await expect(registrationModal.signupLastNameError).not.toBeVisible();
    await registrationModal.fillSignupLastNameInput(twentyCharsTxt + "a");
    await expect(registrationModal.signupLastNameError).toHaveText(
      "Last name has to be from 2 to 20 characters long"
    );
    await expect(homePage.registerBtn).toHaveAttribute("disabled");
  });

  test("Check Email field", async ({ page }) => {
    const homePage = new HomePage(page);
    const registrationModal = new RegistrationModal(page);
    await homePage.openRegistrationModal();
    await registrationModal.clickOnEmailInput();
    await registrationModal.clickOnPasswordInput();
    await registrationModal.fillEmailInput("a");
    await expect(registrationModal.emailError).toHaveText("Email is incorrect");
    await registrationModal.fillEmailInput("a@");
    await expect(registrationModal.emailError).toHaveText("Email is incorrect");
    await registrationModal.fillEmailInput("a@a");
    await expect(registrationModal.emailError).toHaveText("Email is incorrect");
    await registrationModal.fillEmailInput("a@a.io");
    await expect(registrationModal.emailError).not.toBeVisible();
    await expect(homePage.registerBtn).toHaveAttribute("disabled");
  });

  test("Check Password fields", async ({ page }) => {
    const homePage = new HomePage(page);
    const registrationModal = new RegistrationModal(page);
    await homePage.openRegistrationModal();
    await registrationModal.clickOnPasswordInput();
    await registrationModal.clickOnReEnterPasswordInput();
    await registrationModal.fillPasswordInput("a");
    await expect(registrationModal.passwordError).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await registrationModal.fillPasswordInput("abcdefgh!jklmn1o");
    const correctPassword = "Abcdefgh!jklmn1";
    await expect(registrationModal.passwordError).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await registrationModal.fillPasswordInput(correctPassword + "a");
    await expect(registrationModal.passwordError).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await registrationModal.fillPasswordInput(correctPassword.toUpperCase());
    await expect(registrationModal.passwordError).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await registrationModal.fillPasswordInput(correctPassword);
    await expect(registrationModal.passwordError).not.toBeVisible();
    await expect(homePage.registerBtn).toHaveAttribute("disabled");

    await registrationModal.fillReEnterPasswordInput("a");
    await expect(registrationModal.reEnterPasswordError).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await registrationModal.fillReEnterPasswordInput("abcdefgh!jklmn1o");
    await expect(registrationModal.reEnterPasswordError).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await registrationModal.fillReEnterPasswordInput(correctPassword + "a");
    await expect(registrationModal.reEnterPasswordError).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await registrationModal.fillReEnterPasswordInput(
      correctPassword.toUpperCase()
    );
    await expect(registrationModal.reEnterPasswordError).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
    await registrationModal.fillReEnterPasswordInput(correctPassword);
    await expect(registrationModal.reEnterPasswordError).not.toBeVisible();
    await expect(homePage.registerBtn).toHaveAttribute("disabled");
  });

  test("Registration. Positive case", async ({ page }) => {
    const homePage = new HomePage(page);
    const registrationModal = new RegistrationModal(page);
    const garagePage = new GaragePage(page);
    await homePage.openRegistrationModal();
    const correctPassword = "Abcdefgh!jklmn1";
    await registrationModal.fillNameInput("Svitlana");
    await registrationModal.fillSignupLastNameInput("Automation");
    await registrationModal.fillEmailInput("aqa_s-vihovska@aqa.io");
    await registrationModal.fillPasswordInput(correctPassword);
    await registrationModal.fillReEnterPasswordInput(correctPassword);
    await expect(homePage.registerBtn).not.toHaveAttribute("disabled");
    await homePage.registerBtn.click();
    await registrationModal.registrationModal.waitFor({ state: "hidden" });
    await expect(garagePage.garageTable).toBeVisible();
  });
});
