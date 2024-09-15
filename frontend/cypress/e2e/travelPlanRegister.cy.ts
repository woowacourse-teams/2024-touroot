/* eslint-disable jest/expect-expect */
import { CYPRESS_SELECTOR_MAP } from "@constants/cypress";
import { ROUTE_PATHS_MAP } from "@constants/route";

describe("여행 계획 등록 테스트", () => {
  beforeEach(() => {
    cy.simulateKakaoLogin();
    cy.visit(ROUTE_PATHS_MAP.travelPlanRegister);
  });

  describe("제목 입력 테스트", () => {
    it("제목을 입력할 수 있다", () => {
      // given
      const INPUT_VALUE = "테스트 여행 계획";

      // when
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.titleInput).type(INPUT_VALUE);

      // then
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.titleInput).should("have.value", INPUT_VALUE);
    });

    it("제목을 17자 입력한 경우 총 제목 글자수가 17자이다.", () => {
      // given
      const INPUT_VALUE = "지니, 리버, 시모의 여행 계획";

      // when
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.titleInput).type(INPUT_VALUE);

      // then
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.titleInput).should("have.value", INPUT_VALUE);
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.titleInput)
        .invoke("val")
        .should("have.length", 17);
    });

    it("제목을 21자 입력한 경우 20자만 보여진다.", () => {
      // given
      const INPUT_VALUE = "지니, 리버, 시모의 여행 계획 세우기";
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.titleInput);

      // when
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.titleInput).type(INPUT_VALUE);

      // then
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.titleInput).should(
        "have.value",
        INPUT_VALUE.slice(0, 20),
      );
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.titleInput)
        .invoke("val")
        .should("have.length", 20);
    });
  });

  describe("시작 날짜 입력 테스트", () => {
    function formatDate(date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}. ${month}. ${day}`;
    }

    it("당일에 해당하는 시작일을 입력할 수 있다", () => {
      // given
      const today = new Date();
      const formattedDate = formatDate(today);
      const todayDate = today.getDate().toString();

      // when
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.startDateInput).click();
      cy.contains(CYPRESS_SELECTOR_MAP.calendar.dayCell, todayDate).click({ force: true });

      // then
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.startDateInput).should(
        "have.value",
        formattedDate,
      );
    });

    it("시작일은 지난 날짜를 추가할 수 없다", () => {
      // given
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayDate = yesterday.getDate().toString();

      // when
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.startDateInput).click();
      cy.contains(CYPRESS_SELECTOR_MAP.calendar.dayCell, yesterdayDate).click({
        force: true,
      });

      // then
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.startDateInput).should("have.value", "");
    });

    it("이전 달 버튼은 disable 처리되어 있어야한다.", () => {
      // when
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.startDateInput).click();

      // then
      cy.get(CYPRESS_SELECTOR_MAP.calendar.previousMonthMoveButton)
        .should("be.visible")
        .and("be.disabled");
    });

    it("다음 달 버튼을 클릭하면 다음 달에 해당되는 캘린더들이 보여져야한다.", () => {
      // given
      const today = new Date();
      const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      const lastDayOfNextMonth = new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth() + 1,
        0,
      ).getDate();

      // when
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.startDateInput).click();
      cy.get(CYPRESS_SELECTOR_MAP.calendar.nextMonthMoveButton).click();

      // then
      cy.get(CYPRESS_SELECTOR_MAP.calendar.headTitle).should("be.visible");
      cy.get(CYPRESS_SELECTOR_MAP.calendar.dayCell).contains("1").should("be.visible");
      cy.get(CYPRESS_SELECTOR_MAP.calendar.dayCell)
        .contains(lastDayOfNextMonth.toString())
        .should("be.visible");
      cy.get(CYPRESS_SELECTOR_MAP.calendar.previousMonthMoveButton).should("be.enabled");
    });
  });

  describe("여행 일자 아코디언 관련 테스트", () => {
    it("일자 추가 버튼을 눌러 다음 여행 날짜를 추가할 수 있다.", () => {
      // when
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.addDateButton).click();

      // then
      cy.get(CYPRESS_SELECTOR_MAP.accordion.item).should("exist").should("have.length", 1);
    });

    it("일자 삭제 버튼을 눌러 해당 일자를 삭제할 수 있다.", () => {
      // when
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.addDateButton).click();

      // then
      cy.get(CYPRESS_SELECTOR_MAP.accordion.item).should("exist");

      // when
      cy.get(CYPRESS_SELECTOR_MAP.accordion.trigger.deleteButton).click();

      // then
      cy.get(CYPRESS_SELECTOR_MAP.accordion.item).should("not.exist");
    });

    it.only("장소 추가하기 버튼을 누르고 장소를 추가할 수 있다.", () => {
      // given
      const INPUT_VALUE = "도쿄";

      // when
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.addDateButton).click();
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.addPlaceButton).click({ force: true });

      // then
      cy.get(CYPRESS_SELECTOR_MAP.googleSearchPopup.container).should("exist");

      // when
      cy.get(CYPRESS_SELECTOR_MAP.googleSearchPopup.searchInput).type(INPUT_VALUE);
      cy.get(".pac-item").first().click({ force: true });

      // then
      cy.get(CYPRESS_SELECTOR_MAP.googleSearchPopup.container).should("not.exist");
      cy.get(CYPRESS_SELECTOR_MAP.accordion.item).should("contain", INPUT_VALUE);
    });

    it("특정 장소를 제거할 수 있다", () => {
      // given
      const INPUT_VALUE = "도쿄";

      // when
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.addDateButton).click();
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.addPlaceButton).click({ force: true });
      cy.get(CYPRESS_SELECTOR_MAP.googleSearchPopup.searchInput).type(INPUT_VALUE);
      cy.get(".pac-item").first().click();

      cy.contains(CYPRESS_SELECTOR_MAP.accordion.item, INPUT_VALUE)
        .find(CYPRESS_SELECTOR_MAP.accordion.trigger.deleteButton)
        .click({ force: true });

      // then
      cy.get(CYPRESS_SELECTOR_MAP.accordion.item).should("not.contain", INPUT_VALUE);
    });

    it("장소 내 TO DO를 추가할 수 있다", () => {
      // given
      const INPUT_VALUE = "도쿄";
      const TODO_TEXT = "스시 먹기";

      // when
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.addDateButton).click();
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.addPlaceButton).click({ force: true });
      cy.get(CYPRESS_SELECTOR_MAP.googleSearchPopup.searchInput).type(INPUT_VALUE);
      cy.get(".pac-item").first().click();
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.addTodoButton).click({ force: true });
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.todoInput).type(TODO_TEXT);

      // then
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.todoInput).should("have.value", TODO_TEXT);
    });

    it("장소 내 TO DO를 삭제할 수 있다", () => {
      // given
      const INPUT_VALUE = "도쿄";

      // when
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.addDateButton).click();
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.addPlaceButton).click({ force: true });
      cy.get(CYPRESS_SELECTOR_MAP.googleSearchPopup.searchInput).type(INPUT_VALUE);
      cy.get(".pac-item").first().click();
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.addTodoButton).click({ force: true });
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.deleteTodoButton).click({ force: true });

      // then
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.todoInput).should("not.exist");
    });
  });

  describe("여행 계획 등록 관련 테스트", () => {
    it("등록 버튼을 누르면 여행 계획 등록이 가능하다.", () => {
      // given
      cy.intercept("POST", `${Cypress.env("BASE_URL")}/travel-plans`, {
        statusCode: 201,
      }).as("travelPlanRegisterRequest");

      const TITLE_INPUT_VALUE = "도쿄 여행";
      const TODAY_DATE = new Date().getDate();
      const PLACE_INPUT_VALUE = "도쿄 타워";
      const TODO_VALUE = "도쿄 타워 구경가기";

      // when
      cy.fillTravelPlanBasicInfo(TITLE_INPUT_VALUE, TODAY_DATE);
      cy.addPlace(PLACE_INPUT_VALUE);
      cy.addTodo(TODO_VALUE);
      cy.submitTravelPlan();

      // then
      cy.wait("@travelPlanRegisterRequest").then((interception) => {
        assert.equal(interception.response.statusCode, 201);
      });
    });

    it("취소 버튼을 누르면 여행 계획 등록이 취소된다.", () => {
      // given
      const TITLE_INPUT_VALUE = "도쿄 여행";
      const TODAY_DATE = new Date().getDate();
      const PLACE_INPUT_VALUE = "도쿄 타워";
      const TODO_VALUE = "도쿄 타워 구경가기";

      // when
      cy.fillTravelPlanBasicInfo(TITLE_INPUT_VALUE, TODAY_DATE);
      cy.addPlace(PLACE_INPUT_VALUE);
      cy.addTodo(TODO_VALUE);
      cy.get(CYPRESS_SELECTOR_MAP.travelPlanRegister.registerButton).click({ force: true });

      // then
      cy.get(CYPRESS_SELECTOR_MAP.modalBottomSheet.container).should("exist");

      // when
      cy.get(CYPRESS_SELECTOR_MAP.modalBottomSheet.closeButton).click({ force: true });

      // then
      cy.get(CYPRESS_SELECTOR_MAP.modalBottomSheet.container).should("not.exist");
    });
  });
});
