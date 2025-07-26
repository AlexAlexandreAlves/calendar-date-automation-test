import { test } from '@playwright/test';
import { QueryDateFlow } from '../ui/flows/query-date-flow';
import { IInputParameters } from '../interfaces/i-input-parameters';
import * as fs from 'fs/promises';
import * as path from 'path';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.random.org/calendar-dates/');
});

test.describe('Calendar date query', () => {

    test('should return dates within the selected range', async ({ page }) => {
        const queryDateFlow = new QueryDateFlow(page);

        try {
            const jsonPath = path.resolve(__dirname, '../resources/calendar-input-data.json');
            const fileContent = await fs.readFile(jsonPath, 'utf-8');
            const inputParams: IInputParameters = JSON.parse(fileContent);

            await queryDateFlow.setDateAndRunQuery(inputParams);
            await queryDateFlow.assertDrawnDatesCount(inputParams.numberOfDates);
            await queryDateFlow.assertDatesWithinRange();

        } catch (error) {
            console.error('Error fetching input parameters:', error);
            return;
        }
    });
});