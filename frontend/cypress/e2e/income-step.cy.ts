describe("Income Step", () => {
  beforeEach(() => {
    cy.visitOnboarding();
    cy.get("button").contains("Get started").click();
    cy.get('[data-cy="currency-select"]').click();
    cy.get('[data-value="USD"]').click();
    cy.get("button").contains("Continue").click();
  });

  it("should display income step", () => {
    cy.get("h1").should("contain", "Determine your monthly income");
    cy.get('[data-cy="income-source"]').should("be.visible");
    cy.get('[data-cy="income-amount"]').should("be.visible");
    cy.get('[data-cy="income-start-date"]').should("be.visible");
  });

  it("should validate required fields", () => {
    // Try to continue without filling form
    cy.get("button").contains("Continue").click();
    cy.get('[data-cy="income-errors"]').should("be.visible");
  });

  it("should fill and submit income form", () => {
    cy.get('[data-cy="income-source"]').select("salary");
    cy.get('[data-cy="income-amount"]').type("5000");
    cy.get('[data-cy="income-start-date"]').click();

    // Select a date from calendar
    cy.get('[role="gridcell"]').first().click();

    cy.get("button").contains("Continue").click();
    cy.get("h1").should("contain", "Fixed Expenses");
  });

  it("should validate amount field", () => {
    cy.get('[data-cy="income-source"]').select("salary");
    cy.get('[data-cy="income-amount"]').type("0");
    cy.get('[data-cy="income-start-date"]').click();
    cy.get('[role="gridcell"]').first().click();

    cy.get("button").contains("Continue").click();
    cy.get("p").should("contain", "Please enter a valid income amount");
  });

  it("should validate negative amount", () => {
    cy.get('[data-cy="income-source"]').select("salary");
    cy.get('[data-cy="income-amount"]').type("-100");
    cy.get('[data-cy="income-start-date"]').click();
    cy.get('[role="gridcell"]').first().click();

    cy.get("button").contains("Continue").click();
    cy.get("p").should("contain", "Please enter a valid income amount");
  });

  it("should allow back navigation", () => {
    cy.get("button").contains("Back").click();
    cy.get("h1").should("contain", "Choose your primary currency");
  });
});
