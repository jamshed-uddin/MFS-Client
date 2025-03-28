describe("login page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should successfully login and redirect to /wallet", () => {
    cy.get('input[name="emailOrMobileNumber"]').type("levik@gmail.com");
    cy.get('input[name="pin"]').type("23456");
    cy.intercept("POST", "http://localhost:8000/api/users/login").as(
      "loginRequest"
    );
    cy.get("button").contains("Login").click();
    // cy.url().should("include", "/wallet");
    cy.wait("@loginRequest");
    cy.url().should("include", "/wallet");
  });
});
