package kr.touroot.place.fixture;

import kr.touroot.place.domain.Place;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum PlaceFixture {

    PLACE("함덕해수욕장", "34.54343", "126.66977", "");

    private final String name;
    private final String latitude;
    private final String longitude;
    private final String googlePlaceId;

    public Place get() {
        return new Place(name, latitude, longitude, googlePlaceId);
    }
}
