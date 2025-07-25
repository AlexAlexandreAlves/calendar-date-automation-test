import { test } from '@playwright/test';
import { QueryDateFlow } from '../ui/flows/query-date-flow';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.random.org/calendar-dates/');
});

test.describe('Calendar date query', () => {

    test('should return dates within the selected range', async ({ page }) => {
        const queryDateFlow = new QueryDateFlow(page);

        await queryDateFlow.setDateAndRunQuery('4', '5', '1', '2024', '25', '11', '2025');
        await queryDateFlow.assertDrawnDatesCount(4);
        await queryDateFlow.assertDatesWithinRange();
    });
});