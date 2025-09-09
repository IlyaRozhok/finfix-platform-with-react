describe("Summary Step", () => {
  beforeEach(() => {
    // Complete the entire onboarding flow
    cy.visitOnboarding();
    cy.get("button").contains("Get started").click();

    // Currency step
    cy.get('[data-cy="currency-select"]').click();
    cy.get('[data-value="USD"]').click();
    cy.get("button").contains("Continue").click();

    // Income step
    cy.get('[data-cy="income-source"]').select("salary");
    cy.get('[data-cy="income-amount"]').type("5000");
    cy.get('[data-cy="income-start-date"]').click();
    cy.get('[role="gridcell"]').first().click();
    cy.get("button").contains("Continue").click();

    // Expenses step
    cy.get('[data-cy="add-expense-btn"]').click();
    cy.get('[data-cy="expense-category"]').click();
    cy.get('[role="option"]').first().click();
    cy.get('[data-cy="expense-amount"]').type("1200");
    cy.get('[data-cy="expense-description"]').type("Rent");
    cy.get("button").contains("Continue").click();

    // Debts step
    cy.get('[data-cy="add-debt-btn"]').click();
    cy.get('[data-cy="debt-type"]').click();
    cy.get('[role="option"]').first().click();
    cy.get('[data-cy="debt-description"]').type("Credit card debt");
    cy.get('[data-cy="debt-total"]').type("2500");
    cy.get("button").contains("Continue").click();
  });

  it("should display summary step", () => {
    cy.get("h1").should("contain", "Onboarding Summary");
    cy.get('[data-cy="summary-currency"]').should("be.visible");
    cy.get('[data-cy="summary-income"]').should("be.visible");
    cy.get('[data-cy="summary-expenses"]').should("be.visible");
    cy.get('[data-cy="summary-debts"]').should("be.visible");
  });

  it("should display correct currency information", () => {
    cy.get('[data-cy="summary-currency"]').should("contain", "🇺🇸 USD");
  });

  it("should display correct income information", () => {
    cy.get('[data-cy="summary-income"]').should("contain", "$5,000");
  });

  it("should display correct expenses information", () => {
    cy.get('[data-cy="summary-expenses"]').should("contain", "$1,200");
  });

  it("should display correct debts information", () => {
    cy.get('[data-cy="summary-debts"]').should("contain", "$2,500");
  });

  it("should show financial overview", () => {
    cy.get("h2").should("contain", "Financial Overview");
    cy.get("div").should("contain", "Monthly Income");
    cy.get("div").should("contain", "Fixed Expenses");
    cy.get("div").should("contain", "Available");
  });

  it("should calculate available amount correctly", () => {
    // Available = Income - Expenses = 5000 - 1200 = 3800
    cy.get("div").should("contain", "$3,800");
  });

  it("should copy data to clipboard", () => {
    cy.window().then((win) => {
      cy.stub(win.navigator.clipboard, "writeText").as("clipboardWrite");
    });

    cy.get("button").contains("Copy JSON").click();
    cy.get("@clipboardWrite").should("have.been.called");
  });

  it("should reset onboarding", () => {
    cy.get("button").contains("Reset").click();
    cy.get("h1").should("contain", "Welcome to FinFix");
  });

  it("should show completion status", () => {
    cy.get("div").should("contain", "Status:");
    cy.get("div").should("contain", "Completed");
  });

  it("should show current step information", () => {
    cy.get("div").should("contain", "Current Step:");
  });
});
