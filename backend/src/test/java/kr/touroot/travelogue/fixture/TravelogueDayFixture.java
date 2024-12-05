package kr.touroot.travelogue.fixture;

import java.util.List;
import kr.touroot.travelogue.domain.Travelogue;
import kr.touroot.travelogue.domain.TravelogueDay;
import kr.touroot.travelogue.dto.request.TravelogueDayRequest;
import kr.touroot.travelogue.dto.request.TraveloguePlaceRequest;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum TravelogueDayFixture {

    FIRST_DAY(1),
    SECOND_DAY(2),
    THIRD_DAY(3),
    ;

    private final int order;

    public TravelogueDay getTravelogueDayIncludedIn(Travelogue travelogue) {
        return new TravelogueDay(order, travelogue);
    }

    public TravelogueDayRequest getCreateRequestWith(TraveloguePlaceRequest... traveloguePlaceRequests) {
        return new TravelogueDayRequest(List.of(traveloguePlaceRequests));
    }
}
