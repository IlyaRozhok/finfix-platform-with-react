describe("Debts Step", () => {
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
    cy.get('[data-cy="add-expense-btn"]').click();
    cy.get('[data-cy="expense-category"]').click();
    cy.get('[role="option"]').first().click();
    cy.get('[data-cy="expense-amount"]').type("1200");
    cy.get("button").contains("Continue").click();
  });

  it("should display debts step", () => {
    cy.get("h1").should("contain", "Loans & Credits");
    cy.get('[data-cy="add-debt-btn"]').should("be.visible");
  });

  it("should add a new debt", () => {
    cy.get('[data-cy="add-debt-btn"]').click();

    cy.get('[data-cy="debt-type"]').click();
    cy.get('[role="option"]').first().click();

    cy.get('[data-cy="debt-description"]').type("Credit card debt");
    cy.get('[data-cy="debt-total"]').type("2500");

    cy.get('[data-cy="debts-list"]').should("contain", "Credit card debt");
    cy.get('[data-cy="debts-list"]').should("contain", "$2,500");
  });

  it("should add debt with interest rate", () => {
    cy.get('[data-cy="add-debt-btn"]').click();

    cy.get('[data-cy="debt-type"]').click();
    cy.get('[role="option"]').first().click();

    cy.get('[data-cy="debt-description"]').type("Personal loan");
    cy.get('[data-cy="debt-total"]').type("10000");

    // Add interest rate if field is visible
    cy.get("body").then(($body) => {
      if ($body.find('[data-cy="debt-interest"]').length > 0) {
        cy.get('[data-cy="debt-interest"]').type("12");
      }
    });

    cy.get('[data-cy="debts-list"]').should("contain", "Personal loan");
  });

  it("should add multiple debts", () => {
    // Add first debt
    cy.get('[data-cy="add-debt-btn"]').click();
    cy.get('[data-cy="debt-type"]').click();
    cy.get('[role="option"]').first().click();
    cy.get('[data-cy="debt-description"]').type("Credit card");
    cy.get('[data-cy="debt-total"]').type("2500");

    // Add second debt
    cy.get('[data-cy="add-debt-btn"]').click();
    cy.get('[data-cy="debt-type"]').last().click();
    cy.get('[role="option"]').eq(1).click();
    cy.get('[data-cy="debt-description"]').last().type("Car loan");
    cy.get('[data-cy="debt-total"]').last().type("15000");

    cy.get('[data-cy="debts-list"]').should("contain", "Credit card");
    cy.get('[data-cy="debts-list"]').should("contain", "Car loan");
  });

  it("should remove a debt", () => {
    // Add a debt first
    cy.get('[data-cy="add-debt-btn"]').click();
    cy.get('[data-cy="debt-type"]').click();
    cy.get('[role="option"]').first().click();
    cy.get('[data-cy="debt-description"]').type("Credit card debt");
    cy.get('[data-cy="debt-total"]').type("2500");

    // Remove the debt
    cy.get('[data-cy="remove-debt-btn"]').click();
    cy.get('[data-cy="debts-list"]').should("not.contain", "Credit card debt");
  });

  it("should validate debt fields", () => {
    cy.get('[data-cy="add-debt-btn"]').click();

    // Try to continue without filling required fields
    cy.get("button").contains("Continue").click();

    // Should show validation errors
    cy.get("p").should("contain", "Please select a debt type");
    cy.get("p").should("contain", "Please enter a description");
    cy.get("p").should("contain", "Please enter a valid amount");
  });

  it("should calculate total debt", () => {
    // Add first debt
    cy.get('[data-cy="add-debt-btn"]').click();
    cy.get('[data-cy="debt-type"]').click();
    cy.get('[role="option"]').first().click();
    cy.get('[data-cy="debt-description"]').type("Credit card");
    cy.get('[data-cy="debt-total"]').type("2500");

    // Add second debt
    cy.get('[data-cy="add-debt-btn"]').click();
    cy.get('[data-cy="debt-type"]').last().click();
    cy.get('[role="option"]').eq(1).click();
    cy.get('[data-cy="debt-description"]').last().type("Car loan");
    cy.get('[data-cy="debt-total"]').last().type("15000");

    // Check total
    cy.get("div").should("contain", "Total Debt:");
    cy.get("div").should("contain", "$17,500");
  });

  it("should allow back navigation", () => {
    cy.get("button").contains("Back").click();
    cy.get("h1").should("contain", "Fixed Expenses");
  });
});
