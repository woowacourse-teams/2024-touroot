package kr.touroot.travelogue.fixture;

import static kr.touroot.travelogue.fixture.TraveloguePlaceFixture.HAMDEOK_BEACH;

import kr.touroot.travelogue.domain.TraveloguePhoto;
import kr.touroot.travelogue.domain.TraveloguePlace;
import kr.touroot.travelogue.dto.request.TraveloguePhotoRequest;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum TraveloguePhotoFixture {

    TRAVELOGUE_PHOTO_1(1, "https://dev.touroot.kr/temporary/image1.png", HAMDEOK_BEACH.getTraveloguePlace()),
    TRAVELOGUE_PHOTO_2(2, "https://dev.touroot.kr/temporary/image2.png", HAMDEOK_BEACH.getTraveloguePlace()),
    TRAVELOGUE_PHOTO_3(3, "https://dev.touroot.kr/temporary/image3.png", HAMDEOK_BEACH.getTraveloguePlace()),
    TRAVELOGUE_PHOTO_4(4, "https://dev.touroot.kr/temporary/image4.png", HAMDEOK_BEACH.getTraveloguePlace()),
    TRAVELOGUE_PHOTO_5(5, "https://dev.touroot.kr/temporary/image5.png", HAMDEOK_BEACH.getTraveloguePlace()),
    TRAVELOGUE_PHOTO_6(6, "https://dev.touroot.kr/temporary/image6.png", HAMDEOK_BEACH.getTraveloguePlace()),
    TRAVELOGUE_PHOTO_7(7, "https://dev.touroot.kr/temporary/image7.png", HAMDEOK_BEACH.getTraveloguePlace()),
    TRAVELOGUE_PHOTO_8(8, "https://dev.touroot.kr/temporary/image8.png", HAMDEOK_BEACH.getTraveloguePlace()),
    TRAVELOGUE_PHOTO_9(9, "https://dev.touroot.kr/temporary/image9.png", HAMDEOK_BEACH.getTraveloguePlace()),
    TRAVELOGUE_PHOTO_10(10, "https://dev.touroot.kr/temporary/image10.png", HAMDEOK_BEACH.getTraveloguePlace()),
    TRAVELOGUE_PHOTO_11(11, "https://dev.touroot.kr/temporary/image11.png", HAMDEOK_BEACH.getTraveloguePlace()),
    ;

    private final int order;
    private final String url;
    private final TraveloguePlace place;

    public TraveloguePhoto getTraveloguePhoto() {
        return new TraveloguePhoto(order, url, place);
    }

    public TraveloguePhoto getTraveloguePhotoIncludedIn(TraveloguePlace place) {
        return new TraveloguePhoto(order, url, place);
    }

    public TraveloguePhotoRequest getCreateRequest() {
        return new TraveloguePhotoRequest(url);
    }
}
