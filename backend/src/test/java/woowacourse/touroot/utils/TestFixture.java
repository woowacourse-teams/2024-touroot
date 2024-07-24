package woowacourse.touroot.utils;

import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import woowacourse.touroot.place.domain.Place;
import woowacourse.touroot.place.repository.PlaceRepository;
import woowacourse.touroot.travelplan.domain.TravelPlan;
import woowacourse.touroot.travelplan.domain.TravelPlanDay;
import woowacourse.touroot.travelplan.domain.TravelPlanPlace;
import woowacourse.touroot.travelplan.repository.TravelPlanDayRepository;
import woowacourse.touroot.travelplan.repository.TravelPlanPlaceRepository;
import woowacourse.touroot.travelplan.repository.TravelPlanRepository;

@Component
public class TestFixture {

    @Autowired
    private PlaceRepository placeRepository;

    @Autowired
    private TravelPlanRepository travelPlanRepository;
    @Autowired
    private TravelPlanDayRepository travelPlanDayRepository;
    @Autowired
    private TravelPlanPlaceRepository travelPlanPlaceRepository;


    public static Place getPlace(String name, String latitude, String longitude, String googlePlaceId) {
        return new Place(name, latitude, longitude, googlePlaceId);
    }

    public static TravelPlan getTravelPlan(String title, LocalDate startDate) {
        return new TravelPlan(title, startDate);
    }

    public static TravelPlanDay getTravelPlanDay(int order, TravelPlan travelPlan) {
        return new TravelPlanDay(order, travelPlan);
    }

    public static TravelPlanPlace getTravelPlanPlace(String description, int order, Place place, TravelPlanDay day) {
        return new TravelPlanPlace(description, order, day, place);
    }

    public void initTravelPlanTestData() {
        TravelPlan travelPlan = getTravelPlan("여행계획", LocalDate.MAX);
        TravelPlanDay travelPlanDay = getTravelPlanDay(0, travelPlan);
        Place place = getPlace("장소", "37.5175896", "127.0867236", "");
        TravelPlanPlace travelPlanPlace = getTravelPlanPlace("설명", 0, place, travelPlanDay);

        travelPlanRepository.save(travelPlan);
        travelPlanDayRepository.save(travelPlanDay);
        placeRepository.save(place);
        travelPlanPlaceRepository.save(travelPlanPlace);
    }
}
