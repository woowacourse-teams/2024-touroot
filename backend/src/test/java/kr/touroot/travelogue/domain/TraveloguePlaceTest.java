package kr.touroot.travelogue.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import kr.touroot.global.exception.BadRequestException;
import kr.touroot.travelogue.fixture.TravelogueDayFixture;
import kr.touroot.travelogue.fixture.TraveloguePhotoFixture;
import kr.touroot.travelogue.fixture.TraveloguePlaceFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@DisplayName("여행기 장소")
class TraveloguePlaceTest {

    private static final Integer VALID_ORDER = 0;
    private static final String VALID_NAME = "함덕 해수욕장";
    private static final String VALID_LAT = "33.5431";
    private static final String VALID_LNG = "126.6728";
    private static final TravelogueDay VALID_DAY = TravelogueDayFixture.TRAVELOGUE_DAY.get();
    private static final String VALID_DESC = "장소에 대한 설명";
    private static final String VALID_COUNTRY_CODE = "KR";

    @DisplayName("올바른 여행기 장소 생성 시 예외가 발생하지 않는다")
    @Test
    void createTraveloguePlaceWithValidData() {
        assertThatCode(() -> new TraveloguePlace(VALID_ORDER, VALID_DESC, VALID_NAME, VALID_LAT, VALID_LNG, VALID_DAY,
                VALID_COUNTRY_CODE))
                .doesNotThrowAnyException();
    }

