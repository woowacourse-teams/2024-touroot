package kr.touroot.travelogue.fixture;

import static kr.touroot.travelogue.fixture.TraveloguePlaceFixture.HAMDEOK_BEACH;

import kr.touroot.travelogue.domain.TraveloguePhoto;
import kr.touroot.travelogue.domain.TraveloguePlace;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum TraveloguePhotoFixture {

    TRAVELOGUE_PHOTO(1, "https://dev.touroot.kr/temporary/image1.png", HAMDEOK_BEACH.get());

    private final int order;
    private final String url;
    private final TraveloguePlace place;

    public TraveloguePhoto get() {
        return new TraveloguePhoto(order, url, place);
    }

    public TraveloguePhoto getTraveloguePhotoIncludedIn(TraveloguePlace place) {
        return new TraveloguePhoto(order, url, place);
    }
}
