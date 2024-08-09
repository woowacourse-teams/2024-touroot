package kr.touroot.travelogue.fixture;

import static kr.touroot.travelogue.fixture.TravelogueFixture.TRAVELOGUE;

import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueDay;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum TravelogueDayFixture {

    TRAVELOGUE_DAY(1, TRAVELOGUE.get());

    private final int order;
    private final Travelogue travelogue;

    public TravelogueDay get() {
        return new TravelogueDay(order, travelogue);
    }

    public TravelogueDay create(int order, Travelogue travelogue) {
        return new TravelogueDay(order, travelogue);
    }
}
