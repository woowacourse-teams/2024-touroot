declare namespace Cypress {
  interface Chainable {
    simulateKakaoLogin(): Chainable<Element>;
    fillTravelPlanBasicInfo(title: string, date: number): Chainable<Element>;
    addPlace(placeName: string): Chainable<Element>;
    addTodo(todoText: string): Chainable<Element>;
    submitTravelPlan(): Chainable<Element>;
  }
}
