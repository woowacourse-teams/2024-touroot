package kr.touroot.travelogue.helper;

import java.util.ArrayList;
import java.util.List;
import kr.touroot.travelogue.dto.request.TravelogueDayRequest;
import kr.touroot.travelogue.dto.request.TravelogueRequest;
import kr.touroot.travelogue.fixture.TravelogueDayFixture;
import kr.touroot.travelogue.fixture.TravelogueFixture;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class TravelogueRequestBuilder {

    private final TravelogueFixture travelogueFixture;
    private final List<Long> tagIds = new ArrayList<>();
    private final List<TravelogueDayRequest> dayRequests = new ArrayList<>();

    public static TravelogueRequestBuilder forTravelogue(TravelogueFixture travelogueFixture) {
        return new TravelogueRequestBuilder(travelogueFixture);
    }

    public TravelogueRequestBuilder addTags(List<Long> tags) {
        tagIds.addAll(tags);
        return this;
    }

    public TravelogueDayRequestBuilder addDay(TravelogueDayFixture travelogueDayFixture) {
        return new TravelogueDayRequestBuilder(this, travelogueDayFixture);
    }

    public TravelogueRequest build() {
        return travelogueFixture.getCreateRequestWith(
                dayRequests.toArray(new TravelogueDayRequest[0])
        );
    }

    void addDayRequest(TravelogueDayRequest dayRequest) {
        dayRequests.add(dayRequest);
    }
}
