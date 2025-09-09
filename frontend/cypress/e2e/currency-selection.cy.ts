describe("Currency Selection", () => {
  beforeEach(() => {
    cy.visitOnboarding();
    cy.get("button").contains("Get started").click();
  });

  it("should display currency selection step", () => {
    cy.get("h1").should("contain", "Choose your primary currency");
    cy.get('[data-cy="currency-select"]').should("be.visible");
    cy.get('input[placeholder="Search currencies..."]').should("be.visible");
  });

  it("should show popular currencies by default", () => {
    cy.get('[data-cy="popular-currencies"]').should("be.visible");
    cy.get('[data-value="USD"]').should("be.visible");
    cy.get('[data-value="EUR"]').should("be.visible");
    cy.get('[data-value="UAH"]').should("be.visible");
  });

  it("should search and filter currencies", () => {
    // Search for USD
    cy.get('input[placeholder="Search currencies..."]').type("USD");
    cy.get('[data-value="USD"]').should("be.visible");
    cy.get('[data-value="EUR"]').should("not.exist");

    // Clear search
    cy.get('input[placeholder="Search currencies..."]').clear();
    cy.get('[data-value="EUR"]').should("be.visible");
  });

  it("should select a currency and display it", () => {
    cy.get('[data-cy="currency-select"]').click();
    cy.get('[data-value="USD"]').click();
    cy.get('[data-cy="currency-select"]').should("contain", "🇺🇸 USD");
  });

  it("should validate currency selection", () => {
    // Try to continue without selecting currency
    cy.get("button").contains("Continue").click();
    cy.get("p").should("contain", "Please select a currency to continue");
  });

  it("should allow currency change", () => {
    // Select USD first
    cy.get('[data-cy="currency-select"]').click();
    cy.get('[data-value="USD"]').click();
    cy.get('[data-cy="currency-select"]').should("contain", "🇺🇸 USD");

    // Change to EUR
    cy.get('[data-cy="currency-select"]').click();
    cy.get('[data-value="EUR"]').click();
    cy.get('[data-cy="currency-select"]').should("contain", "🇪🇺 EUR");
  });

  it("should show no results message for invalid search", () => {
    cy.get('input[placeholder="Search currencies..."]').type("INVALID");
    cy.get("div").should("contain", 'No currencies found for "INVALID"');
  });
});
