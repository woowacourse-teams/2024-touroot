package kr.touroot.travelogue.fixture;

import java.util.ArrayList;
import java.util.List;
import kr.touroot.travelogue.dto.request.TravelogueDayRequest;
import kr.touroot.travelogue.dto.request.TraveloguePlaceRequest;
import kr.touroot.travelogue.dto.request.TravelogueRequest;
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

    @RequiredArgsConstructor
    public static class TravelogueDayRequestBuilder {
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
}
