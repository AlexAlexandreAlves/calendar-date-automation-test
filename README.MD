# Calendar Date Automation Test

This is an automated testing project using [Playwright](https://playwright.dev/) that checks  the date query flow in a calendar. The project uses the **Flow Model Pattern** to organize and simplify page interactions, making tests more readable, reusable, and easy to extend and maintain.

## Flow Model Pattern

The **Flow Model Pattern** encapsulates complex page operations in flow classes, exposing high-level methods for tests without requiring knowledge of UI element implementation details. This pattern complements the **Page Object Model** by providing a layer that abstracts UI interactions and offers a more behavior-oriented view. As a result, tests are cleaner and focused on "what" is being tested, not "how".

*(See the example in [`src/tests/calendar-range.test.ts`](src/tests/calendar-range.test.ts))*

## Project Structure
```
calendar-date-automation-test
├── src
│   ├── interfaces
│   │   └── i-input-parameters.ts
│   ├── resources
│   │   └── calendar-input-data.json
│   ├── tests
│   │   └── calendar-range.test.ts
│   └── ui
│       ├── flows
│       │   └── query-date-flow.ts
│       └── pages
│           ├── calendar-page.ts
│           └── query-result-page.ts
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.ts
└── README.md
```

## How to Install and Run?

- Make sure you have [Node.js](https://nodejs.org/en/download) version 18 or higher installed.
- In the project root folder, run (it will install the dependencies and the playwright browsers):
  ```
  npm run setup
  ```
- After installing the dependencies:
  - You can edit the test input data in [`src/resources/calendar-input-data.json`](src/resources/calendar-input-data.json), or leave it as-is to use the default values.
  - To run the tests, use:
  ```
  npx playwright test
  ```
  - Or to open the interactive UI:
  ```
  npx playwright test --ui
  ```

## Technologies Used

- @playwright/test: "^1.54.1"
- @types/node: "^24.1.0"