    @DisplayName("여행기 장소 생성 시 순서가 비어 있다면 예외가 발생한다")
    @Test
    void createTraveloguePlaceWithNullOrder() {
        assertThatThrownBy(() -> new TraveloguePlace(null, VALID_DESC, VALID_NAME, VALID_LAT, VALID_LNG, VALID_DAY,
                VALID_COUNTRY_CODE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행기 장소에서 순서와 장소 위치, 방문 날짜, 그리고 국가 코드는 비어 있을 수 없습니다");
    }

    @DisplayName("여행기 장소 생성 시 이름 정보가 비어 있다면 예외가 발생한다")
    @Test
    void createTraveloguePlaceWithNullPlaceName() {
        assertThatThrownBy(() -> new TraveloguePlace(VALID_ORDER, VALID_DESC, null, VALID_LAT, VALID_LNG, VALID_DAY,
                VALID_COUNTRY_CODE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행기 장소에서 순서와 장소 위치, 방문 날짜, 그리고 국가 코드는 비어 있을 수 없습니다");
    }

    @DisplayName("여행기 장소 생성 시 장소가 속한 날짜가 비어 있다면 예외가 발생한다")
    @Test
    void createTraveloguePlaceWithNullDay() {
        assertThatThrownBy(() -> new TraveloguePlace(VALID_ORDER, VALID_DESC, VALID_NAME, VALID_LAT, VALID_LNG, null,
                VALID_COUNTRY_CODE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행기 장소에서 순서와 장소 위치, 방문 날짜, 그리고 국가 코드는 비어 있을 수 없습니다");
    }

    @DisplayName("여행기 장소 생성 시 장소 설명이 비어 있더라도 여행기를 생성할 수 있다")
    @Test
    void createTraveloguePlaceWithNullDescription() {
        assertThatCode(() -> new TraveloguePlace(VALID_ORDER, null, VALID_NAME, VALID_LAT, VALID_LNG, VALID_DAY,
                VALID_COUNTRY_CODE))
                .doesNotThrowAnyException();
    }

    @DisplayName("여행기 장소 생성 시 국가 코드가 비어 있다면 예외가 발생한다")
    @Test
    void createTraveloguePlaceWithNullCountryCode() {
        assertThatThrownBy(
                () -> new TraveloguePlace(VALID_ORDER, VALID_DESC, VALID_NAME, VALID_LAT, VALID_LNG, VALID_DAY,
                        null))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행기 장소에서 순서와 장소 위치, 방문 날짜, 그리고 국가 코드는 비어 있을 수 없습니다");
    }

    @DisplayName("여행 장소 이름이 공백문자로만 이루어져 있는 경우 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {"", "   ", "    "})
    void createTraveloguePlaceWithBlankName(String blank) {
        assertThatThrownBy(() -> new TraveloguePlace(VALID_ORDER, VALID_DESC, blank, VALID_LAT, VALID_LNG, VALID_DAY,
                VALID_COUNTRY_CODE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("장소 이름은 비어 있을 수 없습니다");
    }

    @DisplayName("여행기 장소의 순서는 음수 일 수 없다")
    @ParameterizedTest
    @ValueSource(ints = {-1, -2, -3, -4, -5})
    void createTraveloguePlaceWithNegativeOrder(int negative) {
        assertThatThrownBy(() -> new TraveloguePlace(negative, VALID_DESC, VALID_NAME, VALID_LAT, VALID_LNG, VALID_DAY,
                VALID_COUNTRY_CODE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 장소의 순서는 음수일 수 없습니다");
    }

    @DisplayName("여행기 장소 설명의 길이가 300자가 넘는 경우 여행기 생성 시 예외가 발생한다")
    @Test
    void createTraveloguePlaceWithInvalidLengthDescription() {
        String invalid = "서울의 명동은 현대와 전통이 조화롭게 어우러진 매력적인 지역입니다. 이곳의 거리에는 최신 패션 아이템을 갖춘 상점들이 즐비하며, 각종 뷰티 제품을 직접 체험할 수 있는 기회가 많습니다. 다양한 길거리 음식과 맛집이 가득해 미식가들의 입맛을 사로잡습니다. 서울타워와 N서울타워 전망대에서는 서울 전경을 한눈에 감상할 수 있으며, 남산 공원에서는 도심 속의 자연을 즐길 수 있습니다. 전통 시장인 남대문 시장과 청계천은 서울의 풍부한 역사와 문화를 체험할 수 있는 명소입니다. 명동의 활기 넘치는 분위기 속에서 쇼핑과 먹거리를 동시에 즐겨요!";

        System.out.println("length301Description = " + invalid.length());
        assertThatThrownBy(() -> new TraveloguePlace(VALID_ORDER, invalid, VALID_NAME, VALID_LAT, VALID_LNG, VALID_DAY,
                VALID_COUNTRY_CODE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 장소에 대한 설명은 300자를 넘길 수 없습니다");
    }

    @DisplayName("장소 이름의 길이가 85자를 초과하는 경우 장소 생성 시 예외가 발생한다")
    @Test
    void createPlaceWithInvalidLengthPlaceName() {
        String length86 = "Under the warm summer sun, feeling the cool breeze by the sea is absolute pure joy!!!!";

        assertThatThrownBy(
                () -> new TraveloguePlace(VALID_ORDER, VALID_DESC, length86, VALID_LAT, VALID_LNG, VALID_DAY,
                        VALID_COUNTRY_CODE)
        )
                .isInstanceOf(BadRequestException.class)
                .hasMessage("장소 이름은 85자 이하여야 합니다");
    }

    @DisplayName("국가 코드가 존재하지 않는 경우 장소 생성 시 예외가 발생한다")
    @Test
    void createPlaceWithInvalidCountryCode() {
        assertThatThrownBy(
                () -> new TraveloguePlace(VALID_ORDER, VALID_DESC, VALID_NAME, VALID_LAT, VALID_LNG, VALID_DAY,
                        "SAM-572")
        )
                .isInstanceOf(BadRequestException.class)
                .hasMessage("존재하지 않는 국가 코드입니다.");
    }

    @DisplayName("장소 사진을 추가할 수 있다")
    @Test
    void addPhotoInTraveloguePlace() {
        TraveloguePlace traveloguePlace = TraveloguePlaceFixture.TRAVELOGUE_PLACE.get();
        TraveloguePhoto traveloguePhoto = TraveloguePhotoFixture.TRAVELOGUE_PHOTO.get();

        traveloguePlace.addPhoto(traveloguePhoto);

        assertThat(traveloguePlace.getTraveloguePhotos()).containsExactly(traveloguePhoto);
    }

    @DisplayName("여행 장소에 장소 사진을 추가하면 장소 사진의 여행 장소 참조도 수정된다")
    @Test
    void addDayInTravelogueThenDayUpdated() {
        TraveloguePlace traveloguePlace = TraveloguePlaceFixture.TRAVELOGUE_PLACE.get();
        TraveloguePhoto traveloguePhoto = TraveloguePhotoFixture.TRAVELOGUE_PHOTO.get();

        traveloguePlace.addPhoto(traveloguePhoto);

        assertThat(traveloguePhoto.getTraveloguePlace()).isEqualTo(traveloguePlace);
    }
}
