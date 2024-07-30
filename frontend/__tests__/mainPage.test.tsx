import { waitFor } from "@testing-library/react";

import { createInfiniteTravelogueHook } from "./utils/createInfiniteTravelogueHook";

describe("메인 페이지", () => {
  describe("여행기 무한 스크롤 확인", () => {
    it("메인 페이지로 진입했을때 보여지는 여행기는 총 5개이다.", async () => {
      const { result } = createInfiniteTravelogueHook();
      await waitFor(() => {
        expect(result.current.status).toMatch("success");
        expect(result.current.travelogues.length).toBe(5);
      });
    });

    it("다음 페이지로 이동할 경우 보여지는 여행기는 총 10개이다.", async () => {
      const { result } = createInfiniteTravelogueHook();

      await waitFor(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.status).toMatch("success");
        expect(result.current.travelogues.length).toBe(10);
      });
    });

    it("마지막 페이지로 이동할 경우 더 이상 콘텐츠를 확인할 수 없다.", async () => {
      const { result } = createInfiniteTravelogueHook();

      await waitFor(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.status).toMatch("success");
        expect(result.current.hasNextPage).toBeFalsy();
      });
    });
  });
});
