package kr.touroot.place.domain;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import kr.touroot.global.exception.BadRequestException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@DisplayName("장소")
class PlaceTest {

    private static final String VALID_PLACE_NAME = "유효한 장소 이름";
    private static final String VALID_LATITUDE = "37.5175896";
    private static final String VALID_LONGITUDE = "127.0867236";
    private static final String VALID_GOOGLE_PLACE_ID = "ChIJgUbEo8cfqokR5lP9_Wh_DaM";

    @DisplayName("유효한 장소를 생성하는 경우 생성 시 예외가 발생하지 않는다")
    @Test
    void createPlaceWithValidData() {
        assertThatCode(() -> new Place(VALID_PLACE_NAME, VALID_LATITUDE, VALID_LONGITUDE, VALID_GOOGLE_PLACE_ID))
                .doesNotThrowAnyException();
    }

    @DisplayName("장소 이름이 null인 경우 장소 생성 시 예외가 발생한다")
    @Test
    void createPlaceWithNullPlaceName() {
        assertThatThrownBy(() -> new Place(null, VALID_LATITUDE, VALID_LONGITUDE, VALID_GOOGLE_PLACE_ID))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("장소 이름, 위도, 경도는 비어 있을 수 없습니다");
    }

    @DisplayName("장소 이름의 길이가 60자를 초과하는 경우 장소 생성 시 예외가 발생한다")
    @Test
    void createPlaceWithInvalidLengthPlaceName() {
        String length61 = "Under the summer sun, feeling the cool breeze by the sea is pure joy!!";
        assertThatThrownBy(() -> new Place(length61, VALID_LATITUDE, VALID_LONGITUDE, VALID_GOOGLE_PLACE_ID))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("장소 이름은 60자 이하여야 합니다");
    }

    @DisplayName("위도가 null인 경우 장소 생성 시 예외가 발생한다")
    @Test
    void createPlaceWithNullLatitude() {
        assertThatThrownBy(() -> new Place(VALID_PLACE_NAME, null, VALID_LONGITUDE, VALID_GOOGLE_PLACE_ID))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("장소 이름, 위도, 경도는 비어 있을 수 없습니다");
    }

    @DisplayName("경도가 null인 경우 장소 생성 시 예외가 발생한다")
    @Test
    void createPlaceWithNullLongitude() {
        assertThatThrownBy(() -> new Place(VALID_PLACE_NAME, VALID_LATITUDE, null, VALID_GOOGLE_PLACE_ID))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("장소 이름, 위도, 경도는 비어 있을 수 없습니다");
    }

    @DisplayName("장소 이름이 비어 있는 경우 장소 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {" ", "  "})
    void createPlaceWithBlankPlaceName(String blank) {
        assertThatThrownBy(() -> new Place(blank, VALID_LATITUDE, VALID_LONGITUDE, VALID_GOOGLE_PLACE_ID))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("장소 이름, 위도, 경도는 비어 있을 수 없습니다");
    }

    @DisplayName("위도가 비어 있는 경우 장소 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {" ", "  "})
    void createPlaceWithBlankLatitude(String blank) {
        assertThatThrownBy(() -> new Place(VALID_PLACE_NAME, blank, VALID_LONGITUDE, VALID_GOOGLE_PLACE_ID))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("장소 이름, 위도, 경도는 비어 있을 수 없습니다");
    }

    @DisplayName("경도가 비어 있는 경우 장소 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {" ", "  "})
    void createPlaceWithBlankLongitude(String blank) {
        assertThatThrownBy(() -> new Place(VALID_PLACE_NAME, VALID_LATITUDE, blank, VALID_GOOGLE_PLACE_ID))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("장소 이름, 위도, 경도는 비어 있을 수 없습니다");
    }

    @DisplayName("위도 형식에 맞지 않는 위도로 장소 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {"91.0000", "-91.0000", "100.0000", "-100.0000", "abc", "45.0000.0", "45,0000"})
    void createPlaceWithMalformedLatitude(String malformed) {
        assertThatThrownBy(() -> new Place(VALID_PLACE_NAME, malformed, VALID_LONGITUDE, VALID_GOOGLE_PLACE_ID))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("위,경도의 형식이 올바르지 않습니다");
    }

    @DisplayName("경도 형식에 맞지 않는 위도로 장소 생성 시 예외가 발생한다")
    @ParameterizedTest
    @ValueSource(strings = {"181.0000", "-181.0000", "200.0000", "-200.0000", "abc", "100.0000.0", "100,0000"})
    void createPlaceWithMalformedLongitude(String malformed) {
        assertThatThrownBy(() -> new Place(VALID_PLACE_NAME, VALID_LATITUDE, malformed, VALID_GOOGLE_PLACE_ID))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("위,경도의 형식이 올바르지 않습니다");
    }
}
