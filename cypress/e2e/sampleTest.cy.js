describe("Transaction form test", () => {
  it("loads transaction form", () => {
    cy.visit("http://localhost:3000");
    cy.get("form").should("exist");
  });
});
