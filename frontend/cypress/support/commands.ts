/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to visit onboarding page
       * @example cy.visitOnboarding()
       */
      visitOnboarding(): Chainable<AUTWindow>;

      /**
       * Custom command to fill currency selection
       * @example cy.selectCurrency('USD')
       */
      selectCurrency(currencyCode: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to fill income form
       * @example cy.fillIncomeForm({ source: 'salary', amount: 5000, start_date: '2024-01-01' })
       */
      fillIncomeForm(data: {
        source: string;
        amount: number;
        start_date: string;
      }): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to add expense
       * @example cy.addExpense({ category_name: 'Rent', amount: 1200, description: 'Monthly rent' })
       */
      addExpense(data: {
        category_name: string;
        amount: number;
        description?: string;
      }): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to add debt
       * @example cy.addDebt({ debt_type: 'credit_card', description: 'Credit card debt', total_debt: 5000 })
       */
      addDebt(data: {
        debt_type: string;
        description: string;
        total_debt: number;
        interest_rate_monthly?: number;
        start_date: string;
      }): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add("dataCy", (value) => {
  return cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add("visitOnboarding", () => {
  return cy.visit("/onboarding");
});

Cypress.Commands.add("selectCurrency", (currencyCode) => {
  cy.get('[data-cy="currency-select"]').click();
  cy.get(`[data-value="${currencyCode}"]`).click();
  return cy.get('[data-cy="currency-select"]');
});

Cypress.Commands.add("fillIncomeForm", (data) => {
  cy.get('[data-cy="income-source"]').select(data.source);
  cy.get('[data-cy="income-amount"]').type(data.amount.toString());
  cy.get('[data-cy="income-start-date"]').type(data.start_date);
  return cy.get('[data-cy="income-form"]');
});

Cypress.Commands.add("addExpense", (data) => {
  cy.get('[data-cy="expense-category"]').type(data.category_name);
  cy.get('[data-cy="expense-amount"]').type(data.amount.toString());
  if (data.description) {
    cy.get('[data-cy="expense-description"]').type(data.description);
  }
  cy.get('[data-cy="add-expense-btn"]').click();
  return cy.get('[data-cy="expenses-list"]');
});

Cypress.Commands.add("addDebt", (data) => {
  cy.get('[data-cy="debt-type"]').select(data.debt_type);
  cy.get('[data-cy="debt-description"]').type(data.description);
  cy.get('[data-cy="debt-total"]').type(data.total_debt.toString());
  if (data.interest_rate_monthly) {
    cy.get('[data-cy="debt-interest"]').type(
      data.interest_rate_monthly.toString()
    );
  }
  cy.get('[data-cy="debt-start-date"]').type(data.start_date);
  cy.get('[data-cy="add-debt-btn"]').click();
  return cy.get('[data-cy="debts-list"]');
});
