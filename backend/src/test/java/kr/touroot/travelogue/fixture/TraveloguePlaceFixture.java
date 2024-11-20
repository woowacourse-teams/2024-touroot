package kr.touroot.travelogue.fixture;

import static kr.touroot.travelogue.fixture.TravelogueDayFixture.FIRST_DAY;
import static kr.touroot.travelogue.fixture.TravelogueDayFixture.SECOND_DAY;
import static kr.touroot.travelogue.fixture.TravelogueDayFixture.THIRD_DAY;

import java.util.List;
import kr.touroot.travelogue.domain.TravelogueDay;
import kr.touroot.travelogue.domain.TraveloguePlace;
import kr.touroot.travelogue.dto.request.TraveloguePhotoRequest;
import kr.touroot.travelogue.dto.request.TraveloguePlaceRequest;
import kr.touroot.travelogue.dto.request.TraveloguePositionRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum TraveloguePlaceFixture {
    HAMDEOK_BEACH(
            1,
            "에메랄드 빛 해변",
            "함덕 해수욕장",
            "34.54343",
            "126.66977",
            FIRST_DAY.getTravelogueDay(),
            "KR"
    ),
    SEONGSAN_ILCHULBONG(
            2,
            "일출을 볼 수 있는 아름다운 성산",
            "성산 일출봉",
            "33.45837",
            "126.93695",
            SECOND_DAY.getTravelogueDay(),
            "KR"
    ),
    JEJU_FOLK_VILLAGE(
            3,
            "제주의 옛 모습을 간직한 민속 마을",
            "제주 민속촌",
            "33.43234",
            "126.82845",
            THIRD_DAY.getTravelogueDay(),
            "KR"
    ),
    MANJANG_CAVE(
            4,
            "세계자연유산 용암동굴",
            "만장굴",
            "33.53123",
            "126.76689",
            FIRST_DAY.getTravelogueDay(),
            "KR"
    ),
    HALLASAN(
            5,
            "제주의 상징, 한라산",
            "한라산",
            "33.36214",
            "126.53326",
            SECOND_DAY.getTravelogueDay(),
            "KR"
    ),
    TRAVELOGUE_PLACE_WITH_NONE_COUNTRY_CODE(1,
            "해변",
            "함덕",
            "34.54343",
            "126.66977",
            FIRST_DAY.getTravelogueDay(),
            "NONE"
    ),
    ;

    private final int order;
    private final String description;
    private final String name;
    private final String latitude;
    private final String longitude;
    private final TravelogueDay day;
    private final String countryCode;

    public TraveloguePlace getTraveloguePlace() {
        return new TraveloguePlace(order, description, name, latitude, longitude, day, countryCode);
    }

    public TraveloguePlace getTraveloguePlaceIncludedIn(TravelogueDay day) {
        return new TraveloguePlace(order, description, name, latitude, longitude, day, countryCode);
    }

    public TraveloguePlaceRequest getCreateRequestWith(TraveloguePhotoRequest... traveloguePhotoRequests) {
        return new TraveloguePlaceRequest(
                name,
                new TraveloguePositionRequest(latitude, longitude),
                description,
                List.of(traveloguePhotoRequests),
                countryCode
        );
    }

    public TraveloguePlaceRequest getCreateRequestWithEmptyPhoto() {
        return new TraveloguePlaceRequest(
                name,
                new TraveloguePositionRequest(latitude, longitude),
                description,
                List.of(),
                countryCode
        );
    }
}
