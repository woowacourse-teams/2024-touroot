package kr.touroot.travelplan.fixture;

import kr.touroot.travelplan.domain.TravelPlaceTodo;
import kr.touroot.travelplan.domain.TravelPlanPlace;
import kr.touroot.travelplan.dto.request.PlanPlaceTodoRequest;

public enum TravelPlaceTodoFixture {

    TAKE_PHOTOS("사진 찍기", 1, false),
    BUY_LOCAL_SNACKS("현지 간식 구매하기", 2, false),
    ENJOY_SUNSET("일몰 감상하기", 3, false),
    TRY_LOCAL_FOOD("현지 음식 맛보기", 4, false),
    VISIT_MARKET("시장 구경하기", 5, false),
    WRITE_TRAVEL_NOTES("여행 노트 작성하기", 6, false),
    RELAX_IN_CAFE("카페에서 쉬기", 7, false),
    EXPLORE_ON_FOOT("도보로 탐험하기", 8, false),
    CHAT_WITH_LOCALS("현지인과 대화하기", 9, false),
    TAKE_PUBLIC_TRANSPORT("대중교통 이용해보기", 10, false),
    BUY_SOUVENIRS("기념품 사기", 11, false),
    PLAN_NEXT_DAY("다음 날 일정 계획하기", 12, false);

    private final String content;
    private final Integer order;
    private final Boolean isChecked;

    TravelPlaceTodoFixture(String content, Integer order, Boolean isChecked) {
        this.content = content;
        this.order = order;
        this.isChecked = isChecked;
    }

    public TravelPlaceTodo getTravelPlaceTodoIncludedIn(TravelPlanPlace travelPlanPlace) {
        return new TravelPlaceTodo(travelPlanPlace, content, order, isChecked);
    }

    public PlanPlaceTodoRequest getCreateRequest() {
        return new PlanPlaceTodoRequest(content, isChecked);
    }
}
