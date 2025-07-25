import { Page, Locator } from "@playwright/test";

export class CalendarPage {

    readonly page: Page;
    readonly numberOfDatesField: Locator;
    readonly startDayDropdown: Locator;
    readonly endDayDropdown: Locator;
    readonly startMonthDropdown: Locator;
    readonly endMonthDropdown: Locator;
    readonly startYearDropdown: Locator;
    readonly endYearDropdown: Locator;
    readonly getDatesButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.numberOfDatesField = page.locator('input[name="num"]');
        this.startDayDropdown = page.locator('select[name="start_day"]');
        this.endDayDropdown = page.locator('select[name="end_day"]');
        this.startMonthDropdown = page.locator('select[name="start_month"]');
        this.endMonthDropdown = page.locator('select[name="end_month"]');
        this.startYearDropdown = page.locator('select[name="start_year"]');
        this.endYearDropdown = page.locator('select[name="end_year"]');
        this.getDatesButton = page.getByRole('button', { name: 'Get Dates' });
    }

    /**
  * Selects the start date range in the calendar.
  */
    async selectStartDateRange(startDay: string, startMonth: string, startYear: string) {
        await this.startDayDropdown.selectOption(startDay);
        await this.startMonthDropdown.selectOption(startMonth);
        await this.startYearDropdown.selectOption(startYear);
    }

    /**
   * Selects the end date range in the calendar.
   */
    async selectEndDateRange(endDay: string, endMonth: string, endYear: string) {
        await this.endDayDropdown.selectOption(endDay);
        await this.endMonthDropdown.selectOption(endMonth);
        await this.endYearDropdown.selectOption(endYear);
    }

}