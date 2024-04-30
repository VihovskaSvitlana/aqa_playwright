import { test as base } from "@playwright/test";
import { GaragePage } from "../pages/GaragePage";

type GarageFixture = {
  garagePage: GaragePage;
};

export const test = base.extend<GarageFixture>({
  garagePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);
    await garagePage.openGaragePage();
    await garagePage.addNewCar();
    await use(garagePage);
  },
});
export { expect } from '@playwright/test';