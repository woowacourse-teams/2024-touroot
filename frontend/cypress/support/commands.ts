import { CYPRESS_SELECTOR_MAP } from "../../src/constants/cypress";
import { ROUTE_PATHS_MAP } from "../../src/constants/route";

Cypress.Commands.add("simulateKakaoLogin", () => {
  const mockCode = "mock_auth_code";
  const redirectUri = encodeURIComponent(
    `${Cypress.config().baseUrl}${ROUTE_PATHS_MAP.loginCallback}`,
  );

  cy.intercept("POST", "**/login/oauth/kakao*", (req) => {
    req.reply({
      statusCode: 200,
      body: {
        accessToken: Cypress.env("ACCESS_TOKEN"),
        refreshToken: Cypress.env("REFRESH_TOKEN"),
        memberId: Cypress.env("MEMBER_ID"),
      },
    });
  }).as("loginOauthRequest");

  cy.visit(`${ROUTE_PATHS_MAP.loginCallback}?code=${mockCode}&redirectUri=${redirectUri}`);

  cy.wait("@loginOauthRequest");

  cy.url().should("eq", `${Cypress.config().baseUrl}${ROUTE_PATHS_MAP.main}`);
});

Cypress.Commands.add("fillTravelPlanBasicInfo", (title, date) => {
  cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.titleInput).type(title);
  cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.startDateInput).click({ force: true });
  cy.contains(CYPRESS_SELECTOR_MAP.calendar.dayCell, date).click({ force: true });
  cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.addDateButton).click();
});

Cypress.Commands.add("addPlace", (placeName) => {
  cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.addPlaceButton).click({ force: true });
  cy.get(CYPRESS_SELECTOR_MAP.googleSearchPopup.searchInput).type(placeName);
  cy.get(".pac-item").first().click();
});

Cypress.Commands.add("addTodo", (todoText) => {
  cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.addTodoButton).click({ force: true });
  cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.todoInput).type(todoText);
});

Cypress.Commands.add("submitTravelPlan", () => {
  cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.registerButton).click({ force: true });
  cy.get(CYPRESS_SELECTOR_MAP.modalBottomSheet.container).should("exist");
  cy.get(CYPRESS_SELECTOR_MAP.modalBottomSheet.confirmButton).click({ force: true });
});
