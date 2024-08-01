package kr.touroot.travelogue.fixture;

import static kr.touroot.travelogue.fixture.TraveloguePlaceFixture.TRAVELOGUE_PLACE;

import kr.touroot.travelogue.domain.TraveloguePhoto;
import kr.touroot.travelogue.domain.TraveloguePlace;

public enum TraveloguePhotoFixture {

    TRAVELOGUE_PHOTO(1, "https://dev.touroot.kr/temporary/image1.png", TRAVELOGUE_PLACE.get());

    private final int order;
    private final String url;
    private final TraveloguePlace place;

    TraveloguePhotoFixture(int order, String url, TraveloguePlace place) {
        this.order = order;
        this.url = url;
        this.place = place;
    }

    public TraveloguePhoto get() {
        return new TraveloguePhoto(order, url, place);
    }

    public TraveloguePhoto create(TraveloguePlace place) {
        return new TraveloguePhoto(order, url, place);
    }
}
