package kr.touroot.travelogue.fixture;

import static kr.touroot.travelogue.fixture.TravelogueDayFixture.TRAVELOGUE_DAY;

import kr.touroot.travelogue.domain.TravelogueDay;
import kr.touroot.travelogue.domain.TraveloguePlace;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum TraveloguePlaceFixture {

    TRAVELOGUE_PLACE(1, "에메랄드 빛 해변", "함덕 해수욕장", "34.54343", "126.66977", TRAVELOGUE_DAY.get()),
    ;

    private final int order;
    private final String description;
    private final String name;
    private final String latitude;
    private final String longitude;
    private final TravelogueDay day;

    public TraveloguePlace get() {
        return new TraveloguePlace(order, description, name, latitude, longitude, day);
    }

    public TraveloguePlace create(TravelogueDay day) {
        return new TraveloguePlace(order, description, name, latitude, longitude, day);
    }
}
