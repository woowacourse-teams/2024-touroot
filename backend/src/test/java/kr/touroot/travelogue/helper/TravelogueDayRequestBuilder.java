package kr.touroot.travelogue.helper;

import java.util.ArrayList;
import java.util.List;
import kr.touroot.travelogue.dto.request.TravelogueDayRequest;
import kr.touroot.travelogue.dto.request.TraveloguePlaceRequest;
import kr.touroot.travelogue.fixture.TravelogueDayFixture;
import kr.touroot.travelogue.fixture.TraveloguePhotoFixture;
import kr.touroot.travelogue.fixture.TraveloguePlaceFixture;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class TravelogueDayRequestBuilder {
    private final TravelogueRequestBuilder parentBuilder;
    private final TravelogueDayFixture travelogueDayFixture;
    private final List<TraveloguePlaceRequest> placeRequests = new ArrayList<>();

    public TravelogueDayRequestBuilder addPlaceWithPhotosIntoDay(
            TraveloguePlaceFixture traveloguePlaceFixture,
            List<TraveloguePhotoFixture> traveloguePhotoFixtures
    ) {
        placeRequests.add(traveloguePlaceFixture.getCreateRequestWith(traveloguePhotoFixtures));
        return this;
    }

    public TravelogueRequestBuilder buildDay() {
        TravelogueDayRequest dayRequest = travelogueDayFixture.getCreateRequestWith(
                placeRequests.toArray(new TraveloguePlaceRequest[0])
        );
        parentBuilder.addDayRequest(dayRequest);
        return parentBuilder;
    }
}
