import { Page, Locator } from "@playwright/test";

export class QueryResultPage {

    readonly page: Page;
    readonly datesResult: Locator;
    readonly dateRangeResult: Locator;

    constructor(page: Page) {
        this.page = page;
        this.datesResult = page.locator('xpath=//*[@id="invisible"]/p[2]');
        this.dateRangeResult = page.locator('xpath=//*[@id="invisible"]/p[3]')
    }
}