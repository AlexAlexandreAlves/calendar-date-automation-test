import { expect, Page } from '@playwright/test';
import { CalendarPage } from '../pages/calendar-page';
import { QueryResultPage } from '../pages/query-result-page';
import { IInputParameters } from '../../interfaces/i-input-parameters';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export class QueryDateFlow {

    datePattern: RegExp = /\d{4}-\d{2}-\d{2}/g;

    constructor(private page: Page) { }

    async setDateAndRunQuery(
        inputParams: IInputParameters
    ) {
        const calendarPage = new CalendarPage(this.page);

        await this.page.waitForURL('https://www.random.org/calendar-dates/');
        await calendarPage.numberOfDatesField.fill(inputParams.numberOfDates.toString());
        await calendarPage.selectStartDateRange(
            inputParams.startDay,
            inputParams.startMonth,
            inputParams.startYear
        );
        await calendarPage.selectEndDateRange(
            inputParams.endDay,
            inputParams.endMonth,
            inputParams.endYear
        );
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

        const dateA = dayjs.utc(rangeDates[0], 'YYYY-MM-DD');
        const dateB = dayjs.utc(rangeDates[1], 'YYYY-MM-DD');

        const allDatesInRange = dates.every(dateStr => {
            const date = dayjs.utc(dateStr, 'YYYY-MM-DD');
            return (date.isSame(dateA) || date.isAfter(dateA))
                && (date.isSame(dateB) || date.isBefore(dateB));
        });
        expect(allDatesInRange).toBeTruthy();
    }
}