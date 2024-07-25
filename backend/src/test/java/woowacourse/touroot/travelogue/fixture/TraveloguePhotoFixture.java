package woowacourse.touroot.travelogue.fixture;

import static woowacourse.touroot.travelogue.fixture.TraveloguePlaceFixture.TRAVELOGUE_PLACE;

import woowacourse.touroot.travelogue.domain.TraveloguePhoto;
import woowacourse.touroot.travelogue.domain.TraveloguePlace;

public enum TraveloguePhotoFixture {

    TRAVELOGUE_PHOTO(1, "https://image-url.com/image1.png", TRAVELOGUE_PLACE.get());

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
