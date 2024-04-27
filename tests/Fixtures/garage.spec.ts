import { test, expect } from "../../util/GarageFixture";

test.describe("Garage page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign In" }).click();
    await page.locator("input#signinEmail").fill("qwe1@test.com");
    await page.locator("input#signinPassword").fill("Qwertyqwerty1");
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForSelector("app-signin-modal", { state: "hidden" });
    await page.waitForSelector("button#userNavDropdown");
  });

  test("Adding new Car", async ({ page, garagePage }) => {
    await garagePage.openGaragePage();
    const carsNumber = await page.locator("li.car-item").count();
    await garagePage.addNewCar();
    expect(await page.locator("li.car-item").count()).toEqual(carsNumber + 1);
  });
});
