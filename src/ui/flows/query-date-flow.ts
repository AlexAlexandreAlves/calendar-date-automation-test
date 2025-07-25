import { expect, Page } from '@playwright/test';
import { CalendarPage } from '../pages/calendar-page';
import { QueryResultPage } from '../pages/query-result-page';

export class QueryDateFlow {

    datePattern: RegExp = /\d{4}-\d{2}-\d{2}/g;

    constructor(private page: Page) { }

    async setDateAndRunQuery(
        numberOfDates: string,
        startDay: string,
        startMonth: string,
        startYear: string,
        endDay: string,
        endMonth: string,
        endYear: string
    ) {
        const calendarPage = new CalendarPage(this.page);

        await this.page.waitForURL('https://www.random.org/calendar-dates/');
        await calendarPage.numberOfDatesField.fill(numberOfDates);
        await calendarPage.selectStartDateRange(startDay, startMonth, startYear);
        await calendarPage.selectEndDateRange(endDay, endMonth, endYear);
        await calendarPage.getDatesButton.click();
    }

    async assertDrawnDatesCount(expectedCount: number) {
        const queryResultPage = new QueryResultPage(this.page);

        const datesText = await queryResultPage.datesResult.textContent();
        const dates = datesText?.match(this.datePattern) || [];
        expect(dates.length).toBe(expectedCount);
    }

    async assertDatesWithinRange() {
        const queryResultPage = new QueryResultPage(this.page);

        const datesText = await queryResultPage.datesResult.textContent();
        const dates = datesText?.match(this.datePattern) || [];

        const rangeMessage = await queryResultPage.dateRangeResult.textContent();
        const rangeDates = rangeMessage?.match(this.datePattern) || [];
        expect(rangeDates.length).toBe(2);

        if (!rangeDates[0] || !rangeDates[1]) {
            throw new Error('Range dates are not defined');
        }

        const dataA = new Date(rangeDates[0]);
        const dateB = new Date(rangeDates[1]);

        for (const dateStr of dates) {
            const date = new Date(dateStr);
            expect(date >= dataA && date <= dateB).toBeTruthy();
        }
    }
}