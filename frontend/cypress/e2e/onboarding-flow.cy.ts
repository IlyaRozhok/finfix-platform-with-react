describe("Onboarding Flow", () => {
  beforeEach(() => {
    cy.visitOnboarding();
  });

  it("should complete the entire onboarding flow", () => {
    // Step 1: Welcome Step
    cy.get("h1").should("contain", "Welcome to FinFix");
    cy.get("button").contains("Get started").click();

    // Step 2: Currency Selection
    cy.url().should("include", "/onboarding");
    cy.get("h1").should("contain", "Choose your primary currency");

    // Test currency search functionality
    cy.get('input[placeholder="Search currencies..."]').type("USD");
    cy.get('[data-value="USD"]').should("be.visible");
    cy.get('[data-value="USD"]').click();

    // Verify currency is selected
    cy.get('[data-cy="currency-select"]').should("contain", "🇺🇸 USD");
    cy.get("button").contains("Continue").click();

    // Step 3: Income Step
    cy.get("h1").should("contain", "Monthly Income");

    // Fill income form
    cy.get('[data-cy="income-source"]').select("salary");
    cy.get('[data-cy="income-amount"]').type("5000");
    cy.get('[data-cy="income-start-date"]').type("2024-01-01");
    cy.get("button").contains("Continue").click();

    // Step 4: Expenses Step
    cy.get("h1").should("contain", "Fixed Expenses");

    // Add some expenses
    cy.addExpense({
      category_name: "Rent",
      amount: 1200,
      description: "Monthly rent payment",
    });

    cy.addExpense({
      category_name: "Utilities",
      amount: 300,
      description: "Electricity, water, gas",
    });

    // Verify expenses are added
    cy.get('[data-cy="expenses-list"]').should("contain", "Rent");
    cy.get('[data-cy="expenses-list"]').should("contain", "Utilities");
    cy.get('[data-cy="expenses-list"]').should("contain", "$1,200");
    cy.get('[data-cy="expenses-list"]').should("contain", "$300");

    cy.get("button").contains("Continue").click();

    // Step 5: Debts Step
    cy.get("h1").should("contain", "Loans & Credits");

    // Add a debt
    cy.addDebt({
      debt_type: "credit_card",
      description: "Credit card debt",
      total_debt: 2500,
      interest_rate_monthly: 18,
      start_date: "2024-01-01",
    });

    // Verify debt is added
    cy.get('[data-cy="debts-list"]').should("contain", "Credit Card");
    cy.get('[data-cy="debts-list"]').should("contain", "$2,500");

    cy.get("button").contains("Continue").click();

    // Step 6: Summary Step
    cy.get("h1").should("contain", "Onboarding Summary");

    // Verify all data is displayed correctly
    cy.get('[data-cy="summary-currency"]').should("contain", "USD");
    cy.get('[data-cy="summary-income"]').should("contain", "$5,000");
    cy.get('[data-cy="summary-expenses"]').should("contain", "$1,500");
    cy.get('[data-cy="summary-debts"]').should("contain", "$2,500");

    // Test copy JSON functionality
    cy.get("button").contains("Copy JSON").click();

    // Test reset functionality
    cy.get("button").contains("Reset").click();
    cy.get("h1").should("contain", "Welcome to FinFix");
  });

  it("should handle currency search and selection", () => {
    cy.get("button").contains("Get started").click();

    // Test search functionality
    cy.get('input[placeholder="Search currencies..."]').type("EUR");
    cy.get('[data-value="EUR"]').should("be.visible");
    cy.get('[data-value="EUR"]').click();

    // Verify selection
    cy.get('[data-cy="currency-select"]').should("contain", "🇪🇺 EUR");

    // Test popular currencies section
    cy.get('input[placeholder="Search currencies..."]').clear();
    cy.get('[data-cy="popular-currencies"]').should("be.visible");
    cy.get('[data-value="USD"]').click();
    cy.get('[data-cy="currency-select"]').should("contain", "🇺🇸 USD");
  });

  it("should validate income form", () => {
    cy.get("button").contains("Get started").click();
    cy.get("button").contains("Continue").click();

    // Try to continue without filling form
    cy.get("button").contains("Continue").click();

    // Should show validation errors
    cy.get('[data-cy="income-errors"]').should("be.visible");

    // Fill form correctly
    cy.get('[data-cy="income-source"]').select("salary");
    cy.get('[data-cy="income-amount"]').type("5000");
    cy.get('[data-cy="income-start-date"]').type("2024-01-01");
    cy.get("button").contains("Continue").click();

    // Should proceed to next step
    cy.get("h1").should("contain", "Fixed Expenses");
  });

  it("should add and remove expenses", () => {
    cy.get("button").contains("Get started").click();
    cy.get("button").contains("Continue").click();
    cy.get("button").contains("Continue").click();

    // Add expense
    cy.addExpense({
      category_name: "Rent",
      amount: 1200,
      description: "Monthly rent",
    });

    // Verify expense is added
    cy.get('[data-cy="expenses-list"]').should("contain", "Rent");

    // Remove expense
    cy.get('[data-cy="remove-expense-btn"]').first().click();

    // Verify expense is removed
    cy.get('[data-cy="expenses-list"]').should("not.contain", "Rent");
  });

  it("should add and remove debts", () => {
    cy.get("button").contains("Get started").click();
    cy.get("button").contains("Continue").click();
    cy.get("button").contains("Continue").click();
    cy.get("button").contains("Continue").click();

    // Add debt
    cy.addDebt({
      debt_type: "personal_loan",
      description: "Personal loan",
      total_debt: 10000,
      interest_rate_monthly: 12,
      start_date: "2024-01-01",
    });

    // Verify debt is added
    cy.get('[data-cy="debts-list"]').should("contain", "Personal Loan");

    // Remove debt
    cy.get('[data-cy="remove-debt-btn"]').first().click();

    // Verify debt is removed
    cy.get('[data-cy="debts-list"]').should("not.contain", "Personal Loan");
  });

  it("should navigate back and forth between steps", () => {
    cy.get("button").contains("Get started").click();

    // Go to currency step
    cy.get('[data-cy="currency-select"]').click();
    cy.get('[data-value="USD"]').click();
    cy.get("button").contains("Continue").click();

    // Go back to currency step
    cy.get("button").contains("Back").click();
    cy.get("h1").should("contain", "Choose your primary currency");

    // Go forward again
    cy.get("button").contains("Continue").click();
    cy.get("h1").should("contain", "Monthly Income");
  });

  it("should show progress indicator", () => {
    cy.get("button").contains("Get started").click();

    // Progress should not be visible on welcome step
    cy.get('[data-cy="progress-bar"]').should("not.exist");

    // Go to currency step
    cy.get('[data-cy="currency-select"]').click();
    cy.get('[data-value="USD"]').click();
    cy.get("button").contains("Continue").click();

    // Progress should be visible
    cy.get('[data-cy="progress-bar"]').should("be.visible");
    cy.get('[data-cy="progress-text"]').should("contain", "Step 1 of 4");
  });
});
