package woowacourse.touroot.travelogue.fixture;

import static woowacourse.touroot.place.fixture.PlaceFixture.PLACE;
import static woowacourse.touroot.travelogue.fixture.TravelogueDayFixture.TRAVELOGUE_DAY;

import woowacourse.touroot.place.domain.Place;
import woowacourse.touroot.travelogue.domain.TravelogueDay;
import woowacourse.touroot.travelogue.domain.TraveloguePlace;

public enum TraveloguePlaceFixture {

    TRAVELOGUE_PLACE(1, "에메랄드 빛 해변", PLACE.get(), TRAVELOGUE_DAY.get());

    private final int order;
    private final String description;
    private final Place place;
    private final TravelogueDay day;

    TraveloguePlaceFixture(int order, String description, Place place, TravelogueDay day) {
        this.order = order;
        this.description = description;
        this.place = place;
        this.day = day;
    }

    public TraveloguePlace get() {
        return new TraveloguePlace(order, description, place, day);
    }

    public TraveloguePlace create(Place place, TravelogueDay day) {
        return new TraveloguePlace(order, description, place, day);
    }
}
