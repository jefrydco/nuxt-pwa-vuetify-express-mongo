describe("App Flow", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("input[name='name']").as("name");
    cy.get("input[name='quantity']").as("quantity");
    cy.get("input[name='price']").as("price");
    cy.get("input[name='expirationDate']").as("expirationDate");
  });

  it("Store", () => {
    cy.get("@name")
      .clear()
      .type("Pillow");
    cy.get("@quantity")
      .clear()
      .type("100");
    cy.get("@price")
      .clear()
      .type("10000");
    cy.get("@expirationDate").click();
    cy.get(".v-picker .v-btn--outline").click();
    cy.get(".v-picker .v-btn")
      .contains("OK")
      .click();
    cy.get(".v-btn")
      .contains("Add")
      .click();
  });

  it("Update", () => {
    cy.get(".v-btn__custom--edit[data-index='0']").click();
    cy.get("@name")
      .clear()
      .type("Sleeping Bag");
    cy.get("@quantity")
      .clear()
      .type("70");
    cy.get("@price")
      .clear()
      .type("30000");
    cy.get(".v-btn")
      .contains("Edit")
      .click();
  });

  it("Search", () => {
    cy.get("input[name='search']")
      .clear()
      .type("Test");
    cy.get("td").contains("No matching records found");
    cy.get("input[name='search']")
      .clear()
      .type("Sleeping Bag");
    cy.get("td").contains("Sleeping Bag");
  });

  it("Delete", () => {
    cy.get(".v-btn__custom--delete[data-index='0']").click();
    cy.get(".v-btn__custom--delete-dialog").click();
  });
});
