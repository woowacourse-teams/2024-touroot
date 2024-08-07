import { act } from "react";

import { renderHook, waitFor } from "@testing-library/react";

import { TravelPlanPlace } from "@type/domain/travelPlan";

import { useTravelPlanDays } from "@hooks/pages/useTravelPlanDays";
import useCalendar from "@hooks/useCalendar";

import { createTravelPlanRegisterHook } from "./utils/createTravelPlanRegisterHook";

const TEST_UUID = "test_uuid";
const TEST_DATE = new Date(2023, 7, 15); // 2023년 8월 15일
const REGISTER_TRAVEL_PLAN = {
  title: "서울 탐험",
  startDate: "2024-08-03",
  days: [
    {
      id: TEST_UUID,
      places: [
        {
          id: TEST_UUID,
          placeName: "경복궁",
          position: {
            lat: 37.5796,
            lng: 126.977,
          },
          description: "조선 시대에 지어진 다섯 개의 궁궐 중 가장 큰 궁궐입니다.",
        },
      ],
    },
  ],
};

jest.mock("uuid", () => ({
  v4: () => TEST_UUID,
}));

describe("여행 계획 등록 페이지 테스트", () => {
  describe("시작일 입력 테스트", () => {
    it("사용자는 다음 달에 해당되는 캘린더를 확인할 수 있어야한다.", () => {
      // given
      const { result } = renderHook(() => useCalendar(TEST_DATE));

      // when
      act(() => {
        result.current.onMoveNextMonth();
      });

      // then
      expect(result.current.calendarDetail.year).toBe(2023);
      expect(result.current.calendarDetail.month).toBe(8); // 9월
    });

    it("사용자는 이전 달에 해당되는 캘린더를 확인할 수 있다.", () => {
      // given
      const { result } = renderHook(() => useCalendar(TEST_DATE));

      // when
      act(() => {
        result.current.onMovePreviousMonth();
      });

      // then
      expect(result.current.calendarDetail.year).toBe(2023);
      expect(result.current.calendarDetail.month).toBe(6); // 7월
    });

    it("2023년 12월 15일에서 다음 달로 넘어갈 경우 다음 년도로 넘어갈 수 있어야한다.", () => {
      // given
      const yearEndDate = new Date(2023, 11, 15); // 2023년 12월 15일
      const { result } = renderHook(() => useCalendar(yearEndDate));

      // when
      act(() => {
        result.current.onMoveNextMonth();
      });

      // then
      expect(result.current.calendarDetail.year).toBe(2024);
      expect(result.current.calendarDetail.month).toBe(0); // 1월
    });
  });

  describe("여행 계획 Day & Place 관련 테스트", () => {
    test("사용자는 Day를 추가할 수 있다.", () => {
      // given
      const { result } = renderHook(() => useTravelPlanDays([]));

      // when
      act(() => {
        result.current.onAddDay();
      });

      // then
      expect(result.current.travelPlanDays).toHaveLength(1);
      expect(result.current.travelPlanDays[0]).toEqual({ id: TEST_UUID, places: [] });
    });

    test("사용자는 Day를 삭제할 수 있다.", () => {
      // given
      const { result } = renderHook(() => useTravelPlanDays([]));

      // when
      act(() => {
        result.current.onDeleteDay(0);
      });

      // then
      expect(result.current.travelPlanDays).toHaveLength(0);
    });

    test("사용자는 1일차에 '경복궁'이라는 장소를 추가할 수 있다.", () => {
      // given
      const { result } = renderHook(() => useTravelPlanDays([]));
      const newPlace: Pick<TravelPlanPlace, "placeName" | "position"> = {
        placeName: "경복궁",
        position: {
          lat: 37.5796,
          lng: 126.977,
        },
      };

      // when
      act(() => {
        result.current.onAddDay();
      });

      act(() => {
        result.current.onAddPlace(0, newPlace);
      });

      // then
      expect(result.current.travelPlanDays[0].places).toHaveLength(1);
      expect(result.current.travelPlanDays[0].places[0]).toEqual({ ...newPlace, id: TEST_UUID });
    });

    test("사용자는 추가한 경복궁을 삭제할 수 있다.", () => {
      // given
      const { result } = renderHook(() => useTravelPlanDays([]));
      const newPlace: Pick<TravelPlanPlace, "placeName" | "position"> = {
        placeName: "경복궁",
        position: {
          lat: 37.5796,
          lng: 126.977,
        },
      };

      // when
      act(() => {
        result.current.onAddDay();
      });

      act(() => {
        result.current.onAddPlace(0, newPlace);
      });

      act(() => {
        result.current.onDeletePlace(0, 0);
      });

      // then
      expect(result.current.travelPlanDays[0].places).toHaveLength(0);
    });

    test("장소 설명을 변경할 수 있다.", () => {
      // given
      const { result } = renderHook(() => useTravelPlanDays([]));
      const newDescription = "경복궁 너무 좋았다!";

      const newPlace: Pick<TravelPlanPlace, "placeName" | "position"> = {
        placeName: "경복궁",
        position: {
          lat: 37.5796,
          lng: 126.977,
        },
      };

      // when
      act(() => {
        result.current.onAddDay();
      });

      act(() => {
        result.current.onAddPlace(0, newPlace);
      });

      act(() => {
        result.current.onChangePlaceDescription(newDescription, 0, 0);
      });

      // then
      expect(result.current.travelPlanDays[0].places[0].description).toBe(newDescription);
    });
  });

  describe("여행 계획 등록 테스트", () => {
    test("사용자는 여행 계획을 등록할 수 있다.", async () => {
      // given
      const { result } = createTravelPlanRegisterHook();

      // when
      await waitFor(async () => {
        const { status } = await result.current.mutateAsync(REGISTER_TRAVEL_PLAN);

        // then
        expect(status).toBe(201);
      });
    });
  });
});
