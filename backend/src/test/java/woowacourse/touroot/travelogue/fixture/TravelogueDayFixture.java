package woowacourse.touroot.travelogue.fixture;

import static woowacourse.touroot.travelogue.fixture.TravelogueFixture.TRAVELOGUE;

import woowacourse.touroot.travelogue.domain.Travelogue;
import woowacourse.touroot.travelogue.domain.TravelogueDay;

public enum TravelogueDayFixture {

    TRAVELOGUE_DAY(1, TRAVELOGUE.get());

    private final int order;
    private final Travelogue travelogue;

    TravelogueDayFixture(int order, Travelogue travelogue) {
        this.order = order;
        this.travelogue = travelogue;
    }

    public TravelogueDay get() {
        return new TravelogueDay(order, travelogue);
    }

    public TravelogueDay create(int order, Travelogue travelogue) {
        return new TravelogueDay(order, travelogue);
    }
}
