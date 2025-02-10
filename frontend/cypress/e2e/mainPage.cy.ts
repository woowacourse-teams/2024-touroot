import travelogueData from "@mocks/data/travelogue.json";

import { CYPRESS_SELECTOR_MAP } from "@constants/cypress";
import { ROUTE_PATHS_MAP } from "@constants/route";

describe("메인 페이지 테스트", () => {
  beforeEach(() => {
    cy.intercept("GET", `${Cypress.env("BASE_URL")}travelogues*`, (req) => {
      const page = (req.query.page === "0" ? 1 : req.query.page) as number;
      const pageSize = 5;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;

      const paginatedData = travelogueData.slice(start, end);

      req.reply({
        statusCode: 200,
        body: {
          content: paginatedData,
        },
      });
    }).as("getTravelogues");

    cy.visit(ROUTE_PATHS_MAP.main);
  });

  describe("여행기 무한 스크롤 테스트", () => {
    it("메인 페이지로 진입했을때 보여지는 여행기는 총 5개이다.", () => {
      // when
      cy.wait("@getTravelogues").then(() => {
        // then
        cy.get(CYPRESS_SELECTOR_MAP.main.travelogueItem, { timeout: 10000 }).should(
          "have.length",
          5,
        );
      });
    });

    it("스크롤을 내릴 경우 보여지는 여행기는 총 10개이다.", () => {
      // when
      cy.wait("@getTravelogues");
      cy.scrollTo("bottom");
      cy.wait("@getTravelogues");

      // then
      cy.get(CYPRESS_SELECTOR_MAP.main.travelogueItem).should("have.length", 10);
    });
  });

  describe("태그 관련 테스트", () => {
    const SELECTED_CHIP_SELECTOR = '[data-cy="selected-chip"]';

    it("태그 선택 및 해제가 가능해야한다.", () => {
      // when
      cy.contains("여름").click();

      // then
      cy.get(SELECTED_CHIP_SELECTOR).should("have.length", 1);

      // when
      cy.contains("여름").click();

      // then
      cy.get(SELECTED_CHIP_SELECTOR).should("have.length", 0);
    });

    it("최대 태그 선택은 3개까지 가능하다.", () => {
      // when
      cy.contains("여름").click();
      cy.contains("가족").click();
      cy.contains("도보").click();

      // then
      cy.get(SELECTED_CHIP_SELECTOR).should("have.length", 3);

      // when
      cy.contains("맛집").click();

      // then
      cy.get(SELECTED_CHIP_SELECTOR).should("have.length", 3);
    });
  });
});
