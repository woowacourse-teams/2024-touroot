package kr.touroot.travelplan.fixture;

import kr.touroot.travelplan.domain.TravelPlanDay;
import kr.touroot.travelplan.domain.TravelPlanPlace;

public enum TravelPlanPlaceFixture {

    TRAVEL_PLAN_PLACE(0, TravelPlanDayFixture.TRAVEL_PLAN_DAY.get(), "함덕 해수욕장", "34.54343", "126.66977");

    private final Integer order;
    private final TravelPlanDay travelPlanDay;
    private final String name;
    private final String latitude;
    private final String longitude;

    TravelPlanPlaceFixture(Integer order, TravelPlanDay day, String name, String latitude, String longitude) {
        this.order = order;
        this.travelPlanDay = day;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public TravelPlanPlace get() {
        return new TravelPlanPlace(order, travelPlanDay, name, latitude, longitude);
    }
}
