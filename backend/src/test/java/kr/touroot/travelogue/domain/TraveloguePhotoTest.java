package kr.touroot.travelogue.domain;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import kr.touroot.global.exception.BadRequestException;
import kr.touroot.travelogue.fixture.TraveloguePlaceFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@DisplayName("여행 장소의 사진")
class TraveloguePhotoTest {

    private static final Integer VALID_ORDER = 0;
    private static final String VALID_KEY = "valid-key";
    private static final TraveloguePlace VALID_TRAVELOGUE_PLACE = TraveloguePlaceFixture.TRAVELOGUE_PLACE.get();

    @DisplayName("올바른 여행 장소 사진을 생성 시에는 예외가 발생하지 않는다")
    @Test
    void createTraveloguePhotoWithValidData() {
        assertThatCode(() -> new TraveloguePhoto(VALID_ORDER, VALID_KEY, VALID_TRAVELOGUE_PLACE))
                .doesNotThrowAnyException();
    }

    @DisplayName("사진의 순서가 비어 있는 경우 사진 생성 시 예외가 발생한다")
    @Test
    void createTraveloguePhotoWithNullOrder() {
        assertThatThrownBy(() -> new TraveloguePhoto(null, VALID_KEY, VALID_TRAVELOGUE_PLACE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 장소의 사진에서 순서와 키, 그리고 사진이 속한 여행 장소는 비어 있을 수 없습니다");
    }

    @DisplayName("사진의 장소가 비어 있는 경우 사진 생성 시 예외가 발생한다")
    @Test
    void createTraveloguePhotoWithNullPlace() {
        assertThatThrownBy(() -> new TraveloguePhoto(VALID_ORDER, VALID_KEY, null))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 장소의 사진에서 순서와 키, 그리고 사진이 속한 여행 장소는 비어 있을 수 없습니다");
    }

    @DisplayName("사진의 키값이 비어 있는 경우 사진 생성 시 예외가 발생한다")
    @Test
    void createTraveloguePhotoWithNullKey() {
        assertThatThrownBy(() -> new TraveloguePhoto(VALID_ORDER, null, VALID_TRAVELOGUE_PLACE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 장소의 사진에서 순서와 키, 그리고 사진이 속한 여행 장소는 비어 있을 수 없습니다");
    }

    @DisplayName("사진의 순서가 음수인 경우 사진 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(ints = {-1, -2, -3, -4, -5})
    void createTraveloguePhotoWithNegativeOrder(int negative) {
        assertThatThrownBy(() -> new TraveloguePhoto(negative, VALID_KEY, VALID_TRAVELOGUE_PLACE))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("여행 장소에 속하는 사진의 순서는 음수가 될 수 없습니다");
    }
}
