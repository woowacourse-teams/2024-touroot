package kr.touroot.travelogue.fixture;

import static kr.touroot.place.fixture.PlaceFixture.PLACE;
import static kr.touroot.travelogue.fixture.TravelogueDayFixture.TRAVELOGUE_DAY;

import kr.touroot.place.domain.Place;
import kr.touroot.travelogue.domain.TravelogueDay;
import kr.touroot.travelogue.domain.TraveloguePlace;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum TraveloguePlaceFixture {

    TRAVELOGUE_PLACE(1, "에메랄드 빛 해변", PLACE.get(), TRAVELOGUE_DAY.get());

    private final int order;
    private final String description;
    private final Place place;
    private final TravelogueDay day;

    public TraveloguePlace get() {
        return new TraveloguePlace(order, description, place, day);
    }

    public TraveloguePlace create(Place place, TravelogueDay day) {
        return new TraveloguePlace(order, description, place, day);
    }
}
