package kr.touroot.travelplan.fixture;

import kr.touroot.place.domain.Place;
import kr.touroot.place.fixture.PlaceFixture;
import kr.touroot.travelplan.domain.TravelPlanDay;
import kr.touroot.travelplan.domain.TravelPlanPlace;

public enum TravelPlanPlaceFixture {

    TRAVEL_PLAN_PLACE("함덕 해수욕장 조아요!", 0, TravelPlanDayFixture.TRAVEL_PLAN_DAY.get(), PlaceFixture.PLACE.get());

    private final String description;
    private final Integer order;
    private final TravelPlanDay travelPlanDay;
    private final Place place;

    TravelPlanPlaceFixture(String description, Integer order, TravelPlanDay travelPlanDay, Place place) {
        this.description = description;
        this.order = order;
        this.travelPlanDay = travelPlanDay;
        this.place = place;
    }

    public TravelPlanPlace get() {
        return new TravelPlanPlace(order, travelPlanDay, place);
    }
}
