package woowacourse.touroot.place.fixture;

import woowacourse.touroot.place.domain.Place;

public enum PlaceFixture {

    PLACE("함덕해수욕장", "34.54343", "126.66977", "");

    private final String name;
    private final String latitude;
    private final String longitude;
    private final String googlePlaceId;

    PlaceFixture(String name, String latitude, String longitude, String googlePlaceId) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.googlePlaceId = googlePlaceId;
    }

    public Place get() {
        return new Place(name, latitude, longitude, googlePlaceId);
    }
}
