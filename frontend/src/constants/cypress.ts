import { generateSelectors } from "@utils/cypress";

export const CYPRESS_DATA_MAP = {
  travelPlanRegister: {
    titleInput: "title-input",
    startDateInput: "start-date-input",
    addDateButton: "add-date-button",
    addPlaceButton: "add-place-button",
    addTodoButton: "add-todo-button",
    todoInput: "todo-input",
    deleteTodoButton: "delete-todo-button",
    travelPlanDayAccordion: "travel-plan-day-accordion",
    registerButton: "register-button",
  },

  main: {
    travelogueItem: "travelogue-item",
  },

  calendar: {
    headTitle: "head-title",
    dayCell: "day-cell",
    previousMonthMoveButton: "previous-month-move-button",
    nextMonthMoveButton: "next-month-move-button",
  },

  chip: "chip",

  accordion: {
    item: "accordion-item",
    trigger: {
      deleteButton: "delete-button",
    },
  },

  googleSearchPopup: {
    container: "container",
    searchInput: "search-input",
  },

  modalBottomSheet: {
    container: "container",
    confirmButton: "confirm-button",
    closeButton: "close-button",
  },
} as const;

export const CYPRESS_SELECTOR_MAP = generateSelectors(CYPRESS_DATA_MAP);
