import { test } from "@playwright/test";

test.describe("User Profile", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.locator("input#signinEmail").fill("qwe1@test.com");
    await page.locator("input#signinPassword").fill("Qwertyqwerty1");
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForSelector("app-signin-modal", { state: "hidden" });
    await page.waitForSelector("button#userNavDropdown");
  });

  test("Update User Profile", async ({ page, request }) => {
    await page.route("/api/users/profile", async (route) => {
      const json = {
        status: "ok",
        data: {
          userId: 108153,
          photoFilename: "default-user.png",
          name: "Svitlana",
          lastName: "Vihovska",
        },
      };
      await route.fulfill({ json });
    });
    await page.goto("/panel/profile");
  });
});
