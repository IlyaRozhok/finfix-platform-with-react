# Cypress E2E Tests

This directory contains end-to-end tests for the FinFix onboarding flow using Cypress.

## Test Structure

### Main Test Files

- `onboarding-flow.cy.ts` - Complete onboarding flow test
- `currency-selection.cy.ts` - Currency selection step tests
- `income-step.cy.ts` - Income step tests
- `expenses-step.cy.ts` - Expenses step tests
- `debts-step.cy.ts` - Debts step tests
- `summary-step.cy.ts` - Summary step tests

### Test Coverage

The tests cover:

1. **Welcome Step**

   - Page display
   - "Get started" button functionality

2. **Currency Selection**

   - Currency search functionality
   - Popular currencies display
   - Currency selection and validation
   - Error handling for invalid searches

3. **Income Step**

   - Form validation
   - Income source selection
   - Amount input validation
   - Date picker functionality
   - Error handling

4. **Expenses Step**

   - Adding multiple expenses
   - Removing expenses
   - Form validation
   - Total calculation
   - Category selection

5. **Debts Step**

   - Adding multiple debts
   - Removing debts
   - Form validation
   - Total calculation
   - Interest rate handling

6. **Summary Step**
   - Data display verification
   - Financial overview calculation
   - Copy JSON functionality
   - Reset functionality

## Running Tests

### Prerequisites

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Make sure the application is running on `http://localhost:3000`

### Commands

```bash
# Open Cypress Test Runner (interactive)
npm run cypress:open

# Run all tests in headless mode
npm run cypress:run

# Run tests with specific browser
npx cypress run --browser chrome

# Run specific test file
npx cypress run --spec "cypress/e2e/onboarding-flow.cy.ts"
```

## Test Data Attributes

The tests use `data-cy` attributes for reliable element selection:

- `data-cy="currency-select"` - Currency selection dropdown
- `data-cy="income-source"` - Income source dropdown
- `data-cy="income-amount"` - Income amount input
- `data-cy="income-start-date"` - Income start date picker
- `data-cy="expense-category"` - Expense category dropdown
- `data-cy="expense-amount"` - Expense amount input
- `data-cy="expense-description"` - Expense description input
- `data-cy="add-expense-btn"` - Add expense button
- `data-cy="remove-expense-btn"` - Remove expense button
- `data-cy="debt-type"` - Debt type dropdown
- `data-cy="debt-description"` - Debt description input
- `data-cy="debt-total"` - Debt total amount input
- `data-cy="add-debt-btn"` - Add debt button
- `data-cy="remove-debt-btn"` - Remove debt button
- `data-cy="summary-currency"` - Summary currency display
- `data-cy="summary-income"` - Summary income display
- `data-cy="summary-expenses"` - Summary expenses display
- `data-cy="summary-debts"` - Summary debts display

## Custom Commands

The tests use custom Cypress commands defined in `support/commands.ts`:

- `cy.visitOnboarding()` - Navigate to onboarding page
- `cy.selectCurrency(code)` - Select currency by code
- `cy.fillIncomeForm(data)` - Fill income form
- `cy.addExpense(data)` - Add expense
- `cy.addDebt(data)` - Add debt

## Configuration

Cypress configuration is in `cypress.config.ts`:

- Base URL: `http://localhost:3000`
- Viewport: 1280x720
- Video recording enabled
- Screenshots on failure enabled
- Default command timeout: 10 seconds

## Troubleshooting

### Common Issues

1. **Tests fail with "Cannot read properties of null"**

   - Make sure all components have `"use client"` directive
   - Check that React hooks are properly imported

2. **Element not found errors**

   - Verify `data-cy` attributes are present in components
   - Check that elements are visible before interaction

3. **Timing issues**

   - Use `cy.wait()` for dynamic content
   - Check element visibility with `should('be.visible')`

4. **Form validation errors**
   - Ensure all required fields are filled
   - Check validation error messages are displayed

### Debug Mode

Run tests in debug mode to see detailed logs:

```bash
DEBUG=cypress:* npm run cypress:run
```

## Best Practices

1. **Use data-cy attributes** instead of CSS selectors for stability
2. **Wait for elements** to be visible before interacting
3. **Clear state** between tests using `beforeEach`
4. **Test error scenarios** as well as happy paths
5. **Use custom commands** for repeated actions
6. **Keep tests independent** - each test should work in isolation
