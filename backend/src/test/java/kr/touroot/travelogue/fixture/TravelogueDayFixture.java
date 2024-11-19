package kr.touroot.travelogue.fixture;

import static kr.touroot.travelogue.fixture.TravelogueFixture.JEJU_TRAVELOGUE;

import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueDay;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum TravelogueDayFixture {

    FIRST_DAY(1, JEJU_TRAVELOGUE.getTravelogue());

    private final int order;
    private final Travelogue travelogue;

    public TravelogueDay getTravelogueDay() {
        return new TravelogueDay(order, travelogue);
    }

    public TravelogueDay getTravelogueDayIncludedIn(Travelogue travelogue) {
        return new TravelogueDay(order, travelogue);
    }
}
