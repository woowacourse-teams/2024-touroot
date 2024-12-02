package kr.touroot.travelogue.fixture;

import kr.touroot.travelogue.domain.TraveloguePhoto;
import kr.touroot.travelogue.domain.TraveloguePlace;
import kr.touroot.travelogue.dto.request.TraveloguePhotoRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum TraveloguePhotoFixture {

    TRAVELOGUE_PHOTO_1(1, "https://dev.touroot.kr/temporary/image1.png"),
    TRAVELOGUE_PHOTO_2(2, "https://dev.touroot.kr/temporary/image2.png"),
    TRAVELOGUE_PHOTO_3(3, "https://dev.touroot.kr/temporary/image3.png"),
    TRAVELOGUE_PHOTO_4(4, "https://dev.touroot.kr/temporary/image4.png"),
    TRAVELOGUE_PHOTO_5(5, "https://dev.touroot.kr/temporary/image5.png"),
    TRAVELOGUE_PHOTO_6(6, "https://dev.touroot.kr/temporary/image6.png"),
    TRAVELOGUE_PHOTO_7(7, "https://dev.touroot.kr/temporary/image7.png"),
    TRAVELOGUE_PHOTO_8(8, "https://dev.touroot.kr/temporary/image8.png"),
    TRAVELOGUE_PHOTO_9(9, "https://dev.touroot.kr/temporary/image9.png"),
    TRAVELOGUE_PHOTO_10(10, "https://dev.touroot.kr/temporary/image10.png"),
    TRAVELOGUE_PHOTO_11(11, "https://dev.touroot.kr/temporary/image11.png"),
    ;

    private final int order;
    private final String url;

    public TraveloguePhoto getTraveloguePhotoIncludedIn(TraveloguePlace place) {
        return new TraveloguePhoto(order, url, place);
    }

    public TraveloguePhotoRequest getCreateRequest() {
        return new TraveloguePhotoRequest(url);
    }
}
