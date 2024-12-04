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
    private TravelogueDayRequestBuilder currentDayBuilder;

    public static TravelogueRequestBuilder forTravelogue(TravelogueFixture travelogueFixture) {
        return new TravelogueRequestBuilder(travelogueFixture);
    }

    public TravelogueRequestBuilder addTags(List<Long> tags) {
        tagIds.addAll(tags);
        return this;
    }

    public TravelogueRequestBuilder addDay(TravelogueDayFixture travelogueDayFixture) {
        // 이전 Day가 있으면 자동으로 처리
        if (currentDayBuilder != null) {
            dayRequests.add(currentDayBuilder.build());
        }
        currentDayBuilder = new TravelogueDayRequestBuilder(travelogueDayFixture);
        return this;
    }

    public TravelogueRequestBuilder addPlaceWithPhotosIntoDay(
            TraveloguePlaceFixture traveloguePlaceFixture,
            List<TraveloguePhotoFixture> traveloguePhotoFixtures
    ) {
        if (currentDayBuilder == null) {
            throw new IllegalStateException("You must add a day before adding places.");
        }
        currentDayBuilder.addPlaceWithPhotos(traveloguePlaceFixture, traveloguePhotoFixtures);
        return this;
    }

    public TravelogueRequest build() {
        // 마지막 Day 처리
        if (currentDayBuilder != null) {
            dayRequests.add(currentDayBuilder.build());
        }
        return travelogueFixture.getCreateRequestWith(
                dayRequests.toArray(new TravelogueDayRequest[0])
        );
    }

    @RequiredArgsConstructor
    private static class TravelogueDayRequestBuilder {
        private final TravelogueDayFixture travelogueDayFixture;
        private final List<TraveloguePlaceRequest> placeRequests = new ArrayList<>();

        public void addPlaceWithPhotos(
                TraveloguePlaceFixture traveloguePlaceFixture,
                List<TraveloguePhotoFixture> traveloguePhotoFixtures
        ) {
            placeRequests.add(traveloguePlaceFixture.getCreateRequestWith(traveloguePhotoFixtures));
        }

        public TravelogueDayRequest build() {
            return travelogueDayFixture.getCreateRequestWith(
                    placeRequests.toArray(new TraveloguePlaceRequest[0])
            );
        }
    }
}
