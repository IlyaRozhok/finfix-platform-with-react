describe("Expenses Step", () => {
  beforeEach(() => {
    cy.visitOnboarding();
    cy.get("button").contains("Get started").click();
    cy.get('[data-cy="currency-select"]').click();
    cy.get('[data-value="USD"]').click();
    cy.get("button").contains("Continue").click();
    cy.get('[data-cy="income-source"]').select("salary");
    cy.get('[data-cy="income-amount"]').type("5000");
    cy.get('[data-cy="income-start-date"]').click();
    cy.get('[role="gridcell"]').first().click();
    cy.get("button").contains("Continue").click();
  });

  it("should display expenses step", () => {
    cy.get("h1").should("contain", "Fixed Expenses");
    cy.get('[data-cy="add-expense-btn"]').should("be.visible");
  });

  it("should add a new expense", () => {
    cy.get('[data-cy="add-expense-btn"]').click();

    cy.get('[data-cy="expense-category"]').click();
    cy.get('[role="option"]').first().click();

    cy.get('[data-cy="expense-amount"]').type("1200");
    cy.get('[data-cy="expense-description"]').type("Monthly rent");

    cy.get('[data-cy="expenses-list"]').should("contain", "Monthly rent");
    cy.get('[data-cy="expenses-list"]').should("contain", "$1,200");
  });

  it("should add multiple expenses", () => {
    // Add first expense
    cy.get('[data-cy="add-expense-btn"]').click();
    cy.get('[data-cy="expense-category"]').click();
    cy.get('[role="option"]').first().click();
    cy.get('[data-cy="expense-amount"]').type("1200");
    cy.get('[data-cy="expense-description"]').type("Rent");

    // Add second expense
    cy.get('[data-cy="add-expense-btn"]').click();
    cy.get('[data-cy="expense-category"]').last().click();
    cy.get('[role="option"]').eq(1).click();
    cy.get('[data-cy="expense-amount"]').last().type("300");
    cy.get('[data-cy="expense-description"]').last().type("Utilities");

    cy.get('[data-cy="expenses-list"]').should("contain", "Rent");
    cy.get('[data-cy="expenses-list"]').should("contain", "Utilities");
  });

  it("should remove an expense", () => {
    // Add an expense first
    cy.get('[data-cy="add-expense-btn"]').click();
    cy.get('[data-cy="expense-category"]').click();
    cy.get('[role="option"]').first().click();
    cy.get('[data-cy="expense-amount"]').type("1200");
    cy.get('[data-cy="expense-description"]').type("Rent");

    // Remove the expense
    cy.get('[data-cy="remove-expense-btn"]').click();
    cy.get('[data-cy="expenses-list"]').should("not.contain", "Rent");
  });

  it("should validate expense fields", () => {
    cy.get('[data-cy="add-expense-btn"]').click();

    // Try to continue without filling required fields
    cy.get("button").contains("Continue").click();

    // Should show validation errors
    cy.get("p").should("contain", "Please select a category");
    cy.get("p").should("contain", "Please enter a valid amount");
  });

  it("should calculate total expenses", () => {
    // Add first expense
    cy.get('[data-cy="add-expense-btn"]').click();
    cy.get('[data-cy="expense-category"]').click();
    cy.get('[role="option"]').first().click();
    cy.get('[data-cy="expense-amount"]').type("1200");

    // Add second expense
    cy.get('[data-cy="add-expense-btn"]').click();
    cy.get('[data-cy="expense-category"]').last().click();
    cy.get('[role="option"]').eq(1).click();
    cy.get('[data-cy="expense-amount"]').last().type("300");

    // Check total
    cy.get("div").should("contain", "Total Monthly Expenses:");
    cy.get("div").should("contain", "$1,500");
  });

  it("should allow back navigation", () => {
    cy.get("button").contains("Back").click();
    cy.get("h1").should("contain", "Determine your monthly income");
  });
});
