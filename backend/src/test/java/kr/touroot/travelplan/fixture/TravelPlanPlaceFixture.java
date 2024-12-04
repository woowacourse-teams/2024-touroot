package kr.touroot.travelplan.fixture;

import kr.touroot.travelplan.domain.TravelPlanDay;
import kr.touroot.travelplan.domain.TravelPlanPlace;

public enum TravelPlanPlaceFixture {

    HAMDEOK_BEACH(
            1,
            "함덕 해수욕장",
            "34.54343",
            "126.66977",
            "KR"
    ),
    SEONGSAN_ILCHULBONG(
            2,
            "성산 일출봉",
            "33.45837",
            "126.93695",
            "KR"
    ),
    JEJU_FOLK_VILLAGE(
            3,
            "제주 민속촌",
            "33.43234",
            "126.82845",
            "KR"
    ),
    MANJANG_CAVE(
            4,
            "만장굴",
            "33.53123",
            "126.76689",
            "KR"
    ),
    HALLASAN(
            5,
            "한라산",
            "33.36214",
            "126.53326",
            "KR"
    ),
    TRAVEL_PLAN_PLACE_WITH_NONE_COUNTRY_CODE(
            6,
            "함덕",
            "34.54343",
            "126.66977",
            "NONE"
    ),
    ;

    private final Integer order;
    private final String name;
    private final String latitude;
    private final String longitude;
    private final String countryCode;

    TravelPlanPlaceFixture(Integer order, String name, String latitude, String longitude, String countryCode) {
        this.order = order;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.countryCode = countryCode;
    }

    public TravelPlanPlace getTravelPlanPlaceIncludedIn(TravelPlanDay travelPlanDay) {
        return new TravelPlanPlace(order, travelPlanDay, name, latitude, longitude, countryCode);
    }
}
